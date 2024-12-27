const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Question = require("./question"); 

// USER SCHEMA
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide at least 6 characters"],
        required: [true, "Please provide a password"],
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

// PASSWORD HASHING BEFORE SAVE
UserSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        console.error("Error hashing password: ", err);
        next(err);
    }
});

// RESET PASSWORD TOKEN GENERATION
UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const hexcode = crypto.randomBytes(15).toString("hex");
    const { RESET_PASSWORD_EXPIRE } = process.env;
    const resetPasswordToken = crypto.createHash("SHA256").update(hexcode).digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
};

// JWT GENERATION
UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_EXPIRE, JWT_SECRET_KEY } = process.env;

    const payload = {
        id: this.id,
        name: this.name
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });

    return token;
};

// COMPARE PASSWORD
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// DELETE ASSOCIATED QUESTIONS AFTER USER IS REMOVED
UserSchema.post("remove", async function() {
    await Question.deleteMany({
        user: this._id
    });
});

module.exports = mongoose.model("User", UserSchema);
