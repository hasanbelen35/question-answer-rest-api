const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const { Schema } = mongoose;

const QuestionScheama = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlength: [10, "Please provide a title at least 10 characters"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a content at least 20 characters"]
    },
    slug: String,

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

});
QuestionScheama.pre("save", function (next) {
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.generateSlug();
    next();
});
// GENERATE SLUG    
QuestionScheama.methods.generateSlug = function () {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });
};

module.exports = mongoose.model("Question", QuestionScheama);
