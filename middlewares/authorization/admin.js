const User = require("../../schemas/user");
const CustomError = require("../../helpers/error/CustomError");
const getAdminAccess = async (req, res, next) => {
    try {
        const { id } = req.user; 
        const user = await User.findById(id);

        if (!user) {
            return next(new CustomError("User not found", 404));
        }

        if (user.role !== "admin") {
            return next(new CustomError("Only admins can access this route", 403));
        }

        next(); // Adminse, devam et
    } catch (error) {
        return next(new CustomError("Server error", 500)); 
    }
};

module.exports = { getAdminAccess };
