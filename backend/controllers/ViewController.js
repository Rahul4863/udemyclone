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

module.exports = {
    getAllBlogs,
    getBanner,
    getCategoryAndSubcategory
}