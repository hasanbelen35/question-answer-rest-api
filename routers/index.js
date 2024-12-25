// routers/index.js
const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const questionRouter = require("./question");

// ROUTES
router.use("/auth", authRouter);
router.use("/question", questionRouter);

router.use("/users", userRouter);
router.use("/admin", adminRouter);



module.exports = router;
