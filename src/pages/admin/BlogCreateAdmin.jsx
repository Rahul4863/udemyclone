import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import { useNavigate } from "react-router-dom";
import axiosAdmin from "../../utils/axiosAdmin";
import { toast } from "react-toastify";
import "suneditor/dist/css/suneditor.min.css";

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

const BlogCreateAdmin = () => {
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        url_title: "",
        description: "",
        data: "",
        // alt: "",
        // img_title: "",
        category_id: "",
        image: null,
        preview: "",
        faq: [],
        status_change: ""
    });

    /* ---------------- FETCH CATEGORIES ---------------- */
    const fetchCategories = async () => {
        try {
            const res = await axiosAdmin.get("/admin/get-all-category");
            if (res.data.status) {
                setCategories(res.data.data);
            }
        } catch {
            toast.error("Failed to load categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    /* ---------------- INPUT CHANGE ---------------- */
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

    /* ---------------- FAQ HANDLERS ---------------- */
    const addFaqRow = () => {
        setFormData((prev) => ({
            ...prev,
            faq: [...prev.faq, { question: "", answer: "" }],
        }));
    };

    const handleFaqChange = (index, field, value) => {
        const updated = [...formData.faq];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, faq: updated }));
    };

    const removeFaqRow = (index) => {
        const updated = [...formData.faq];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, faq: updated }));
    };

    /* ---------------- SUBMIT BLOG ---------------- */
    const handleSubmit = async () => {
        if (!formData.title || !formData.category_id || !formData.status_change) {
            toast.error("Please fill required fields");
            return;
        }

        try {
            setLoading(true);

            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("url_title", formData.url_title);
            payload.append("description", formData.description);
            payload.append("data", formData.data);
            payload.append("category_id", formData.category_id);
            payload.append("status_change", formData.status_change);

            if (formData.image) payload.append("photo", formData.image);
            payload.append("faq", JSON.stringify(formData.faq));

            const res = await axiosAdmin.post(
                "/admin/insightinterest",
                payload,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.status) {
                toast.success(res.data.message || "Blog created successfully 🎉");
                navigate("/admin/admin-blogs");
            } else {
                toast.error(res.data.message || "Failed to create blog");
            }
        } catch (err) {
            toast.error("Server error while creating blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Create Blog</h5>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/admin/admin-blogs")}
                    >
                        All Blogs
                    </button>
                </div>

                <div className="card-body">
                    <form>
                        {/* TITLE + URL */}
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label>Blog Title</label>
                                <input
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                            url_title: generateSlug(e.target.value),
                                        }))
                                    }
                                />
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Blog URL</label>
                                <input
                                    className="form-control"
                                    value={formData.url_title}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* CATEGORY + STATUS */}
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label>Blog Category</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label>Blog Status</label>
                                <select
                                    name="status_change"
                                    value={formData.status_change}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="1">Save As Draft</option>
                                    <option value="2">Published</option>
                                </select>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="mb-3">
                            <label>Blog Content</label>
                            <SunEditor
                                setContents={formData.data}
                                onChange={(content) =>
                                    setFormData((prev) => ({ ...prev, data: content }))
                                }
                                height="200px"
                            />
                        </div>

                        {/* IMAGE */}
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

                        {/* FAQ */}
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

                        {/* SUBMIT */}
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogCreateAdmin;
