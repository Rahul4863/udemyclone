const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        });
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: false,
                message: "Token expired"
            });
        }

        req.user = user;
        next();
    });
};
module.exports = {
    authenticate
};
