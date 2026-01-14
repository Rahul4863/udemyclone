import React from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axiosAdmin from "../../utils/axiosAdmin";

function AdminBlogs() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const blogsFetch = async () => {
        try {
            const res = await axiosAdmin.get("/admin/getinsightinterest");
            if (res.data.status) {
                setBlogs(res.data.data);
            }
        } catch {
        }
    };
    useEffect(() => {
        blogsFetch();
    }, []);
    const columns = [
        { name: "#", selector: (row, i) => i + 1, width: "70px" },
        { name: "Title", selector: (row) => row.title, sortable: true },
        { name: "Category", selector: (row) => row.category },
        { name: "Author", selector: (row) => row.author },
        { name: "Date", selector: (row) => row.date },
    ];

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Blogs</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/admin-blog-create")}
                >
                    + Create Blog
                </button>
            </div>

            {/* Table */}
            <div className="card">
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={blogs}
                        pagination
                        highlightOnHover
                        striped
                    />
                </div>
            </div>

        </div>
    );
}
export default AdminBlogs;