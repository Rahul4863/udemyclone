const db = require("../config/db_Setting")
const path = require("path")
const fs = require('fs');
const { post } = require("../routes/userRoute");
const createCourse = async (req, res) => {
    try {
        const { title, slug, description, heading, level, language, category, subcategory, is_free, price, learn, requirements, coursefor, status,
        } = req.body;
        if (!title || !slug || !description || !heading || !level || !language || !price || !learn || !requirements || !coursefor) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        const instructorId = req.user.id;
        const imageFile = req.files?.photo?.[0] || null;
        const videoFile = req.files?.video?.[0] || null;
        if (!videoFile) {
            return res.status(400).json({
                status: false,
                message: "Course video is required",
            });
        }
        const thumbnailPath = imageFile
            ? imageFile.path.replace(/\\/g, "/")
            : null;

        const videoPath = videoFile.path.replace(/\\/g, "/");
        const insertData = {
            instructor_id: instructorId,
            title,
            slug,
            description,
            category,
            subcategory,
            heading,
            thumbnail: thumbnailPath,
            coursevideo: videoPath,
            level,
            language,
            price: Number(is_free) === 1 ? 0 : price,
            is_free,
            status: status ?? 1,
            learn,
            requirements,
            coursefor,
            'created_at': new Date(),
        };
        await db.insert("tbl_courses", insertData);
        return res.status(201).json({
            status: true,
            message: "Course created successfully",
        });

    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const getSubcategories = async (req, res) => {
    const id = req.params.id;
    const data = await db.selectAll('tbl_subcategory', '*', `category_id=${id}`);
    if (!data) {
        return res.status(404).json({
            status: false,
            message: "Subcategories not found",
        });
    }

    return res.status(200).json({
        status: true,
        data
    })
}
const getAllCourses = async (req, res) => {
    try {
        const data = await db.selectAll('tbl_courses', '*');
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "Courses not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Courses fetched successfully",
            data
        })

    } catch (error) {
        console.error("GET ALL COURSES ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });

    }
}
const createSection = async (req, res) => {
    try {
        const { course_id, title, position } = req.body;
        const instructor_id = req.user.id;
        if (!course_id || !title || !position) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        const insertData = {
            course_id,
            instructor_id,
            title,
            position,
            'created_at': new Date(),
        };
        await db.insert("tbl_sections", insertData);
        return res.status(201).json({
            status: true,
            message: "Section created successfully",
        });
    } catch (error) {
        console.error("CREATE SECTION ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
}
module.exports = { createCourse, getSubcategories, getAllCourses, createSection };