const express = require("express");
const adminRouter = express.Router();
const { getAdminAccess } = require("../middlewares/authorization/admin");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { adminPage, blockUser, deleteUser } = require("../controllers/admin");

adminRouter.get("/", getAccessToRoute, getAdminAccess, adminPage);
adminRouter.get("/blockUser/:id", getAccessToRoute, getAdminAccess, blockUser);
adminRouter.delete("/deleteUser/:id", getAccessToRoute, getAdminAccess, deleteUser);

module.exports = adminRouter;
