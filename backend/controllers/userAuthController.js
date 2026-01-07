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
const BannerController = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file;
        const userId = req.user.id;
        if (!title || !file) {
            return res.status(400).json({ status: false, message: "Title image are required" });
        }
        const imagePath = file.path.replace(/\\/g, "/"); // normalize path
        await db.insert("tbl_banner", {
            title,
            image: imagePath,
            created_at: new Date(),
        });
        res.status(200).json({ status: true, message: "Banner created successfully", image: imagePath });
    } catch (err) {
        res.status(500).json({ message: "Error uploading banner", error: err.toString() });
    }

}
const getBannerController = async (req, res) => {
    try {
        const banner = await db.selectAll("tbl_banner", "*");
        if (banner.length === 0) {
            return res.status(404).json({ status: false, message: "No banner found" });
        }
        res.status(200).json({ status: true, message: "data fetched successfully", data: banner });
    } catch (error) {
        console.error("Error fetching industries:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const deleteBannerController = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await db.select("tbl_banner", "*", `id='${id}'`);
        if (!existing) {
            return res.status(404).json({ status: false, message: "not found" });
        }
        const imagePath = existing.image;
        const absolutePath = path.join(__dirname, "..", imagePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
        await db.delete("tbl_banner", `id='${id}'`);
        res.status(200).json({ status: true, message: "Banner and image deleted successfully" });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: err.toString(),
        });
    }
}
const EditBannerController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.select("tbl_banner", "*", `id='${id}'`, true);
        if (!result) {
            return res.status(404).json({ status: false, message: "not found" });
        }
        res.status(200).json({ status: true, message: "data fetched successfully", data: result });

    } catch (error) {
        s
        console.error("Error editing home banner:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
}
const updateBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const { title } = req.body;
        const file = req.file;
        const userId = req.user.id;
        if (!title) {
            return res.status(400).json({ status: false, message: "Title and Image are required" });
        } const existing = await db.select("tbl_banner", "*", `id='${id}'`);
        let imagePath = existing.image;
        // If a new image is uploaded, delete the old one
        if (file) {
            const oldPath = path.join(__dirname, "..", imagePath);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            imagePath = file.path.replace(/\\/g, "/");
        }
        await db.update(
            "tbl_banner",
            {
                title,
                image: imagePath

            },
            `id='${id}'`
        );

        res.status(200).json({ status: true, message: "Banner updated successfully", image: imagePath });
    } catch (err) {
        res.status(500).json({ status: false, message: "Error updating banner", error: err.toString() });
    }
}
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
    refreshAccessToken,
    logout,
    BannerController,
    getBannerController,
    deleteBannerController,
    EditBannerController,
    updateBanner
}