const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, dislikeQuestion } = require("../controllers/question");
const questionRouter = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const questionAccess = require("../middlewares/authorization/questioniaccess");
const answerRouter = require("./answers");

//QUESTION ROUTES
questionRouter.post("/ask", getAccessToRoute, askNewQuestion);
questionRouter.get("/getAllQuestions", getAllQuestions);
questionRouter.get("/getSingleQuestion/:id", getSingleQuestion);
questionRouter.put("/:id/edit", getAccessToRoute, questionAccess, editQuestion);
questionRouter.delete("/delete-question/:id", getAccessToRoute, questionAccess, deleteQuestion);
questionRouter.get("/like/:id", getAccessToRoute, likeQuestion);
questionRouter.get("/dislike/:id", getAccessToRoute, dislikeQuestion);

questionRouter.use("/:id/answers", answerRouter);  
module.exports = questionRouter;
