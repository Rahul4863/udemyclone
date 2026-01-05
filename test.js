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
    createSubCategory,
    getAllSubCategory,
    getSubcategoryById,
    updateSubCategory
}