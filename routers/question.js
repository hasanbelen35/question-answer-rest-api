const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, dislikeQuestion } = require("../controllers/question");
const questionRouter = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const questionAccess = require("../middlewares/authorization/questioniaccess");

//QUESTION ROUTES
questionRouter.post("/ask", getAccessToRoute, askNewQuestion);
questionRouter.get("/getAllQuestions", getAllQuestions);
questionRouter.get("/getSingleQuestion/:id", getSingleQuestion);
questionRouter.put("/:id/edit", getAccessToRoute, questionAccess, editQuestion);
questionRouter.delete("/delete-question/:id", getAccessToRoute, questionAccess, deleteQuestion);
questionRouter.get("/like/:id", getAccessToRoute, likeQuestion);
questionRouter.get("/dislike/:id", getAccessToRoute, dislikeQuestion);

module.exports = questionRouter;
