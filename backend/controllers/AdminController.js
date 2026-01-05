const jwt = require("jsonwebtoken");
const db = require("../config/db_Setting");
// category controllers
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
    createCategory,
    getAllCategory,
    getcategoryById,
    updateCategory,
    createSubCategory,
    getAllSubCategory,
    getSubcategoryById,
    updateSubCategory
}