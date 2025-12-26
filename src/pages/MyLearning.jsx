import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Dropdown, ButtonGroup, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MyLearning.css";

function MyLearning() {
    const navigate = useNavigate();

    const purchasedCourses = [
        { title: "Complete Web Development Bootcamp", trainer: "Angela Yu", category: "Development", progress: 40, img: "https://picsum.photos/500/300?1" },
        { title: "Python Masterclass", trainer: "Jose Portilla", category: "Development", progress: 100, img: "https://picsum.photos/500/300?2" },
        { title: "AWS Solutions Architect", trainer: "Stephane Maarek", category: "Cloud", progress: 10, img: "https://picsum.photos/500/300?3" },
        { title: "UI/UX Design Mastery", trainer: "Chris Do", category: "Design", progress: 75, img: "https://picsum.photos/500/300?4" },
        { title: "UI/UX Design Mastery", trainer: "Chris Do", category: "Design", progress: 75, img: "https://picsum.photos/500/300?4" },
        { title: "UI/UX Design Mastery", trainer: "Chris Do", category: "Design", progress: 75, img: "https://picsum.photos/500/300?4" },
        { title: "UI/UX Design Mastery", trainer: "Chris Do", category: "Design", progress: 75, img: "https://picsum.photos/500/300?4" },
    ];

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [progressFilter, setProgressFilter] = useState("All");

    const categories = ["All", "Development", "Cloud", "Design"];

    // ---------- FILTER COURSES ----------
    const filteredCourses = purchasedCourses.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || c.category === category;
        const matchProgress =
            progressFilter === "All" ||
            (progressFilter === "Completed" && c.progress === 100) ||
            (progressFilter === "In Progress" && c.progress > 0 && c.progress < 100) ||
            (progressFilter === "Not Started" && c.progress === 0);

        return matchSearch && matchCategory && matchProgress;
    });

    // ---------- PAGINATION ----------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Reset to page 1 when filters/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, progressFilter]);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">My Learning</h2>

            {/* ---------- FILTER BAR ---------- */}
            <div className="learning-filter-bar">
                <div className="left-controls">
                    <div className="label">Sort by</div>

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle className="purple-btn">
                            Recently Accessed
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Recently Accessed</Dropdown.Item>
                            <Dropdown.Item>Recently Purchased</Dropdown.Item>
                            <Dropdown.Item>Title (A-Z)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="label ms-4">Filter by</div>

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle className="purple-btn">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map((c, i) => (
                                <Dropdown.Item key={i} onClick={() => setCategory(c)}>
                                    {c}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle className="purple-btn">
                            Progress
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setProgressFilter("All")}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProgressFilter("Completed")}>Completed</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProgressFilter("In Progress")}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProgressFilter("Not Started")}>Not Started</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <span
                        className="reset-text"
                        onClick={() => {
                            setCategory("All");
                            setProgressFilter("All");
                            setSearch("");
                        }}
                    >
                        Reset
                    </span>
                </div>

                <div className="search-bar">
                    <Form.Control
                        type="text"
                        placeholder="Search my courses"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="search-btn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            {/* ---------- COURSES ---------- */}
            <Row className="g-3">
                {currentCourses.map((c, i) => (
                    <Col md={6} lg={4} key={i}>
                        <Card className="shadow-sm border-0" onClick={() => navigate(`/courseplayer/${i}`)}>
                            <Card.Img src={c.img} />
                            <Card.Body>
                                <h6 className="fw-bold">{c.title}</h6>
                                <p className="text-muted small">{c.trainer}</p>

                                <span className="badge bg-primary">{c.category}</span>

                                <div className="mt-2">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar bg-success" style={{ width: `${c.progress}%` }} />
                                    </div>

                                    <small className="text-muted">
                                        {c.progress === 100 ? "Completed" : `${c.progress}% completed`}
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ---------- PAGINATION ---------- */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination className="pretty-pagination">
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        />

                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </div>
            )}
            {/* ---------- NO DATA ---------- */}
            {filteredCourses.length === 0 && (
                <p className="text-muted text-center mt-4">
                    No courses found.
                </p>
            )}
        </div>
    );
}
export default MyLearning;