const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion } = require("../controllers/question");
const questionRouter = express.Router();
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const questionAccess = require("../middlewares/authorization/questioniaccess");
// user routers

questionRouter.post("/ask", getAccessToRoute, questionAccess, askNewQuestion);
questionRouter.get("/getAllQuestions", getAllQuestions);
questionRouter.get("/getSingleQuestion/:id", getSingleQuestion);
questionRouter.put("/editQuestion/:id", getAccessToRoute, questionAccess, editQuestion);



module.exports = questionRouter;
