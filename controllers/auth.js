const User = require("../schemas/user");
const CustomError = require("../helpers/error/CustomError");
const { sendJwtToClient } = require("../helpers/authorization/sendJwtToClient");
const comparePassword = require("../helpers/authorization/hashedPasswordCompare");
const sendEmail = require("../helpers/libs/sendEmail");
const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Kullanıcıyı oluştur
        const user = await User.create({ name, email, password });

        if (!user) {
            // Kullanıcı oluşturulamazsa hata fırlat
            return next(new CustomError("User could not be created", 500));
        }

        sendJwtToClient(user, res);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new CustomError("This email is not used!", 400));
        }

        // Şifreyi karşılaştır
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return next(new CustomError("Password is wrong!", 400));
        }

        // JWT ile yanıt gönder
        sendJwtToClient(user, res);

    } catch (error) {
        console.log(error);
        return next(new CustomError("Internal Server Error", 500));
    }
};

// LOGOUT

const logout = async (req, res, next) => {
    try {
        const { NODE_ENV } = process.env;

        res.clearCookie('access-token', {
            httpOnly: true,
            secure: NODE_ENV === "development" ? false : true, // Production'da secure flag aktif
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return next(new CustomError("Logout process Error", 400));
    }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
    try {
        const resetEmail = req.body.email;

        const user = await User.findOne({ email: resetEmail });

        if (!user) {
            return next(new CustomError("There is no user with that email", 400));
        }

        const resetPasswordToken = user.getResetPasswordTokenFromUser();

        await user.save();

        const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

        const emailTemplate = `
            <h3>Reset Your Password</h3>
            <p>This <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour</p>
        `;

        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        });

        return res.json({
            success: true,
            message: "Token sent to your email",
        });
    } catch (err) {
        return next(new CustomError("Something went wrong with password reset", 500));
    }
};

// RESET PASSWORD
const resetPassword = async (req, res, next) => {
    const { resetPasswordToken } = req.query;
    const { password } = req.body;
    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid token", 400));
    };

    const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new CustomError("Invalid token or session expired", 404));
    };

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Reset password process is successful"
    });
};


const getUser = (req, res) => {
    res.json({
        success: true,
        message: "hello from get user",
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
};
module.exports = { register, getUser, login, logout, forgotPassword, resetPassword };
