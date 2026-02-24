import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CourseDetail.css";

export default function CourseDetail() {
    const [allExpanded, setAllExpanded] = useState(false);
    const [course, setCourse] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [total, setTotal] = useState(null);
    const [curriculum, setCurriculum] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/view/get-course-by-id/${id}`
                );

                const data = await response.json();

                if (data.status) {
                    setCourse(data.course);
                    setCurriculum(data.sections);
                    setTotal(data.total);
                    setRelatedCourses(data.related_courses);
                }

            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);
    const requirements = JSON.parse(course?.requirements || "[]");
    const learns = JSON.parse(course?.learn || "[]");
    const getTotalTime = (lectures) => {
        let seconds = 0;

        lectures.forEach(l => {
            const [m, s] = l.time.split(":").map(Number);
            seconds += (m * 60) + s;
        });

        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;

        return hrs > 0 ? `${hrs}h ${remMins}min` : `${remMins}min`;
    };
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="course-detail">
            <section className="course-header text-white">
                <div className="container py-4">
                    <span className="badge bg-warning text-dark mb-2">Bestseller</span>
                    <h2 className="fw-bold">
                        {course?.title}
                    </h2>
                    <p className="fs-5 opacity-75">
                        {course?.heading}
                    </p>
                    <div className="d-flex gap-3 align-items-center small">
                        ⭐ {course?.rating} ({course?.reviews} ratings) • {course?.enrolled} students enrolled
                    </div>
                    <p className="mt-2">
                        Created by <span className="text-warning fw-semibold">{course?.instructor_name}</span>
                    </p>
                    <div className="small opacity-75">
                        🌐 Last updated {course?.updated_at} • ⏱️ {course?.language} • Subtitles
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <button className="btn btn-outline-light btn-sm">
                            ❤️ Wishlist
                        </button>
                        <button className="btn btn-outline-light btn-sm">
                            🔗 Share
                        </button>
                    </div>
                </div>
            </section>


            {/* ================= BODY ================= */}
            <div className="container mt-4">
                <div className="row g-4">

                    {/* LEFT CONTENT ================================= */}
                    <div className="col-lg-8">

                        <div className="left-content">

                            <div className="learn-box p-4 rounded shadow-sm mb-4">
                                <h4>What you'll learn</h4>

                                <div className="row mt-3">
                                    <div className="col-md-6">

                                        {learns.map((item, index) => (
                                            <p key={index}>✔ {item}</p>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div className="related-topics mt-5 learn-box p-4 rounded shadow-sm mb-4">
                                <h3 className="fw-bold mb-3">Explore Related Topics</h3>

                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge topic-badge">Web Development</span>
                                    <span className="badge topic-badge">Web Design</span>
                                    <span className="badge topic-badge">Web Security</span>
                                    <span className="badge topic-badge">Frontend</span>
                                    <span className="badge topic-badge">Backend</span>
                                </div>
                            </div>
                            <div className="p-4 rounded shadow-sm mb-4">
                                <div className="d-flex justify-content-between">
                                    <h4>Course Curriculum</h4>
                                    <p>{total?.total_sections} sections • {total?.total_lectures} lectures • {total?.total_duration} total length</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => {
                                            const items = document.querySelectorAll("#courseAccordion .accordion-collapse");
                                            const headers = document.querySelectorAll("#courseAccordion .accordion-button");

                                            if (!allExpanded) {
                                                // Expand all
                                                items.forEach(el => el.classList.add("show"));
                                                headers.forEach(btn => btn.classList.remove("collapsed"));
                                            } else {
                                                // Collapse all
                                                items.forEach(el => el.classList.remove("show"));
                                                headers.forEach(btn => btn.classList.add("collapsed"));
                                            }

                                            setAllExpanded(!allExpanded);
                                        }}
                                    >
                                        {allExpanded ? "Collapse all sections" : "Expand all sections"}
                                    </button>
                                </div>


                                <div className="accordion mt-3" id="courseAccordion">

                                    {curriculum.map((section, index) => (
                                        <div className="accordion-item mt-2" key={section.id}>

                                            <h2 className="accordion-header" id={`heading-${section.id}`}>
                                                <button
                                                    className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse-${section.id}`}
                                                    aria-expanded={index === 0 ? "true" : "false"}
                                                    aria-controls={`collapse-${section.id}`}
                                                >
                                                    <strong>{section.title}</strong>

                                                    <span className="ms-auto text-muted small">
                                                        {section.total_lectures} lectures • {section.total_duration}
                                                    </span>
                                                </button>
                                            </h2>

                                            <div
                                                id={`collapse-${section.id}`}
                                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                                aria-labelledby={`heading-${section.id}`}
                                                data-bs-parent="#courseAccordion"
                                            >
                                                <div className="accordion-body">

                                                    {section.lectures.map((lec, i) => (
                                                        <div className="d-flex justify-content-between py-2" key={i}>
                                                            <div>
                                                                📄 {lec.name}
                                                                {lec.preview && (
                                                                    <span className="text-primary ms-2" style={{ cursor: "pointer" }}>
                                                                        Preview
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-muted">{lec.time}</span>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="learn-box p-4 rounded shadow-sm mb-4">
                                <h4>Requirements</h4>

                                <div className="row mt-3">
                                    <div className="col-md-6">

                                        {requirements.map((item, index) => (
                                            <p key={index}>✔ {item}</p>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded shadow-sm mb-4">
                                <h4>Course Description</h4>

                                <div
                                    className="mt-2"
                                    style={{
                                        maxHeight: isExpanded ? "none" : "150px",
                                        overflow: "hidden",
                                        position: "relative",
                                        transition: "max-height 0.3s ease"
                                    }}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: course?.description }} />
                                </div>
                                {course?.description && (
                                    <button
                                        className="btn btn-link p-0 mt-2"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </div>
                            <div className="p-4 rounded shadow-sm mb-4">
                                <h4>Instructor</h4>

                                <div className="d-flex gap-3 align-items-center">
                                    <img src="https://picsum.photos/100" className="rounded-circle border" />

                                    <div>
                                        <h5 className="m-0">Angela Yu</h5>
                                        <span className="text-muted small">Lead Developer & Instructor</span>
                                        <p className="mt-2 small">
                                            ⭐ 4.8 Instructor Rating • 1,200,000 Students • 10 Courses
                                        </p>
                                    </div>
                                </div>

                                {/* Instructor Bio */}
                                <p className="mt-3">
                                    Angela Yu is a professional developer and lead instructor passionated
                                    about teaching coding through engaging and project-based learning.
                                    She has trained millions of students worldwide.
                                </p>
                            </div>
                            {/* ================= MORE COURSES BY INSTRUCTOR ================= */}
                            <div className="p-4 rounded shadow-sm mb-5">
                                <h4>More Courses by Angela Yu</h4>

                                <div className="row mt-3 g-3">

                                    {/* Course 1 */}
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 shadow-sm">
                                            <img src="https://picsum.photos/300/180?random=1" className="card-img-top" />

                                            <div className="card-body">
                                                <h6 className="fw-bold">
                                                    iOS App Development Bootcamp
                                                </h6>

                                                <p className="small text-muted m-0">
                                                    ⭐ 4.8 • 350,000 students
                                                </p>

                                                <p className="fw-bold mt-2 m-0">
                                                    ₹499 <span className="text-muted text-decoration-line-through small">
                                                        ₹3499
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course 2 */}
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 shadow-sm">
                                            <img src="https://picsum.photos/300/180?random=2" className="card-img-top" />

                                            <div className="card-body">
                                                <h6 className="fw-bold">
                                                    Python Pro Bootcamp
                                                </h6>

                                                <p className="small text-muted m-0">
                                                    ⭐ 4.7 • 500,000 students
                                                </p>

                                                <p className="fw-bold mt-2 m-0">
                                                    ₹599 <span className="text-muted text-decoration-line-through small">
                                                        ₹3999
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course 3 */}
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 shadow-sm">
                                            <img src="https://picsum.photos/300/180?random=3" className="card-img-top" />

                                            <div className="card-body">
                                                <h6 className="fw-bold">
                                                    Complete Web Developer Bootcamp
                                                </h6>

                                                <p className="small text-muted m-0">
                                                    ⭐ 4.8 • 700,000 students
                                                </p>

                                                <p className="fw-bold mt-2 m-0">
                                                    ₹649 <span className="text-muted text-decoration-line-through small">
                                                        ₹3999
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>


                            {/* ================= REVIEWS ================= */}
                            <div className="p-4 rounded shadow-sm mb-5">
                                <h4>Student Feedback</h4>

                                <h2 className="fw-bold mt-2 text-warning">⭐ 4.7 / 5</h2>

                                <p>Based on 450,000+ reviews</p>
                            </div>

                        </div>
                    </div>


                    {/* ================= BUY BOX ================= */}
                    <div className="col-lg-4">

                        <div className="buy-box shadow rounded p-3">

                            <div className="video-thumb position-relative"
                                onClick={() => setShowVideo(true)}>

                                <img src="https://picsum.photos/400/230" className="w-100 rounded" />

                                <div className="play-btn">▶</div>
                            </div>

                            <h3 className="mt-3">
                                ₹549
                                <span className="text-muted text-decoration-line-through small"> ₹3109</span>
                            </h3>

                            <button className="btn btn-primary w-100 mt-2">Add to Cart</button>
                            <button className="btn btn-outline-light w-100 border mt-2">Buy Now</button>

                            <p className="small text-muted mt-2">30-Day Money-Back Guarantee</p>
                        </div>

                    </div>

                </div>
            </div>


            {/* ================= VIDEO POPUP ================= */}
            {showVideo && (
                <div className="video-modal" onClick={() => setShowVideo(false)}>
                    <div className="video-box">
                        <video controls autoPlay>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
                        </video>
                    </div>
                </div>
            )}

        </div>
    );
}
