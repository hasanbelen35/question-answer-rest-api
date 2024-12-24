const express = require("express");
const userRouter = express.Router();
const {getSingleUser ,getAllUsers} = require("../controllers/user");
// user routers

userRouter.get("/:id", getSingleUser);
userRouter.get("/", getAllUsers);
module.exports = userRouter;
