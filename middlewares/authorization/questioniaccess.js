const Question = require("../../schemas/question");
const CustomError = require("../../helpers/error/customError");

const questionAccess = async (req, res, next) => {
    const userId = req.user.id;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    if (!question) {
        return next(new CustomError("Question not found", 404));
    }
    if (Question.user != userId) {
        return next(new CustomError("Only owner can handle this operation", 403));
    }
    next();
}

module.exports = questionAccess;    