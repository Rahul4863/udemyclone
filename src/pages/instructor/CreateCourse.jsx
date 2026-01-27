import React, { useState, useEffect } from "react";
import axiosUser from "../../utils/axiosUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./CreateCourse.css";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    heading: "",
    slug: "",
    level: "",
    language: "",
    description: "",
    price: "",
    is_free: 1,
    status: 1,
    category: "",
    subcategory: "",
    thumbnail: null,
    coursevideo: null,
  });

  const [learn, setLearn] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [coursefor, setCoursefor] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosUser.get("/auth/getallcategory");
      if (res.data.status) {
        setCategories(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    setCourse((prev) => ({
      ...prev,
      category: categoryId,
      subcategory: "",
    }));

    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      const res = await axiosUser.get(`/course/subcategories/${categoryId}`);
      if (res.data.status) {
        setSubcategories(res.data.data);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      toast.error("Failed to load subcategories");
    }
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("slug", course.slug);
      formData.append("heading", course.heading);
      formData.append("description", course.description);
      formData.append("level", course.level);
      formData.append("language", course.language);
      formData.append("is_free", course.is_free);
      formData.append("price", course.is_free ? 0 : course.price);
      formData.append("status", course.status);
      formData.append("category", course.category);
      formData.append("subcategory", course.subcategory);
      formData.append("learn", JSON.stringify(learn));
      formData.append("requirements", JSON.stringify(requirements));
      formData.append("coursefor", JSON.stringify(coursefor));

      if (course.thumbnail) formData.append("photo", course.thumbnail);
      if (course.coursevideo) formData.append("video", course.coursevideo);

      const res = await axiosUser.post("/course/create", formData);

      if (res.data.status) {
        toast.success(res.data.message || "Course created successfully");
        setTimeout(() => navigate("/instructor/courses"), 1500);
      } else {
        toast.error(res.data.message || "Failed to create course");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-4 create-course">
      {/* ================= COURSE INFO ================= */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">Course Information</h4>

        <div className="row g-4">
          <div className="col-lg-6">
            <label className="form-label fw-semibold">Course Title</label>
            <input
              className="form-control mb-3"
              value={course.title}
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                }))
              }
              placeholder="Enter course title"
            />

            <label className="form-label fw-semibold">Heading</label>
            <textarea
              className="form-control mb-3"
              rows={3}
              value={course.heading}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, heading: e.target.value }))
              }
              placeholder="Short course headline"
            />

            <label className="form-label fw-semibold">Select Level</label>
            <select
              className="form-select mb-3"
              value={course.level}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, level: e.target.value }))
              }
            >
              <option value="">Choose level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <label className="form-label fw-semibold">Course Language</label>
            <select
              className="form-select mb-3"
              value={course.language}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, language: e.target.value }))
              }
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="col-lg-6">
            <label className="form-label fw-semibold">Course Type</label>
            <select
              className="form-select mb-3"
              value={course.is_free}
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  is_free: Number(e.target.value),
                  price: e.target.value === "1" ? "" : prev.price,
                }))
              }
            >
              <option value={1}>Free</option>
              <option value={0}>Paid</option>
            </select>

            {course.is_free === 0 && (
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Course Price"
                value={course.price}
                onChange={(e) =>
                  setCourse((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            )}

            <label className="form-label fw-semibold">Course Thumbnail</label>
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  thumbnail: e.target.files[0],
                }))
              }
            />

            <label className="form-label fw-semibold">Intro Video</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  coursevideo: e.target.files[0],
                }))
              }
            />
            <label className="form-label fw-semibold">Select Category</label>
            <select
              className="form-select mb-3"
              value={course.category || ""}
              onChange={handleCategoryChange}
            >
              <option value="">Choose Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>

            <label className="form-label fw-semibold">Select Subcategory</label>
            <select
              className="form-select mb-3"
              value={course.subcategory || ""}
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  subcategory: e.target.value,
                }))
              }
              disabled={!subcategories.length}
            >
              <option value="">Choose Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subcategory_name}
                </option>
              ))}
            </select>

          </div>

        </div>
      </div>

      {/* ================= DESCRIPTION (FULL ROW) ================= */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3">Course Description</h4>
        <SunEditor
          defaultValue={course.description}
          onChange={(content) =>
            setCourse((prev) => ({ ...prev, description: content }))
          }
          setOptions={{
            height: 320,
            buttonList: [
              ["undo", "redo"],
              ["bold", "italic", "underline"],
              ["fontSize", "formatBlock"],
              ["list", "align"],
              ["link", "image"],
              ["removeFormat"],
              ["preview"],
            ],
          }}
        />
      </div>
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm">
            <h4>What Students Will Learn</h4>
            {learn.map((item, i) => (
              <div className="input-group mb-2" key={i}>
                <input
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const data = [...learn];
                    data[i] = e.target.value;
                    setLearn(data);
                  }}
                  placeholder="Learning outcome"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const data = [...learn];
                    data.splice(i, 1);
                    setLearn(data);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setLearn([...learn, ""])}
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

          <div className="card p-4 shadow-sm">
            <h4>Who is this course for?</h4>
            {coursefor.map((item, i) => (
              <div className="input-group mb-2" key={i}>
                <input
                  className="form-control"
                  value={item}
                  onChange={(e) => {
                    const data = [...coursefor];
                    data[i] = e.target.value;
                    setCoursefor(data);
                  }}
                  placeholder="Target audience"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const data = [...coursefor];
                    data.splice(i, 1);
                    setCoursefor(data);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCoursefor([...coursefor, ""])}
            >
              + Add More
            </button>
          </div>
        </div>
      </div>

      <button className="btn btn-success w-100 py-3 mt-4" onClick={handleSubmit}>
        🚀 Publish Course
      </button>
    </div>
  );
};

export default CreateCourse;
