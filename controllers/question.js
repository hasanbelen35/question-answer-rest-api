const CustomError = require("../helpers/error/CustomError");
const Question = require("../schemas/question");
const mongoose = require("mongoose");
// ASK NEW QUESTION
const askNewQuestion = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const question = await Question.create({
            title,
            content,
            user: req.user.id,
        });

        if (!question) {
            return next(new CustomError("Question could not be asked", 400));
        }

        res.status(200)
            .json({
                success: true,
                data: question
            });
    } catch (error) {
        console.log(error)
        return next(new CustomError("Question could not be asked", 400));
    }
}

// GET ALL QUESTIONS
const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find();
        if (!questions) {
            return next(new CustomError("Questions could not be fetched", 400));
        };

        res.status(200)
            .json({
                success: true,
                data: questions
            });
    } catch (error) {
        return next(new CustomError("Questions could not be fetched", 400));
    }

};

// GET SINGLE QUESTION
const getSingleQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        if (!question) {
            return next(new CustomError("Question could not be fetched", 400));
        };

        res.status(200)
            .json({
                success: true,
                data: question
            });
    } catch (error) {
        return next(new CustomError("Question could not be fetched", 400));

    }
};

// EDIT QUESTION
const editQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        let question = await Question.findById(id)

        if (!question) {
            return next(new CustomError("Question not found", 404));
        };

        question.title = title;
        question.content = content;

        question = await question.save();

        res.status(200)
            .json({
                success: true,
                data: question
            });

    } catch (error) {
        return next(new CustomError("Question could not be updated", 400));
    }
};

const deleteQuestion = async (req, res, next) => {

    try {
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) {
            return next(new CustomError("Question not found", 404));
        };

        await Question.findByIdAndDelete(id);

        res.status(200)
            .json({
                success: true,
                message: "Question deleted successfully"
            });

    } catch (error) {
        return next(new CustomError("Question could not be deleted", 400));
    }


};

// LIKE QUESTION
const likeQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) {
            return next(new CustomError("Question not found", 404));
        }


        if (question.likes.includes(req.user.id)) {
            return next(new CustomError("You already liked this question", 400));
        }

        // Add user ID to likes array
        question.likes.push(req.user.id);

        await question.save();

        res.status(200).json({
            success: true,
            message: "Question liked successfully"
        });

    } catch (error) {
        console.error(error);
        return next(new CustomError("Question could not be liked", 400));
    }
};
// DISLIKE QUESTION
const dislikeQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);
        if (!question) {
            return next(new CustomError("Question not found", 404));
        };

        if (!question.likes.includes(req.user.id)) {
            return next(new CustomError("You have not liked this question yet", 400));
        };

        await question.likes.remove(req.user.id);

        await question.save();

        res.status(200)
            .json({
                success: true,
                message: "Question disliked successfully"
            });
    } catch (error) {
        return next(new CustomError("Question could not be disliked", 400));
    }
};



module.exports = {
    askNewQuestion, getAllQuestions,
    getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, dislikeQuestion
};