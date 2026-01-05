export default function Step1CourseInfo({ course, setCourse, next }) {
    return (
        <div className="card p-4 shadow-sm">
            <h4>Course Information</h4>

            <div className="row">
                {/* ================= LEFT SIDE ================= */}
                <div className="col-lg-6">

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course Title</label>
                        <input
                            className="form-control"
                            value={course.title}
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                            placeholder="Enter course title"
                        />
                    </div>

                    {/* Subtitle */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course Subtitle</label>
                        <input
                            className="form-control"
                            value={course.subtitle}
                            onChange={(e) =>
                                setCourse({ ...course, subtitle: e.target.value })
                            }
                            placeholder="Enter course subtitle"
                        />
                    </div>

                    {/* Instructor */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Select level</label>
                        <select
                            className="form-select"
                            value={course.level}
                            onChange={(e) =>
                                setCourse({ ...course, level: e.target.value })
                            }
                        >
                            <option value="">Choose level</option>
                            <option value="Beginners">Beginners</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Language */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Course Language</label>
                        <select
                            className="form-select"
                            value={course.language}
                            onChange={(e) =>
                                setCourse({ ...course, language: e.target.value })
                            }
                        >
                            <option value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                        </select>
                    </div>


                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="col-lg-6">

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                            className="form-control"
                            rows={6}
                            value={course.description}
                            onChange={(e) =>
                                setCourse({ ...course, description: e.target.value })
                            }
                            placeholder="Write course description"
                        ></textarea>
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Course Thumbnail Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setCourse({ ...course, image: e.target.files[0] })
                            }
                        />
                    </div>

                    {/* Video */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Intro Video</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setCourse({ ...course, video: e.target.files[0] })
                            }
                        />
                    </div>

                </div>
            </div>

            {/* NEXT BUTTON */}
            <button className="btn btn-primary mt-2" onClick={next}>
                Next →
            </button>
        </div>
    );
}
