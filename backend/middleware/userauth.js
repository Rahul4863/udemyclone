const jwt = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const userauthenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: "Authorization header missing"
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token missing"
        });
    }
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if (String(decoded.role) !== "1") {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access"
            });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};
module.exports = { userauthenticate };