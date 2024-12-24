const jwt = require("jsonwebtoken");
const CustomError = require("../../helpers/error/customError");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/sendJwtToClient");

const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;

    // Token kontrolü
    if (!isTokenIncluded(req)) {
        return next(
            new CustomError("You are not authorized to access this route", 401)
        );
    }

    const accessToken = getAccessTokenFromHeader(req);

    // JWT doğrulama
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            // Eğer token geçersizse veya süresi dolmuşsa
            return next(
                new CustomError("You are not authorized to access this route", 401)
            );
        }

        // Doğrulanmış token'ı request nesnesine ekliyoruz
        req.user = {
            id: decoded.id,
            name: decoded.name
        };

        next(); // Middleware zincirine devam
    });
};





module.exports = { getAccessToRoute };
