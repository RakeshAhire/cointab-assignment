const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const { createError } = require("../utils/cutomError");

const handleLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return  next(createError(401, 'Invalid Email or password.'));
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            user.loginAttempts += 1;
            user.lastLoginAttempt = new Date();
            await user.save();
            // console.log('user: ', user);
            if (user.loginAttempts >= 5) {
                return next(createError(401, 'Your account has been blocked. Please try again 24 hours later.'));
            }
            return next(createError(401, 'Invalid username or password.'));
        }

        // reset login attempts on successful login
        user.loginAttempts = 0;
        user.lastLoginAttempt = null;
        await user.save();

        return res.status(200).json({ username: user.email, message: 'Login successful.' });
    } catch (error) {
        next(error);
    }
};

//register a user

const handleSignup = async (req, res, next) => {
    const { email, password } = req.body;
    //first check user in db
    const user = await UserModel.findOne({ email });

    if (user) {
        next(createError(201, 'User already created'));
    }
    try {
        //convert simple password into hash form
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                next(err)
            }
            else {
                const newUser = new UserModel({
                    email,
                    password: hash
                })
                await newUser.save();
                res.status(200).send({ success: true, message: "User created successfully" })
            }
        });
    }
    catch (error) {
        next(error)
    }
}

module.exports = { handleLogin, handleSignup }