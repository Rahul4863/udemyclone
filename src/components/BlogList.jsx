import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BlogList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../App";
function BlogList() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const IMAGE_BASE = baseurl + "/";
    const itemsPerPage = 6;
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/view/get-allview-blogs"
                );

                // adjust if API response structure is different
                setBlogs(res.data.data || res.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const goToPage = (page) => setCurrentPage(page);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    if (loading) {
        return <div className="text-center py-5">Loading blogs...</div>;
    }
    return (
        <div className="blog-wrapper">
            <div className="container py-5">
                <h2 className="text-center mb-4 blog-heading">Latest Blogs</h2>

                <div className="row g-4">
                    {currentBlogs.length > 0 ? (
                        currentBlogs.map((b) => (
                            <div className="col-md-6 col-lg-4" key={b.id}>
                                <div className="blog-card shadow">
                                    <img
                                        src={IMAGE_BASE + b.image || "https://picsum.photos/600/320"}
                                        alt={b.title}
                                        className="blog-img"
                                    />

                                    <div className="p-3">
                                        <span className="date-badge">
                                            <i className="bi bi-calendar2-event"></i>{" "}
                                            {b.created_at?.split("T")[0]}
                                        </span>

                                        <span className="category-badge">
                                            <i className="bi bi-tag"></i>{" "}
                                            {b.category_name}
                                        </span>

                                        <h5 className="blog-title mt-2">{b.title}</h5>

                                        <p className="blog-desc">{b.description}</p>

                                        <button
                                            className="read-more-btn"
                                            onClick={() => navigate(`/blog/${b.id}`)}
                                        >
                                            Read More <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No blogs found</p>
                    )}
                </div>

                {/* 🔹 Pagination */}
                {totalPages > 1 && (
                    <div className="pagination-wrapper mt-5">
                        <button
                            className="pg-btn"
                            disabled={currentPage === 1}
                            onClick={prevPage}
                        >
                            ←
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`pg-btn ${currentPage === index + 1 ? "active" : ""
                                    }`}
                                onClick={() => goToPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="pg-btn"
                            disabled={currentPage === totalPages}
                            onClick={nextPage}
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogList;
