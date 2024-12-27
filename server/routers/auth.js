const express = require("express");
const authRouter = express.Router();
const { register, getUser, login, logout, forgotPassword, resetPassword } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

// AUTH ROUTERS
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", getAccessToRoute, getUser);
authRouter.get("/logout", logout);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetPassword", resetPassword);

module.exports = authRouter;
