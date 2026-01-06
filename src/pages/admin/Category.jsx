import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosAdmin from "../../utils/axiosAdmin";
import { toast } from "react-toastify";

function Category() {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ================= FETCH CATEGORIES (PROTECTED) ================= */
    const fetchCategories = async () => {
        try {
            const res = await axiosAdmin.get("/admin/get-all-category");

            if (res.data.status) {
                setCategories(res.data.data);
            }
        } catch (error) {
            toast.error("Unauthorized or failed to load categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    /* ================= CREATE / UPDATE CATEGORY ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        setLoading(true);

        try {
            // 🔄 UPDATE
            if (editId) {
                const res = await axiosAdmin.put(
                    `/admin/update-category/${editId}`,
                    { name: categoryName }
                );

                if (res.data.status) {
                    toast.success(res.data.message || "Category updated");
                    setEditId(null);
                    setCategoryName("");
                    fetchCategories();
                }
            }
            // ➕ CREATE
            else {
                const res = await axiosAdmin.post(
                    "/admin/create-category",
                    { category_name: categoryName }
                );

                if (res.data.status) {
                    toast.success(res.data.message || "Category created");
                    setCategoryName("");
                    fetchCategories();
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    /* ================= EDIT CATEGORY ================= */
    const handleEdit = async (row) => {
        try {
            const res = await axiosAdmin.get(
                `/admin/get-category/${row.id}`
            );

            if (res.data.status) {
                setEditId(res.data.data.id);
                setCategoryName(res.data.data.name);
            }
        } catch {
            toast.error("Failed to fetch category details");
        }
    };

    /* ================= TABLE COLUMNS ================= */
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "100px"
        },
        {
            name: "Category Name",
            selector: (row) => row.category_name,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(row)}
                >
                    Edit
                </button>
            )
        }
    ];

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Category Management</h3>

            {/* ================= ADD / EDIT FORM ================= */}
            <div className="card mb-4 shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        {editId ? "Edit Category" : "Add Category"}
                    </h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Category Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100"
                            disabled={loading}
                        >
                            {loading
                                ? "Please wait..."
                                : editId
                                    ? "Update"
                                    : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            {/* ================= CATEGORY TABLE ================= */}
            <div className="card shadow">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Category List</h5>
                </div>

                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={categories}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                    />
                </div>
            </div>
        </div>
    );
}

export default Category;
