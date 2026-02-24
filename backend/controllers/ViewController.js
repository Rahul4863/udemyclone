const db = require("../config/db_Setting")
const getAllBlogs = async (req, res) => {
    try {
        const data = await db.queryAll(`
            SELECT tbl_blogs.*,tbl_category.category_name from tbl_blogs LEFT JOIN tbl_category on tbl_blogs.category_id=tbl_category.id   order by tbl_blogs.id DESC`)
        if (data.length === 0) {
            return res.status(404).json({ status: false, message: "No data found" })
        }
        return res.status(200).json({ status: true, message: "Data fetched successfully", data: data })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const getBanner = async (req, res) => {
    const banner = await db.selectAll('tbl_banner', '*')
    if (banner.length === 0) {
        return res.status(404).json({ status: false, message: "No data found" })
    }
    return res.status(200).json({ status: true, message: "Data fetched successfully", data: banner })
}
const getCategoryAndSubcategory = async (req, res) => {
    const rows = await db.queryAll(`
        SELECT 
            c.id AS category_id,
            c.category_name AS category_name,
            s.id AS subcategory_id,
            s.subcategory_name AS subcategory_name
        FROM tbl_category c
        LEFT JOIN tbl_subcategory s 
            ON s.category_id = c.id
        ORDER BY c.id
    `);
    if (!rows || rows.length === 0) {
        return res.status(404).json({
            status: false,
            message: "No data found"
        });
    }
    const grouped = {};
    rows.forEach(row => {
        if (!grouped[row.category_id]) {
            grouped[row.category_id] = {
                id: row.category_id,
                name: row.category_name,
                subcategories: []
            };
        }

        if (row.subcategory_id) {
            grouped[row.category_id].subcategories.push({
                id: row.subcategory_id,
                name: row.subcategory_name
            });
        }
    });

    // ✅ Step 3: Convert object → array
    const result = Object.values(grouped);

    return res.status(200).json({
        status: true,
        data: result
    });
};
const getCourse = async (req, res) => {
    const course = await db.queryAll(`SELECT 
    c.id,
    c.title,
    c.thumbnail AS img,
    c.price,
    c.actual_price AS actual,
    c.trending,
    u.name AS trainer,
    ROUND(IFNULL(AVG(r.rating), 0), 1) AS rating,
    COUNT(r.id) AS reviews
FROM tbl_courses c
LEFT JOIN tbl_users u 
    ON u.id = c.instructor_id
LEFT JOIN tbl_course_ratings r
    ON r.course_id = c.id
GROUP BY c.id
ORDER BY c.created_at DESC`)
    if (course.length === 0) {
        return res.status(404).json({ status: false, message: "No data found" })
    }
    return res.status(200).json({ status: true, message: "Data fetched successfully", data: course })
}
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await db.query(`
      SELECT 
        c.*,
        u.name AS instructor_name,
        u.email AS instructor_email,
        ROUND(IFNULL(AVG(r.rating),0),1) AS rating,
        COUNT(DISTINCT r.id) AS reviews
      FROM tbl_courses c
      LEFT JOIN tbl_users u ON u.id = c.instructor_id
      LEFT JOIN tbl_course_ratings r ON r.course_id = c.id
      WHERE c.id = ${courseId}
      GROUP BY c.id
    `);
        if (!course) {
            return res.status(404).json({
                status: false,
                message: "Course not found"
            });
        }
        const sections = await db.queryAll(`
      SELECT *
      FROM tbl_sections
      WHERE course_id = ${courseId}
      ORDER BY id ASC
    `);
        const lectures = await db.queryAll(`
      SELECT l.*, s.id AS section_id
      FROM tbl_lectures l
      JOIN tbl_sections s ON s.id = l.section_id
      WHERE s.course_id = ${courseId}
      ORDER BY s.id ASC, l.id ASC
    `);
        // Convert "mm:ss" or "hh:mm:ss" → seconds
        const convertToSeconds = (time) => {
            if (!time) return 0;

            const parts = time.split(":").map(Number);

            if (parts.length === 2) {
                return parts[0] * 60 + parts[1]; // mm:ss
            }

            if (parts.length === 3) {
                return parts[0] * 3600 + parts[1] * 60 + parts[2]; // hh:mm:ss
            }

            return 0;
        };

        // Convert seconds → readable format
        const formatDuration = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            if (hours > 0) {
                return `${hours}h ${minutes}m`;
            }
            return `${minutes}m ${remainingSeconds}s`;
        };

        const curriculum = sections.map(section => {

            const sectionLectures = lectures.filter(
                lecture => lecture.section_id == section.id
            );

            const totalLectures = sectionLectures.length;

            const totalSeconds = sectionLectures.reduce(
                (sum, lecture) => sum + convertToSeconds(lecture.duration),
                0
            );

            return {
                id: section.id,
                title: section.title,
                total_lectures: totalLectures,
                total_duration: formatDuration(totalSeconds),  // 👈 Added
                lectures: sectionLectures.map(lecture => ({
                    id: lecture.id,
                    name: lecture.title,
                    type: lecture.type,
                    url: lecture.video_url,
                    time: lecture.duration,
                    preview: lecture.is_preview == 1
                }))
            };
        });
        // ===== TOTAL COURSE CALCULATION =====

        const totalSections = curriculum.length;

        const totalLectures = curriculum.reduce(
            (sum, section) => sum + section.total_lectures,
            0
        );

        const totalSeconds = curriculum.reduce(
            (sum, section) => {
                const duration = section.total_duration; // like "4m 20s"

                if (!duration) return sum;

                const parts = duration.match(/(\d+)h|(\d+)m|(\d+)s/g);
                if (!parts) return sum;

                let sectionSeconds = 0;

                parts.forEach(part => {
                    if (part.includes("h")) sectionSeconds += parseInt(part) * 3600;
                    if (part.includes("m")) sectionSeconds += parseInt(part) * 60;
                    if (part.includes("s")) sectionSeconds += parseInt(part);
                });

                return sum + sectionSeconds;
            },
            0
        );

        const totalDuration = formatDuration(totalSeconds);
        const relatedCourses = await db.queryAll(`
      SELECT id, title, thumbnail, price
      FROM tbl_courses
      WHERE instructor_id = ${course.instructor_id}
      AND id != ${courseId}
      LIMIT 6
    `);
        return res.json({
            status: true,
            course,
            total: {
                total_sections: totalSections,
                total_lectures: totalLectures,
                total_duration: totalDuration
            },
            sections: curriculum,
            related_courses: relatedCourses
        });
    } catch (error) {
        console.error("Course Detail Error:", error);
        return res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
}
module.exports = {
    getAllBlogs,
    getBanner,
    getCategoryAndSubcategory,
    getCourse,
    getCourseById
}