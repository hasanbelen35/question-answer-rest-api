const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if(connection) {
            console.log("db connection succesfully")
        }
    } catch (error) {
        console.log("db connection ERROR!", error.message)
    }
};

module.exports = connectDB