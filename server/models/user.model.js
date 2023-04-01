const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lastLoginAttempt: {
        type: Date,
        default: null
    },
}, { timestamps: true })

const UserModel = model('users', UserSchema);

module.exports = { UserModel }