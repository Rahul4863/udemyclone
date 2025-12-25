import React, { useState } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import "./Courses.css";

function Courses() {

    const [filters, setFilters] = useState({
        category: [],
        subCategory: [],
        language: []
    });

    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            const exists = prev[type].includes(value);
            return {
                ...prev,
                [type]: exists
                    ? prev[type].filter(item => item !== value)
                    : [...prev[type], value]
            };
        });
        setCurrentPage(1);
    };

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    const categories = ["Development", "Business", "Design", "IT & Software"];
    const subCategories = ["Web Development", "React", "Node", "Python", "Cloud", "AI"];
    const languages = ["English", "Hindi", "Spanish", "French"];
const [hoveredCourse, setHoveredCourse] = useState(null);
const [popupSide, setPopupSide] = useState("right");

// Decide popup left / right
const handleMouseEnter = (e, index) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const popupWidth = 430;
  const gap = 18;
  const safetyMargin = 30;

  const availableRightSpace =
    window.innerWidth - (rect.right + popupWidth + gap);

  if (availableRightSpace < safetyMargin) {
    setPopupSide("left");
  } else {
    setPopupSide("right");
  }

  setHoveredCourse(index);
};

    const courses = [
        {
            title: "100 Days of Python Bootcamp",
            trainer: "Dr. Angela Yu",
            rating: 4.7,
            reviews: "404,449",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?1",
            category: "Development",
            subCategory: "Python",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "AI Engineer Agentic Track",
            trainer: "Ed Donner",
            rating: 4.7,
            reviews: "24,321",
            price: 549,
            actual: 799,
            img: "https://picsum.photos/500/300?3",
            category: "IT & Software",
            subCategory: "AI",
            lang: "English"
        },
        {
            title: "Ultimate AWS Solutions Architect",
            trainer: "Stephane Maarek",
            rating: 4.7,
            reviews: "276,491",
            price: 399,
            actual: 3379,
            img: "https://picsum.photos/500/300?4",
            category: "IT & Software",
            subCategory: "Cloud",
            lang: "English"
        },
        {
            title: "Complete Web Development Bootcamp",
            trainer: "Dr. Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?5",
            category: "Development",
            subCategory: "Web Development",
            lang: "Hindi"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
        {
            title: "Full Stack Web Development",
            trainer: "Angela Yu",
            rating: 4.7,
            reviews: "459,864",
            price: 549,
            actual: 3109,
            img: "https://picsum.photos/500/300?2",
            category: "Development",
            subCategory: "Web Development",
            lang: "English"
        },
    ];

    // Filter Logic
    const filteredCourses = courses.filter(course => {
        return (
            (filters.category.length === 0 || filters.category.includes(course.category)) &&
            (filters.subCategory.length === 0 || filters.subCategory.includes(course.subCategory)) &&
            (filters.language.length === 0 || filters.language.includes(course.lang))
        );
    });

    // Pagination Logic
    const indexOfLast = currentPage * coursesPerPage;
    const indexOfFirst = indexOfLast - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <div className="container courses-wrapper mt-4">

            <Row className="g-4">

                {/* LEFT FILTERS */}
                <Col lg={4}>
                    <div className="filter-box">
                        <h4 className="fw-bold mb-3">Filters</h4>

                        <button
                            className="btn btn-outline-danger btn-sm mb-3"
                            onClick={() => {
                                setFilters({ category: [], subCategory: [], language: [] });
                                setCurrentPage(1);
                            }}
                        >
                            Reset Filters
                        </button>

                        <Accordion defaultActiveKey="0">

                            {/* CATEGORY */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Category</Accordion.Header>
                                <Accordion.Body>
                                    {categories.map((c, i) => (
                                        <div key={i} className="filter-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={filters.category.includes(c)}
                                                onChange={() => handleFilterChange("category", c)}
                                            />
                                            <label>{c}</label>
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* SUB CATEGORY */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Sub Category</Accordion.Header>
                                <Accordion.Body>
                                    {subCategories.map((s, i) => (
                                        <div key={i} className="filter-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={filters.subCategory.includes(s)}
                                                onChange={() => handleFilterChange("subCategory", s)}
                                            />
                                            <label>{s}</label>
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* LANGUAGE */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Language</Accordion.Header>
                                <Accordion.Body>
                                    {languages.map((l, i) => (
                                        <div key={i} className="filter-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={filters.language.includes(l)}
                                                onChange={() => handleFilterChange("language", l)}
                                            />
                                            <label>{l}</label>
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>
                </Col>

                {/* RIGHT COURSES */}
                <Col lg={8}>
                    <h3 className="fw-bold mb-3">All Courses</h3>

                  <Row className="g-3">
  {currentCourses.map((c, i) => (
    <Col key={i} md={6}>
      <div
        className="position-relative"
        onMouseEnter={(e) => handleMouseEnter(e, i)}
        onMouseLeave={() => setHoveredCourse(null)}
      >
        <Card className="shadow-sm border-0 course-card">
          <Card.Img src={c.img} className="course-img" />

          <Card.Body>
            <h6 className="fw-bold">{c.title}</h6>

            <p className="text-muted small">{c.trainer}</p>

            <p className="fw-bold mb-1">
              ⭐ {c.rating}
              <span className="text-muted small ms-2">
                ({c.reviews})
              </span>
            </p>

            <p className="fw-bold">
              ₹{c.price}
              <span className="text-muted text-decoration-line-through ms-2">
                ₹{c.actual}
              </span>
            </p>

            <span className="badge bg-primary me-2">{c.category}</span>
            <span className="badge bg-success">{c.subCategory}</span>
          </Card.Body>
        </Card>

        {hoveredCourse === i && (
          <div className={`preview-popup shadow ${popupSide}`}>
            <h5 className="fw-bold">{c.title}</h5>

            <div className="d-flex gap-2 mb-2">
              <span className="badge bg-purple">Premium</span>
              <span className="badge bg-success">Bestseller</span>
            </div>

            <p className="text-success small fw-bold">
              Updated November 2025
            </p>

            <p className="small text-muted">
              62 total hours • All Levels • Subtitles
            </p>

            <p>
              {c.desc ||
                "Become a Full-Stack Developer with HTML, CSS, JS, Node, React & More…"}
            </p>

            <ul>
              <li>Build real world projects</li>
              <li>Latest technologies</li>
              <li>Job ready skills</li>
            </ul>

            <div className="d-flex align-items-center gap-2 mt-3">
              <button className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center">
                <i className="bi bi-heart fs-5"></i>
              </button>

              <button className="btn btn-primary flex-grow-1">
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Col>
  ))}
</Row>


                    {/* No Results */}
                    {filteredCourses.length === 0 && (
                        <p className="text-muted mt-3">
                            No courses match your filters.
                        </p>
                    )}

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="pagination-wrapper">
                            <button
                                className="pagination-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`pagination-number ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="pagination-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}


                </Col>

            </Row>
        </div>
    );
}

export default Courses;
