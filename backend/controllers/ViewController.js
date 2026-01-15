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
module.exports = {
    getAllBlogs
}