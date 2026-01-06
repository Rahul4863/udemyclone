const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_ADMIN_TOKEN_SECRET = process.env.ACCESS_ADMIN_TOKEN_SECRET;

const adminauthenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: "Authorization header missing"
        });
    }

    // Expected: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, ACCESS_ADMIN_TOKEN_SECRET);

        // ✅ CORRECT role check
        if (String(decoded.role) !== "2") {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access"
            });
        }

        req.admin = decoded; // attach decoded token
        next();

    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};
module.exports = { adminauthenticate };
