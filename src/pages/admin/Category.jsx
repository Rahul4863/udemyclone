import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Category() {

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (categoryName.trim() === "") return;

        // -------- UPDATE MODE ----------
        if (editId !== null) {
            const updatedData = categories.map(cat =>
                cat.id === editId ? { ...cat, name: categoryName } : cat
            );

            setCategories(updatedData);
            setCategoryName("");
            setEditId(null);
            return;
        }

        // -------- ADD MODE ----------
        const newCategory = {
            id: categories.length + 1,
            name: categoryName
        };

        setCategories([...categories, newCategory]);
        setCategoryName("");
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        setCategoryName(row.name);
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "100px"
        },
        {
            name: "Category Name",
            selector: (row) => row.name,
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

            <div className="row">

                {/* ---------- Add / Edit Category Card ---------- */}
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                {editId ? "Edit Category" : "Add Category"}
                            </h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Category"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-success w-100" type="submit">
                                    {editId ? "Update" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* ---------- Category Table Card ---------- */}
                <div className="col-md-8">
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
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Category;
