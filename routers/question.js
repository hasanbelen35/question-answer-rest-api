const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion } = require("../controllers/question");
const questionRouter = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const questionAccess = require("../middlewares/authorization/questioniaccess");

// User routers
questionRouter.post("/ask", getAccessToRoute, askNewQuestion);
questionRouter.get("/getAllQuestions", getAllQuestions);
questionRouter.get("/getSingleQuestion/:id", getSingleQuestion);
questionRouter.put("/:id/edit", getAccessToRoute, questionAccess, editQuestion);
questionRouter.put("/delete-question/:id", getAccessToRoute, questionAccess, deleteQuestion);

module.exports = questionRouter;
