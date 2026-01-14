const db = require("../config/db_Setting");
const path = require("path");
const fs = require("fs");
const InsightInterestController = async (req, res) => {
    const id = req.admin.id
    try {
        const {
            title,
            description,
            data,
            category_id,
            faq,
            url_title,
            status_change,
        } = req.body;
        const file = req.file;
        if (!title || !file || !description) {
            return res
                .status(400)
                .json({ status: false, message: "Title, image and description are required" });
        }
        const imagePath = file.path.replace(/\\/g, "/"); // normalize path
        await db.insert("tbl_blogs", {
            title,
            url_title, // ✅ new column
            description,
            "user_id": id,
            image: imagePath,
            data,
            faq,
            category_id,
            status_change,
            'created_at': new Date(),
        });

        res.status(200).json({
            status: true,
            message: "Banner Created  successfully",
            image: imagePath,
            url_title, // return slug too (useful for frontend)
        });
    } catch (err) {
        res.status(500).json({
            message: "Error uploading banner",
            error: err.toString(),
        });
    }
};
const getInsightInterestController = async (req, res) => {
    try {
        const blogfetch = await db.queryAll(
            `SELECT 
    tbl_blogs.*,
    tbl_category.category_name,
    tbl_users.name AS user_name
FROM tbl_blogs
LEFT JOIN tbl_category 
    ON tbl_blogs.category_id = tbl_category.id
LEFT JOIN tbl_users 
    ON tbl_blogs.user_id = tbl_users.id
ORDER BY tbl_blogs.id DESC
`
        );
        if (blogfetch.length === 0) {
            return res.status(404).json({ status: false, message: "No data found" });
        }
        res.status(200).json({
            status: true,
            message: "Data fetched successfully",
            data: blogfetch,
        });
    } catch (error) {
        console.error("Error fetching industries:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const deleteInsightInterestController = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await db.select(
            "tbl_blogs",
            "*",
            `id='${id}'`
        );
        if (!existing) {
            return res
                .status(404)
                .json({ status: false, message: "Banner not found" });
        }
        const imagePath = existing.image;
        const absolutePath = path.join(__dirname, "..", imagePath);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
        await db.delete("tbl_blogs", `id='${id}'`);

        return res
            .status(200)
            .json({ status: true, message: "Banner and image deleted successfully" });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: err.toString(),
        });
    }
};
const EditInsightInterestController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.select(
            "tbl_blogs",
            "*",
            `id='${id}'`,
        );
        if (!result) {
            return res
                .status(404)
                .json({ status: false, message: "data not found" });
        }
        res.status(200).json({
            status: true,
            message: "data fetched successfully",
            data: result,
        });
    } catch (error) {
        s;
        console.error("Error editing home banner:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};
const updateInsightInterestController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            title,
            description,
            data,
            category_id,
            status_change,
            faq,
            alt,
            img_title,
            url_title,
        } = req.body;
        const file = req.file;

        const existing = await db.select(
            "tbl_blogs",
            "*",
            `id='${id}'`
        );
        let imagePath = existing.image;
        if (file) {
            const oldPath = path.join(__dirname, "..", imagePath);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            imagePath = file.path.replace(/\\/g, "/");
        }
        await db.update(
            "tbl_blogs",
            {
                title,
                description,
                data,
                category_id,
                status_change,
                alt,
                faq: faq,
                img_title,
                image: imagePath,
                url_title,
                "updated_at": new Date(),
            },
            `id='${id}'`,
            true
        );
        return res.status(200).json({
            status: true,
            message: "data updated successfully",
            image: imagePath,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Error updating banner",
            error: err.toString(),
        });
    }
};
module.exports = {
    InsightInterestController,
    getInsightInterestController,
    deleteInsightInterestController,
    EditInsightInterestController,
    updateInsightInterestController,
};

