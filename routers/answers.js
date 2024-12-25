const express = require("express");
const answerRouter = express.Router();
const { addNewAnswerToQuestion, getAllAnswersByQuestion } = require("../controllers/answer");

answerRouter.post("/", addNewAnswerToQuestion);
answerRouter.post("/", getAllAnswersByQuestion);

module.exports = answerRouter;
