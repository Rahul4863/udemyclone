import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function AllBlogs() {
    const navigate = useNavigate();

    // Dummy Blog Data (Replace with API later)
    const blogs = [
        {
            id: 1,
            title: "Cloud Computing vs Grid Computing",
            category: "IT Solutions",
            author: "Rahul",
            date: "2025-02-10",
        },
        {
            id: 2,
            title: "Cyber Security Best Practices",
            category: "Cyber Security",
            author: "Admin",
            date: "2025-01-25",
        },
    ];

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
                    onClick={() => navigate("/instructor/blog-create")}
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
export default AllBlogs;