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
const getCourseById = async (req, res) => {
    const id = req.params.id;
    const data = await db.select('tbl_courses', '*', `id=${id}`);
    if (!data) {
        return res.status(404).json({
            status: false,
            message: "Course not found",
        });
    }
    return res.status(200).json({
        status: true,
        data
    })
}
const updateCourse = async (req, res) => {
    try {
        const {
            course_id,
            title,
            slug,
            description,
            heading,
            level,
            language,
            category,
            subcategory,
            is_free,
            price,
            learn,
            requirements,
            coursefor,
            status
        } = req.body;

        if (!course_id) {
            return res.status(400).json({
                status: false,
                message: "Course ID is required",
            });
        }

        const instructorId = req.user.id;

        // ✅ Get existing course
        const existingCourse = await db.select(
            "tbl_courses",
            "*",
            `id='${course_id}' AND instructor_id='${instructorId}'`
        );

        if (!existingCourse) {
            return res.status(404).json({
                status: false,
                message: "Course not found",
            });
        }

        const imageFile = req.files?.photo?.[0] || null;
        const videoFile = req.files?.video?.[0] || null;

        let thumbnailPath = existingCourse.thumbnail;
        let videoPath = existingCourse.coursevideo;

        /* ================= HANDLE THUMBNAIL ================= */
        if (imageFile) {
            // delete old thumbnail
            if (existingCourse.thumbnail && fs.existsSync(existingCourse.thumbnail)) {
                fs.unlinkSync(existingCourse.thumbnail);
            }

            thumbnailPath = imageFile.path.replace(/\\/g, "/");
        }

        /* ================= HANDLE VIDEO ================= */
        if (videoFile) {
            // delete old video
            if (existingCourse.coursevideo && fs.existsSync(existingCourse.coursevideo)) {
                fs.unlinkSync(existingCourse.coursevideo);
            }

            videoPath = videoFile.path.replace(/\\/g, "/");
        }

        const updateData = {
            title,
            slug,
            description,
            heading,
            level,
            language,
            category,
            subcategory,
            thumbnail: thumbnailPath,
            coursevideo: videoPath,
            price: Number(is_free) === 1 ? 0 : price,
            is_free,
            status: status ?? existingCourse.status,
            learn,
            requirements,
            coursefor,
            updated_at: new Date(),
        };

        await db.update(
            "tbl_courses",
            updateData,
            `id='${course_id}'`
        );

        return res.status(200).json({
            status: true,
            message: "Course updated successfully",
        });

    } catch (error) {
        console.error("UPDATE COURSE ERROR:", error);
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
const editSection = async (req, res) => {
    const id = req.params.id;
    const data = await db.select('tbl_sections', '*', `id='${id}'`)
    if (!data) {
        return res.status(404).json({
            status: false,
            message: "Section not found",
        })
    }
    return res.status(200).json({
        status: true,
        data
    })
}
const updateSection = async (req, res) => {
    // const id = req.params.id;
    try {
        const { section_id, title, position } = req.body;
        if (!title || !position) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        const insertData = {
            title,
            position,
            'updated_at': new Date(),
        };
        await db.update("tbl_sections", insertData, `id='${section_id}'`);
        return res.status(201).json({
            status: true,
            message: "Section updated successfully",
        });
    } catch (error) {
        console.error("UPDATE SECTION ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
}
const GetAllSection = async (req, res) => {
    try {
        const course_id = req.params.id;
        const instructor_id = req.user.id;

        // 1️⃣ Get sections
        const sections = await db.selectAll(
            "tbl_sections",
            "*",
            `course_id='${course_id}' AND instructor_id='${instructor_id}'`,
            "ORDER BY position ASC"
        );

        if (!sections || sections.length === 0) {
            return res.status(200).json({
                status: true,
                data: [],
            });
        }

        // 2️⃣ Loop sections
        for (let section of sections) {

            // 👉 Get lectures of this section
            const lectures = await db.selectAll(
                "tbl_lectures",
                "*",
                `section_id='${section.id}'`,
                "ORDER BY id ASC"
            );

            section.lectures = [];
            section.total_resources = 0;

            // 3️⃣ Loop lectures
            for (let lecture of lectures || []) {

                // 👉 Get resources for this lecture + section
                const resources = await db.selectAll(
                    "tbl_lecture_resources",
                    "*",
                    `lecture_id='${lecture.id}' AND section_id='${section.id}'`,
                    "ORDER BY id DESC"
                );

                lecture.resources = resources || [];
                lecture.resource_count = lecture.resources.length;

                section.total_resources += lecture.resource_count;

                section.lectures.push(lecture);
            }
        }

        return res.status(200).json({
            status: true,
            message: "Sections with lectures & resources fetched successfully",
            data: sections,
        });

    } catch (error) {
        console.error("GET ALL SECTIONS ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};
const CreateLecture = async (req, res) => {
    try {
        const {
            course_id,
            section_id,
            title,
            type,
            Article,
            Quiz,
            is_preview,
        } = req.body;
        console.log(req.body);

        const instructor_id = req.user.id;

        // ✅ FILE IS OPTIONAL
        const file = req.file;
        const videoPath = file ? file.path.replace(/\\/g, "/") : null;

        const data = {
            course_id,
            section_id,
            instructor_id,
            title,
            type,
            video_url: type === "video" ? videoPath : null,
            Article: type === "article" ? Article : null,
            Quiz: type === "quiz" ? Quiz : null,
            is_preview: is_preview,
            created_at: new Date(),
        };

        await db.insert("tbl_lectures", data);

        return res.status(200).json({
            status: true,
            message: "Lecture inserted successfully",
        });
    } catch (error) {
        console.error("CREATE Lectures ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};
const createLectureResource = async (req, res) => {
    const { lecture_id, section_id, title, type, external_url } = req.body
    const instructor_id = req.user.id;
    const file = req.file;
    const videoPath = file ? file.path.replace(/\\/g, "/") : null;
    const data = {
        lecture_id,
        section_id,
        instructor_id,
        title,
        type,
        external_url: external_url || null,
        file_url: videoPath || null,
        'created_at': new Date(),
    };
    await db.insert("tbl_lecture_resources", data);
    return res.status(200).json({
        status: true,
        message: "Lecture resource inserted successfully",
    });

}
const updateLectureResource = async (req, res) => {
    try {
        const {
            resource_id,
            title,
            type,
            external_url
        } = req.body;

        const newFile = req.file;
        const existing = await db.select(
            "tbl_lecture_resources",
            "*",
            `id='${resource_id}'`
        );

        if (!existing) {
            return res.status(404).json({
                status: false,
                message: "Resource not found"
            });
        }

        const updateData = {
            title,
            type,
            external_url: type === "link" ? external_url : null,
            updated_at: new Date()
        };

        // 2️⃣ If new file uploaded
        if (newFile) {

            // 🔥 Delete old file if exists
            if (existing.file_url) {
                const oldPath = path.join(process.cwd(), existing.file_url);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            updateData.file_url = newFile.path.replace(/\\/g, "/");
        }

        // 3️⃣ If changing type to link → remove old file
        if (type === "link" && existing.file_url) {
            const oldPath = path.join(process.cwd(), existing.file_url);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            updateData.file_url = null;
        }

        await db.update(
            "tbl_lecture_resources",
            updateData,
            `id='${resource_id}'`
        );

        return res.json({
            status: true,
            message: "Resource updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
const DeleteLectureResource = async (req, res) => {
    try {
        const id = req.params.id;

        // 1️⃣ Get resource first
        const resource = await db.select(
            "tbl_lecture_resources",
            "*",
            `id='${id}'`
        );
        if (!resource) {
            return res.status(404).json({
                status: false,
                message: "Resource not found",
            });
        }

        // 2️⃣ Delete file from folder (if exists)
        if (resource.file_url) {
            const filePath = path.join(
                __dirname,
                "..",
                "..",
                resource.file_url
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // 3️⃣ Delete from DB
        await db.delete(
            "tbl_lecture_resources",
            `id='${id}'`
        );

        return res.json({
            status: true,
            message: "Resource deleted successfully",
        });

    } catch (error) {
        console.error("DELETE RESOURCE ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};
const updateLecture = async (req, res) => {
    try {
        const instructor_id = req.user.id;
        const {
            lecture_id,
            title,
            type,
            is_preview,
            Article,
            Quiz,
        } = req.body;

        const file = req.file;
        const videoPath = file ? file.path.replace(/\\/g, "/") : null;

        const updateData = {
            title,
            type,
            Article: null,
            Quiz: null,
            is_preview: type === "video" ? Number(is_preview) : 0,
            updated_at: new Date(),
        };

        if (type === "video" && videoPath) {
            updateData.video_url = videoPath;
        }

        if (type === "article") {
            updateData.Article = Article;
            updateData.video_url = null;
        }

        if (type === "quiz") {
            updateData.Quiz = Quiz;
            updateData.video_url = null;
        }

        await db.update(
            "tbl_lectures",
            updateData,
            `id='${lecture_id}' AND instructor_id='${instructor_id}'`
        );

        return res.status(200).json({
            status: true,
            message: "Lecture updated successfully",
        });
    } catch (error) {
        console.error("UPDATE LECTURE ERROR:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to update lecture",
        });
    }
};
module.exports = { createCourse, getCourseById, getSubcategories, updateCourse, DeleteLectureResource, getAllCourses, createSection, GetAllSection, CreateLecture, updateLecture, createLectureResource, editSection, updateSection, updateLectureResource };