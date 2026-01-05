import React, { useState } from "react";
import DataTable from "react-data-table-component";

function SubCat() {
    const [subcategoryName, setSubcategoryName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const categoryList = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Fashion" },
        { id: 3, name: "Books" }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (subcategoryName.trim() === "" || category === "") return;
        if (editId !== null) {
            const updated = subCategories.map(item =>
                item.id === editId
                    ? { ...item, category, subcategoryName }
                    : item
            );

            setSubCategories(updated);
            setEditId(null);
        }
        else {
            const newSub = {
                id: subCategories.length + 1,
                category,
                subcategoryName
            };
            setSubCategories([...subCategories, newSub]);
        }

        setSubcategoryName("");
        setCategory("");
    };

    // EDIT BTN CLICK
    const handleEdit = (row) => {
        setEditId(row.id);
        setCategory(row.category);
        setSubcategoryName(row.subcategoryName);
    };

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
            width: "80px"
        },
        {
            name: "Category",
            selector: row => row.category,
            sortable: true
        },
        {
            name: "Subcategory",
            selector: row => row.subcategoryName,
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
                <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(row)}
                >
                    Edit
                </button>
            ),
            width: "120px"
        }
    ];

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Subcategory Management</h3>

            <div className="row">

                {/* ---------- Add / Edit Subcategory Card ---------- */}
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                {editId ? "Edit Subcategory" : "Add Subcategory"}
                            </h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                {/* Category Dropdown */}
                                <div className="mb-3">
                                    <label className="form-label">Select Category</label>
                                    <select
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">-- Select Category --</option>
                                        {categoryList.map(cat => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subcategory */}
                                <div className="mb-3">
                                    <label className="form-label">Subcategory Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Subcategory"
                                        value={subcategoryName}
                                        onChange={(e) => setSubcategoryName(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-success w-100" type="submit">
                                    {editId ? "Update" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
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
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default SubCat;