const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// USER SCHEAMA
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

// Şifreyi hashlemek için middleware
UserSchema.pre("save", async function (next) {
    const user = this;

    // Eğer şifre değiştirilmediyse hashleme
    if (!user.isModified("password")) {
        return next();
    }

    try {
        // Salt üret
        const salt = await bcrypt.genSalt(10);
        // Şifreyi hashle
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// RESET PASSWORD PROCESS
UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const hexcode = crypto.randomBytes(15).toString("hex");
    const { RESET_PASSWORD_EXPIRE } = process.env;
    const resetPasswordToken = crypto.createHash("SHA256").update(hexcode).digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
}

// GENERATE JWT 
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

// Şifre doğrulama fonksiyonu
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
