import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosAdmin from "../../utils/axiosAdmin";
import { toast } from "react-toastify";

function SubCat() {
    const [subcategoryName, setSubcategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ================= FETCH CATEGORIES ================= */
    const fetchCategories = async () => {
        try {
            const res = await axiosAdmin.get("/admin/get-all-category");
            if (res.data.status) {
                setCategories(res.data.data);
            }
        } catch {
            toast.error("Failed to load categories");
        }
    };

    /* ================= FETCH SUBCATEGORIES ================= */
    const fetchSubCategories = async () => {
        try {
            const res = await axiosAdmin.get("/admin/get-all-subcategory");
            if (res.data.status) {
                setSubCategories(res.data.data);
            }
        } catch {
            toast.error("Failed to load subcategories");
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, []);

    /* ================= CREATE / UPDATE ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subcategoryName || !categoryId) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            if (editId) {
                // UPDATE
                const res = await axiosAdmin.put(
                    `/admin/update-subcategory/${editId}`,
                    {
                        subcategory_name: subcategoryName,
                        category_id: categoryId
                    }
                );

                if (res.data.status) {
                    toast.success(res.data.message);
                    setEditId(null);
                    setSubcategoryName("");
                    setCategoryId("");
                    fetchSubCategories();
                }
            } else {
                // CREATE
                const res = await axiosAdmin.post(
                    "/admin/create-subcategory",
                    {
                        subcategory_name: subcategoryName,
                        category_id: categoryId
                    }
                );

                if (res.data.status) {
                    toast.success(res.data.message);
                    setSubcategoryName("");
                    setCategoryId("");
                    fetchSubCategories();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /* ================= EDIT ================= */
    const handleEdit = async (row) => {
        try {
            const res = await axiosAdmin.get(
                `/admin/get-subcategory/${row.id}`
            );

            if (res.data.status) {
                setEditId(res.data.data.id);
                setSubcategoryName(res.data.data.subcategory_name);
                setCategoryId(res.data.data.category_id);
            }
        } catch {
            toast.error("Failed to fetch subcategory details");
        }
    };

    /* ================= TABLE COLUMNS ================= */
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            width: "80px"
        },
        {
            name: "Category ID",
            selector: (row) => row.category_name
        },
        {
            name: "Subcategory",
            selector: (row) => row.subcategory_name
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
            <h3 className="mb-4">Subcategory Management</h3>

            {/* ================= ADD / EDIT ================= */}
            <div className="card mb-4 shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        {editId ? "Edit Subcategory" : "Add Subcategory"}
                    </h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* CATEGORY */}
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-control"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* SUBCATEGORY */}
                        <div className="mb-3">
                            <label className="form-label">Subcategory Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={subcategoryName}
                                onChange={(e) =>
                                    setSubcategoryName(e.target.value)
                                }
                                placeholder="Enter subcategory"
                            />
                        </div>

                        <button
                            className="btn btn-success w-100"
                            type="submit"
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

            {/* ================= TABLE ================= */}
            <div className="card shadow">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Subcategory List</h5>
                </div>

                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={subCategories}
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

export default SubCat;
