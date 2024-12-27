const CustomError = require("../helpers/error/CustomError");
const Answer = require("../schemas/answer");
const Question = require("../schemas/question");
const addNewAnswerToQuestion = async (req, res, next) => {
    try {
        const { question_id } = req.params;
        const user_id = req.user.id;
        const information = req.body;

        const answer = await Answer.create({
            ...information,
            question: question_id,
            user: user_id
        });

        return res.status(200)
            .json({
                success: true,
                data: answer
            });
    } catch (error) {
        return next(new CustomError("Answer could not be added", 400));
    }

};

const getAllAnswersByQuestion = async (req, res, next) => {

    try {
        const { question_id } = req.params;
        const question = await Question.findById(question_id).populate("answers");

        const answers = question.answers;
        return res.status(200)
            .json({
                success: true,
                data: answers
            });
    } catch (error) {
        return next(new CustomError("Answers could not be fetched", 400));
    }
};
module.exports = { addNewAnswerToQuestion, getAllAnswersByQuestion };