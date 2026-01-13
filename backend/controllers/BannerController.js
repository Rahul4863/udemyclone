const db = require("../config/db_Setting");
const path = require("path");
const fs = require("fs");
const BannerController = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file;
        if (!title || !file) {
            return res.status(400).json({ status: false, message: "Title image are required" });
        }
        const imagePath = file.path.replace(/\\/g, "/");
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
        if (!title) {
            return res.status(400).json({ status: false, message: "Title and Image are required" });
        } const existing = await db.select("tbl_banner", "*", `id='${id}'`);
        let imagePath = existing.image;
        if (file) {
            const oldPath = path.join(__dirname, "..", imagePath);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            imagePath = file.path.replace(/\\/g, "/");
        }
        await db.update(
            "tbl_banner",
            {
                title,
                image: imagePath,
                'updated_at': new Date()

            },
            `id='${id}'`
        );
        res.status(200).json({ status: true, message: "Banner updated successfully", image: imagePath });
    } catch (err) {
        res.status(500).json({ status: false, message: "Error updating banner", error: err.toString() });
    }
}
module.exports = {
    BannerController,
    getBannerController,
    deleteBannerController,
    EditBannerController,
    updateBanner
}
