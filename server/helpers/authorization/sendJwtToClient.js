const sendJwtToClient = (user, res) => {
    const token = user.generateJwtFromUser();

    const { JWT_COOKIE, NODE_ENV } = process.env;

    return res
        .status(200)
        .cookie("access-token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
            secure: NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            accessToken: token,
            data: {
                name: user.name,
                email: user.email,
            },
        });
};

const isTokenIncluded = req => {
    // Token'ı cookies içinde kontrol et
    return req.cookies && req.cookies["access-token"];
};

const getAccessTokenFromHeader = (req) => {
    let token;

    //if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    //      token = req.headers.authorization.split(" ")[1];
    //} else if (req.cookies["access-token"]) {

    token = req.cookies["access-token"];


    return token;
};



module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader }
