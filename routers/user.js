const express = require("express");
const userRouter = express.Router();
const { getSingleUser, getAllUsers } = require("../controllers/user");
const { getAdminAccess } = require("../middlewares/authorization/admin");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
// user routers

userRouter.get("/:id", getAccessToRoute, getAdminAccess, getSingleUser);
userRouter.get("/", getAccessToRoute, getAdminAccess, getAllUsers);
module.exports = userRouter;
