const CustomError = require("../../helpers/error/customError");

const customErrorHandler = (err, req, res, next) => {
    let customError = err;
//    console.log(err);
    // SyntaxError Hatası İçin
    if (err.name === "SyntaxError") {
        customError = new CustomError("Geçersiz JSON formatı", 400);
    }
    if (err.code === 11000) {
        customError = new CustomError("Duplicated key error:This email in used", 400);
    }
    if(err.name === "CastError") {
        customError = new CustomError("Please provide a valid id", 400);
    }

    // Varsayılan Hata Yanıtı
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Sunucu hatası",
    });

};

module.exports = customErrorHandler;
