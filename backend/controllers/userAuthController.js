const jwt = require("jsonwebtoken");
const db = require("../config/db_Setting");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status: false, message: "All fields are required" });
    }
    const emailfound = await db.select(
        "tbl_users",
        "*",
        `email='${email}'`
    );
    if (emailfound) {
        return res.status(400).json({ status: false, message: "Email already exists" });
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
        if (user.role !== '1') {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access"
            });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "8h" }
        );
        return res.status(200).json({
            status: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user.id,
                role: user.role,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};
const getProfileById = async (req, res) => {
    const id = req.user.id;
    try {
        const user = await db.select("tbl_users", "*", `id=${id}`);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "User found",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}
const updateProfile = async (req, res) => {
    const { name, email, phone, language, description, designation } = req.body;
    const file = req.file;
    const id = req.user.id;

    try {
        const users = await db.select("tbl_users", "*", `id='${id}'`);
        if (!users || users.length === 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        let imagePath = users.image ?? "";
        if (file && imagePath.trim() !== "") {

            const oldPath = path.join(
                process.cwd(),
                imagePath.replace(/^\//, "")
            );
            if (
                fs.existsSync(oldPath) &&
                fs.lstatSync(oldPath).isFile()
            ) {
                fs.unlinkSync(oldPath);
            }
        }
        if (file) {
            imagePath = file.path.replace(/\\/g, "/");
        }
        await db.update(
            "tbl_users",
            {
                name,
                email,
                phone,
                language,
                designation,
                description,
                image: imagePath,
                updated_at: new Date()
            },
            `id='${id}'`
        );

        return res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            image: imagePath
        });

    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    userRegister,
    userlogin,
    getProfileById,
    updateProfile

}