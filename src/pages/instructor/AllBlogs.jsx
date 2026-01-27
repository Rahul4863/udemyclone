import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axiosUser from "../../utils/axiosUser";
function AllBlogs() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchBlogs();
    }, []);
    const fetchBlogs = async () => {
        try {
            const res = await axiosUser.get("/auth/getinsightinterest");
            if (res.data.status) {
                setBlogs(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };
    const columns = [
        { name: "#", selector: (row, i) => i + 1, width: "70px" },
        { name: "Title", selector: (row) => row.title, sortable: true },
        { name: "Category", selector: (row) => row.category_name },
        // { name: "Status", selector: (row) => row.status_change },
        { name: "Author", selector: (row) => row.user_name },
        { name: "Date", selector: row => row.created_at?.split("T")[0] },
        {
            name: "Status",
            cell: row => (
                row.status_change === "1" ? (
                    <span className="badge bg-warning text-dark">
                        Save as Draft
                    </span>
                ) : (
                    <span className="badge bg-success">
                        Published
                    </span>
                )
            )
        },
        {
            name: "Actions",
            selector: row => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/instructor/blog-create/${row.id}`)}
                    >
                        Edit
                    </button>
                    {/* <button
                        className="btn btn-danger btn-sm"
                        onClick={() => navigate(`/instructor/blog-delete/${row.id}`)}
                    >
                        Delete
                    </button> */}
                </div>
            )
        }

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
                        progressPending={loading}
                        noDataComponent="No blogs found"
                    />
                </div>
            </div>

        </div>
    );
}

export default AllBlogs;
