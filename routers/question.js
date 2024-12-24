const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion } = require("../controllers/question");
const questionRouter = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const questionAccess = require("../middlewares/authorization/questioniaccess");
// user routers

questionRouter.post("/ask", getAccessToRoute, questionAccess, askNewQuestion)
questionRouter.get("/getAllQuestions", getAllQuestions)
questionRouter.get("/getSingleQuestion/:id", getSingleQuestion)

module.exports = questionRouter;
