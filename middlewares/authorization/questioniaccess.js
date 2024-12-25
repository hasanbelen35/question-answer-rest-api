const Question = require("../../schemas/question");
const CustomError = require("../../helpers/error/CustomError");

const questionAccess = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) {
            return next(new CustomError("Question not found", 404));
        }

        // Soru sahibi kontrolü
        if (question.user.toString() !== req.user.id) {
            return next(new CustomError("Only owner can handle this operation", 403));
        }

        next(); 
    } catch (error) {
        return next(new CustomError("Authorization error", 403));
    }
};

module.exports = questionAccess;
