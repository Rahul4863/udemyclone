import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import SunEditor from "suneditor-react";
import { useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
// import { useDebounce } from "../../context/useDebounce";

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 45)
        .replace(/-+$/, "");
};

const BlogCreate = () => {
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        Author: "",
        description: "",
        blockquotes: "",
        data: "",
        alt: "",
        img_title: "",
        category_id: "",
        image: null,
        preview: "",
        url_title: "",
        faq: [],
    });

    // const debouncedTitle = useDebounce(formData.title, 600);



    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files?.length > 0) {
            setFormData((prev) => ({
                ...prev,
                image: files[0],
                preview: URL.createObjectURL(files[0]),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFaqChange = (index, field, value) => {
        const updated = [...formData.faq];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, faq: updated }));
    };

    const addFaqRow = () => {
        setFormData((prev) => ({
            ...prev,
            faq: [...prev.faq, { question: "", answer: "" }],
        }));
    };

    const removeFaqRow = (index) => {
        const updated = [...formData.faq];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, faq: updated }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("FORM SUBMITTED DATA → ", formData);
        toast.success("Form Submitted Successfully (No API Called)");
    };

    return (
        <div className="container py-4">
            {/* <ToastContainer /> */}

            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Create Blog</h5>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/instructor/allblogs")}
                    >
                        All Blogs
                    </button>
                </div>


                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {/* ===== Row 1 : Title + URL ===== */}
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Blog Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    className="form-control"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({
                                            ...prev,
                                            title: value,
                                            url_title: generateSlug(value)
                                        }));
                                    }}
                                    required
                                />
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Blog URL</label>
                                <input
                                    name="url_title"
                                    value={formData.url_title}
                                    className="form-control"

                                />
                            </div>
                        </div>

                        {/* ===== Row 2 : Category + Author ===== */}
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Blog Category</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">-- Select Category --</option>
                                    <option value="1">Technology</option>
                                    <option value="2">Cloud</option>
                                    <option value="3">Cyber Security</option>
                                    <option value="4">AI & Machine Learning</option>
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Author</label>
                                <input
                                    name="Author"
                                    value={formData.Author}
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>


                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Blog Content</label>
                            <SunEditor
                                setContents={formData.data || ""}
                                onChange={(content) =>
                                    setFormData((prev) => ({ ...prev, data: content }))
                                }
                                height="200px"
                            />
                        </div>

                        <div className="mb-3">
                            <label>Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                ref={fileRef}
                                className="form-control"
                                onChange={handleChange}
                            />

                            {formData.preview && (
                                <img
                                    src={formData.preview}
                                    width="120"
                                    className="mt-2 rounded"
                                    alt="preview"
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <h5>FAQ Section</h5>

                            {formData.faq.map((item, i) => (
                                <div className="row mb-2" key={i}>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="Question"
                                            value={item.question}
                                            onChange={(e) =>
                                                handleFaqChange(i, "question", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="Answer"
                                            value={item.answer}
                                            onChange={(e) =>
                                                handleFaqChange(i, "answer", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-auto">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFaqRow(i)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={addFaqRow}
                            >
                                Add FAQ
                            </button>
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Submit Blog
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogCreate;
