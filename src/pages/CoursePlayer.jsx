import React, { useState } from "react";
import { Tabs, Tab, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CoursePlayer.css";

export default function CoursePlayer() {
    const navigate = useNavigate();
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    return (
        <div className="course-player-page">
            <div className="course-topbar">
                <div className="course-title-bar">
                    <span className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>LMS</span>

                    <span className="divider"></span>

                    <span className="course-name">
                        Java Complete Bootcamp
                    </span>
                </div>


                <div className="top-actions">

                    {/* ==== LEAVE RATING ==== */}
                    <span className="link" onClick={() => setShowRating(true)}>
                        Leave a Rating
                    </span>

                    {/* ==== PROGRESS POPOVER ==== */}
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        rootClose
                        overlay={
                            <Popover id="progress-pop">
                                <Popover.Body>
                                    <p className="progress-title">24 of 622 complete.</p>
                                    <p className="progress-sub">
                                        Finish course to get your certificate
                                    </p>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <span className="link progress-btn">Your Progress</span>
                    </OverlayTrigger>

                    {/* <button className="share-btn">Share</button> */}
                </div>
            </div>


            {/* ===== PAGE LAYOUT ===== */}
            <div className="course-layout">

                {/* LEFT SIDE */}
                <div className="content-box">

                    <div className="current-lecture">
                        <span className="lecture-number">#1</span>
                        <span className="lecture-text">Java Introduction</span>
                    </div>

                    <div className="video-area">
                        <iframe
                            src="https://www.youtube.com/embed/bm0OyhwFDuY"
                            title="Course Video"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <Tabs defaultActiveKey="overview" className="course-tabs">
                        <Tab eventKey="overview" title="Overview">
                            <p className="p-3">
                                Welcome to the course! Learn complete Java from scratch.
                            </p>
                        </Tab>

                        <Tab eventKey="qa" title="Q&A">
                            <p className="p-3">Q&A Section Coming Soon...</p>
                        </Tab>

                        <Tab eventKey="notes" title="Notes">
                            <p className="p-3">Your saved notes will appear here.</p>
                        </Tab>
                    </Tabs>
                </div>


                {/* RIGHT ACCORDION SIDEBAR */}
                <div className="course-sidebar">

                    <div className="sidebar-tabs">
                        <button className="tab active">Course content</button>
                        <button className="tab">AI Assistant</button>
                    </div>

                    <div className="accordion" id="courseAccordion">

                        {/* SECTION 1 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#sec1">
                                    Section 1 — Introduction
                                    <span className="section-meta">0 / 3 | 17min</span>
                                </button>
                            </h2>

                            <div id="sec1" className="accordion-collapse collapse show"
                                data-bs-parent="#courseAccordion">
                                <div className="accordion-body">

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Welcome</div>
                                        <small>3 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> How course works?</div>
                                        <small>6 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Install Java</div>
                                        <small>8 min</small>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* SECTION 2 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#sec2">
                                    Section 2 — Basics
                                    <span className="section-meta">0 / 4 | 33min</span>
                                </button>
                            </h2>

                            <div id="sec2" className="accordion-collapse collapse"
                                data-bs-parent="#courseAccordion">

                                <div className="accordion-body">

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Variables</div>
                                        <small>8 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Operators</div>
                                        <small>10 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Loops</div>
                                        <small>7 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Conditions</div>
                                        <small>8 min</small>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* SECTION 3 */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#sec3">
                                    Section 3 — OOP
                                    <span className="section-meta">0 / 3 | 27min</span>
                                </button>
                            </h2>

                            <div id="sec3" className="accordion-collapse collapse"
                                data-bs-parent="#courseAccordion">

                                <div className="accordion-body">

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Classes</div>
                                        <small>8 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Objects</div>
                                        <small>10 min</small>
                                    </div>

                                    <div className="lecture-item">
                                        <div><span className="circle"></span> Inheritance</div>
                                        <small>9 min</small>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            {/* ===== RATING MODAL ===== */}

            <Modal show={showRating} onHide={() => setShowRating(false)} centered>
                {!rating ? (
                    /* STEP 1 — SELECT RATING */
                    <div className="rating-box">
                        <button className="close-btn" onClick={() => setShowRating(false)}>✖</button>

                        <h4 className="rating-title">How would you rate this course?</h4>
                        <p className="rating-sub">Select Rating</p>

                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span key={star}
                                    onClick={() => setRating(star)}
                                    className={`star ${rating >= star ? "active" : ""}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                ) : (
                    /* STEP 2 — FEEDBACK SCREEN */
                    <div className="rating-step2">

                        <button className="close-btn" onClick={() => setShowRating(false)}>✖</button>

                        <button className="back-btn" onClick={() => setRating(0)}>Back</button>

                        <h4 className="rating-title">Why did you leave this rating?</h4>

                        <p className="rating-level">
                            {rating === 1 && "Very Bad"}
                            {rating === 2 && "Poor / Average"}
                            {rating === 3 && "Good"}
                            {rating === 4 && "Very Good"}
                            {rating === 5 && "Excellent"}
                        </p>

                        {/* Stars again */}
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span key={star}
                                    onClick={() => setRating(star)}
                                    className={`star ${rating >= star ? "active" : ""}`}>
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* TEXTAREA */}
                        <textarea
                            className="rating-textarea"
                            placeholder="Tell us about your personal experience taking this course. Was it a good match for you?"
                        />

                        {/* BUTTON */}
                        <button className="continue-btn">
                            Save and Continue
                        </button>

                    </div>
                )}
            </Modal>


        </div>
    );
}
