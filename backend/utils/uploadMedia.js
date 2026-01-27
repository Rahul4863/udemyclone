const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * @param {Array} fieldsConfig
 * Example:
 * [
 *   {
 *     name: "photo",
 *     types: [".jpg", ".png"],
 *     size: 2 * 1024 * 1024,
 *     folder: "uploads/images",
 *     maxCount: 1
 *   },
 *   {
 *     name: "video",
 *     types: [".mp4"],
 *     size: 4 * 1024 * 1024,
 *     folder: "uploads/videos",
 *     maxCount: 1
 *   }
 * ]
 */
const uploadMedia = (fieldsConfig) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const field = fieldsConfig.find(f => f.name === file.fieldname);
            if (!field) return cb(new Error("Unexpected field"));

            if (!fs.existsSync(field.folder)) {
                fs.mkdirSync(field.folder, { recursive: true });
            }

            cb(null, field.folder);
        },

        filename: (req, file, cb) => {
            const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, unique + path.extname(file.originalname));
        },
    });

    const fileFilter = (req, file, cb) => {
        const field = fieldsConfig.find(f => f.name === file.fieldname);
        if (!field) return cb(new Error("Unexpected field"));

        const ext = path.extname(file.originalname).toLowerCase();
        if (!field.types.includes(ext)) {
            return cb(
                new Error(`Invalid file type for ${file.fieldname}`),
                false
            );
        }

        cb(null, true);
    };

    return multer({
        storage,
        fileFilter,
    }).fields(
        fieldsConfig.map(f => ({
            name: f.name,
            maxCount: f.maxCount || 1,
        }))
    );
};

module.exports = uploadMedia;
