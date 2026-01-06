const jwt = require("jsonwebtoken");
const db = require("../config/db_Setting");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const ACCESS_ADMIN_TOKEN_SECRET = process.env.ACCESS_ADMIN_TOKEN_SECRET;
const Adminlogin = async (req, res) => {
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

        // ✅ FIX role check
        if (user.role !== '2') {
            return res.status(403).json({
                status: false,
                message: "Unauthorized access"
            });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            ACCESS_ADMIN_TOKEN_SECRET,
            { expiresIn: "8h" }
        );
        return res.status(200).json({
            status: true,
            message: "Admin logged in successfully",
            token,
            admin: {
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
const refreshAdminAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            status: false,
            message: "Refresh token missing"
        });
    }

    jwt.verify(refreshToken, REFRESH_ADMIN_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: false,
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = jwt.sign(
            { id: user.id },
            ACCESS_ADMIN_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("accessadminToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            status: true,
            message: "Access token refreshed"
        });
    });
};
const adminlogout = (req, res) => {
    res.clearCookie("accessadminToken");
    res.clearCookie("refreshadminToken");

    return res.status(200).json({
        status: true,
        message: "Logged out successfully"
    });
};
const createCategory = async (req, res) => {
    const { category_name } = req.body;
    if (!category_name) {
        return res.status(400).json({ status: false, message: "Category name is required" });
    }
    try {
        const data = {
            category_name,
            'status': '1',
            'created_at': new Date()
        }
        await db.insert('tbl_category', data);
        return res.status(200).json({ status: true, message: "Category created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const getAllCategory = async (req, res) => {
    try {
        const data = await db.selectAll('tbl_category', "*", "status = '1'", "", true);
        return res.status(200).json({ status: true, data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const getcategoryById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "Category id is required" })
    }
    try {
        const data = await db.select('tbl_category', '*', `id=${id}`, true);
        if (!data) {
            return res.status(404).json({ status: false, message: "Category not found" })
        }
        return res.status(200).json({ status: true, data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const updateCategory = async (req, res) => {
    const { category_name } = req.body;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "Category id is required" })
    }
    if (!category_name) {
        return res.status(400).json({ status: false, message: "Category name is required" })
    }
    try {
        const data = {
            category_name,
            'updated_at': new Date()
        }
        await db.update('tbl_category', data, `id=${id}`);
        return res.status(200).json({ status: true, message: "Category updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const createSubCategory = async (req, res) => {
    const { subcategory_name, category_id } = req.body;
    if (!subcategory_name || !category_id) {
        return res.status(400).json({ status: false, message: "Subcategory name and category id are required" });
    }
    try {
        const data = {
            subcategory_name,
            category_id,
            'status': '1',
            'created_at': new Date()
        }
        await db.insert('tbl_subcategory', data);
        return res.status(200).json({ status: true, message: "Subcategory created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const getAllSubCategory = async (req, res) => {
    try {
        const data = await db.selectAll('tbl_subcategory', "*", "status = '1'", "", true);
        return res.status(200).json({ status: true, data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const getSubcategoryById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "Subcategory id is required" })
    }
    try {
        const data = await db.select('tbl_subcategory', '*', `id=${id}`, true);
        if (!data) {
            return res.status(404).json({ status: false, message: "Subcategory not found" })
        }
        return res.status(200).json({ status: true, data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const updateSubCategory = async (req, res) => {
    const { subcategory_name, category_id } = req.body;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "Subcategory id is required" })
    }
    if (!subcategory_name || !category_id) {
        return res.status(400).json({ status: false, message: "Subcategory name and category id are required" })
    }
    try {
        const data = {
            subcategory_name,
            category_id,
            'updated_at': new Date()
        }
        await db.update('tbl_subcategory', data, `id=${id}`);
        return res.status(200).json({ status: true, message: "Subcategory updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}


module.exports = {
    Adminlogin,
    createCategory,
    getAllCategory,
    getcategoryById,
    updateCategory,
    createSubCategory,
    getAllSubCategory,
    getSubcategoryById,
    updateSubCategory,
    refreshAdminAccessToken,
    adminlogout,

}