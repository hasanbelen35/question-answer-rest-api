const User = require("../../schemas/user");
const CustomError = require("../../helpers/error/customError");

const getAdminAccess = async (req, res, next) => {
    try {
        const { id } = req.user; // req.user doğrulama sonrası eklenmiş olmalı
        const user = await User.findById(id);

        if (!user) {
            return next(new CustomError("User not found", 404));
        }

        if (user.role !== "admin") {
            return next(new CustomError("Only admins can access this route", 403));
        }

        next(); // Adminse, devam et
    } catch (error) {
        return next(new CustomError("Server error", 500)); // Herhangi bir hata durumunda 500 döndür
    }
};

module.exports = { getAdminAccess };
