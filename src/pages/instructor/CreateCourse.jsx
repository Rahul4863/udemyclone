import React, { useState } from "react";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    level: "",
    language: "",
    description: "",
    image: null,
    video: null,
  });

  const [whatLearn, setWhatLearn] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [audience, setAudience] = useState([""]);

  const handleSubmit = () => {
    const payload = {
      ...course,
      whatLearn,
      requirements,
      audience,
    };

    console.log("Course Payload:", payload);

    // yahan API call kar sakte ho (FormData if image/video)
  };

  return (
    <div className="container my-4">
      {/* ================= COURSE INFO ================= */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">Course Information</h4>

        <div className="row">
          {/* LEFT */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Course Title</label>
              <input
                className="form-control"
                value={course.title}
                onChange={(e) =>
                  setCourse({ ...course, title: e.target.value })
                }
                placeholder="Enter course title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Course Subtitle
              </label>
              <input
                className="form-control"
                value={course.subtitle}
                onChange={(e) =>
                  setCourse({ ...course, subtitle: e.target.value })
                }
                placeholder="Enter course subtitle"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Select Level
              </label>
              <select
                className="form-select"
                value={course.level}
                onChange={(e) =>
                  setCourse({ ...course, level: e.target.value })
                }
              >
                <option value="">Choose level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Course Language
              </label>
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

          {/* RIGHT */}
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>
              <textarea
                className="form-control"
                rows={6}
                value={course.description}
                onChange={(e) =>
                  setCourse({
                    ...course,
                    description: e.target.value,
                  })
                }
                placeholder="Write course description"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Course Thumbnail
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setCourse({
                    ...course,
                    image: e.target.files[0],
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Intro Video
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setCourse({
                    ...course,
                    video: e.target.files[0],
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHAT YOU'LL LEARN ================= */}
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm mb-4">
            <h4>What Students Will Learn</h4>

            {whatLearn.map((item, i) => (
              <div className="input-group mb-2" key={i}>
                <input
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const data = [...whatLearn];
                    data[i] = e.target.value;
                    setWhatLearn(data);
                  }}
                  placeholder="Add learning point"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const data = [...whatLearn];
                    data.splice(i, 1);
                    setWhatLearn(data);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setWhatLearn([...whatLearn, ""])}
            >
              + Add More
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm mb-4">
            <h4>Requirements</h4>

            {requirements.map((item, i) => (
              <div className="input-group mb-2" key={i}>
                <input
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const data = [...requirements];
                    data[i] = e.target.value;
                    setRequirements(data);
                  }}
                  placeholder="Requirement"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const data = [...requirements];
                    data.splice(i, 1);
                    setRequirements(data);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setRequirements([...requirements, ""])}
            >
              + Add More
            </button>
          </div>
        </div>
      </div>

      {/* ================= AUDIENCE ================= */}
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm mb-4">
            <h4>Who is this course for?</h4>

            {audience.map((item, i) => (
              <div className="input-group mb-2" key={i}>
                <input
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const data = [...audience];
                    data[i] = e.target.value;
                    setAudience(data);
                  }}
                  placeholder="who is the course for?"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const data = [...audience];
                    data.splice(i, 1);
                    setAudience(data);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setAudience([...audience, ""])}
            >
              + Add More
            </button>
          </div>
        </div>
      </div>

      {/* ================= SAVE ================= */}
      <button className="btn btn-success w-100" onClick={handleSubmit}>
        Save Course
      </button>
    </div>
  );
};

export default CreateCourse;
