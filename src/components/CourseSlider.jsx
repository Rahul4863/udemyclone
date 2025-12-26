import Slider from "react-slick";
import { Card } from "react-bootstrap";
import "./CourseSlider.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NextArrow(props) {
    const { onClick } = props;
    return (
        <button className="custom-arrow next" onClick={onClick}>
            <i className="bi bi-chevron-right"></i>
        </button>
    );
}
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button className="custom-arrow prev" onClick={onClick}>
            <i className="bi bi-chevron-left"></i>
        </button>
    );
}
function CourseSlider({ title, courses }) {
    const navigate = useNavigate();
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const [popupSide, setPopupSide] = useState("right");
    // Decide popup left / right
    const handleMouseEnter = (e, index) => {
        const slide = e.currentTarget;
        const rect = slide.getBoundingClientRect();
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
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };
    return (
        <div className="container mt-4 course-slider-wrapper">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold mb-3">{title}</h3>
                {title === "Featured Courses" && (
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate("/allcourses")}
                    >
                        View all courses
                    </button>
                )}
            </div>
            <Slider {...settings}>
                {courses.map((c, i) => (
                    <div
                        key={i}
                        className="p-2 position-relative"
                        onMouseEnter={(e) => handleMouseEnter(e, i)}
                        onMouseLeave={() => setHoveredCourse(null)}
                    >
                        {/* Course Card */}
                        <Card className="shadow-sm course-card" onClick={() => navigate(`/course/${i}`)}>
                            <Card.Img src={c.img} />
                            <Card.Body>
                                <Card.Title className="course-title h6">{c.title}</Card.Title>
                                <p className="text-muted small">{c.trainer}</p>
                                <p className="mb-0 fw-bold">
                                    ⭐ {c.rating}{" "}
                                    <span className="text-muted">({c.reviews})</span>
                                </p>

                                <p className="fw-bold">
                                    ₹{c.price}
                                    <span className="text-muted text-decoration-line-through">
                                        ₹{c.actual}
                                    </span>
                                </p>

                                <div className="d-flex gap-2">
                                    <span className="badge bg-purple">Premium</span>
                                    <span className="badge bg-success">Bestseller</span>
                                </div>
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

                                <div className="d-flex align-items-center gap-2 mt-3" style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                                    <button className="btn btn-light border wishlist-btn">
                                        <i className="bi bi-heart fs-5"></i>
                                    </button>
                                    <button className="btn btn-primary flex-grow-1">
                                        Add to cart
                                    </button>
                                </div>
                            </div>

                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default CourseSlider;