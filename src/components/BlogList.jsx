import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BlogList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function BlogList() {
    const navigate = useNavigate();
    const blogs = [
        {
            id: 1,
            title: "Difference between cloud computing and grid computing",
            category: "IT Solutions",
            date: "2025-07-15",
            image: "https://picsum.photos/600/320?random=1",
            desc: "If you’ve ever tried to make sense of all the tech jargon floating around—especially terms like cloud computing and grid computing—you’re not alone...",

        },
        {
            id: 2,
            title: "Top 10 Cybersecurity Practices for Businesses",
            category: "Cyber Security",
            date: "2025-05-10",
            image: "https://picsum.photos/600/320?random=2",
            desc: "Businesses today face evolving cyber threats. Here are the best strategies you should adopt to stay protected...",

        },
        {
            id: 3,
            title: "Artificial Intelligence changing the IT industry",
            category: "AI & Tech",
            date: "2025-03-22",
            image: "https://picsum.photos/600/320?random=3",
            desc: "AI has completely transformed IT operations, automation, analytics, and innovation like never before...",

        },
        {
            id: 4,
            title: "Artificial Intelligence changing the IT industry",
            category: "AI & Tech",
            date: "2025-03-22",
            image: "https://picsum.photos/600/320?random=3",
            desc: "AI has completely transformed IT operations, automation, analytics, and innovation like never before...",

        },

    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const goToPage = (page) => setCurrentPage(page);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    return (
        <div className="blog-wrapper">
            <div className="container py-5">
                <h2 className="text-center mb-4 blog-heading">Latest Blogs</h2>

                <div className="row g-4">
                    {currentBlogs.map((b) => (
                        <div className="col-md-6 col-lg-4" key={b.id}>
                            <div className="blog-card shadow">

                                <img src={b.image} alt="blog" className="blog-img" />

                                <div className="p-3">
                                    <span className="date-badge">
                                        <i className="bi bi-calendar2-event"></i> {b.date}
                                    </span>
                                    <span className="category-badge">
                                        <i className="bi bi-tag"></i> {b.category}
                                    </span>

                                    <h5 className="blog-title mt-2">{b.title}</h5>

                                    <p className="blog-desc">{b.desc}</p>

                                    <button className="read-more-btn" onClick={() => navigate(`/blog/${b.id}`)}>
                                        Read More <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                                className={`pg-btn ${currentPage === index + 1 ? "active" : ""}`}
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