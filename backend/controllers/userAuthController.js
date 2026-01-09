const jwt = require("jsonwebtoken");
const db = require("../config/db_Setting");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status: false, message: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const data = {
            name,
            email,
            password: hashedPassword,
            'role': '1',
            'status': '1',
            'created_at': new Date()
        }
        await db.insert('tbl_users', data);
        return res.status(200).json({ status: true, message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const userlogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        });
    }
    try {
        const user = await db.select(
            "tbl_users",
            "*",
            `email='${email}'`
        );
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            });
        }
        if (!user.role == '1') {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            });
        }
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "2m" }
        );
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            status: true,
            message: "User logged in successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};


// banner related controller

const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        status: true,
        message: "Logged out successfully"
    });
};
module.exports = {
    userRegister,
    userlogin,
    logout,

}