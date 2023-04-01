const { Router } = require("express");
const { handleLogin, handleSignup } = require("../controllers/user");
const { blockUser } = require("../middlewares/blockuser");

const userRouter = Router();

userRouter.post("/login", blockUser, handleLogin)
userRouter.post("/register", handleSignup)

module.exports = { userRouter }