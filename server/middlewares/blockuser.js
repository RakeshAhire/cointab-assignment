const { UserModel } = require("../models/user.model");

const blockUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.loginAttempts >= 5 && user.lastLoginAttempt.getTime() + 24 * 60 * 60 * 1000 > Date.now()) {
        // console.log('Date.now(): ', Date.now());
        // console.log('user.lastLoginAttempt.getTime(): ', user.lastLoginAttempt.getTime()+ 1 * 60 * 60 * 1000 );
        // user has exceeded max login attempts and is still blocked
        return res.status(403).json({ message: 'Your account has been blocked. Please try again later.' });
      }
      else if (user.loginAttempts >= 5) {
        // user has exceeded max login attempts but is no longer blocked
        user.loginAttempts = 0;
        user.lastLoginAttempt = null;
        await user.save();
      }
    }
    next();
  }
  catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

module.exports = { blockUser }