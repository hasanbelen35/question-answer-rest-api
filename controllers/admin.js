const User = require("../schemas/user");
const CustomError = require("../helpers/error/customError");

const adminPage = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin Page",
    });
};

const blockUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return next(new CustomError("User not found", 400));
        };
        user.blocked = !user.blocked;
        await user.save();

        res.status(200).json({
            success: true,
            message: `${user.name} is Blocked / Unblocked succesfully`,
            blocked: user.blocked,
        });
    } catch (error) {
        return next(new CustomError("Server error", 500));
    }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);

        if (!user) {
            return next(new CustomError("User not found", 400));
        };

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: `${user.name} is deleted successfully`,
        });

    } catch (error) {
        console.error(error); 
        return next(new CustomError("Server error", 500));
    }
};



module.exports = {
    adminPage,
    blockUser,
    deleteUser
}
