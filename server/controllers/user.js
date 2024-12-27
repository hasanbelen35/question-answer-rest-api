const User = require("../schemas/user");
const CustomError = require("../helpers/error/CustomError");
const getSingleUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);  

        if (!user) {
            return next(new CustomError("User not found", 400));  
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return next(error);  
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = { getSingleUser ,getAllUsers };