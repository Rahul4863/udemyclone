import React, { useEffect, useRef, useState } from "react";
import axiosAdmin from "../../utils/axiosAdmin";
import { baseurl } from "../../App";

function BannerUpdate() {
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(null);
    const [preview, setPreview] = useState("");
    const [bannerList, setBannerList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const fileRef = useRef(null);
    const editIdRef = useRef(null);
    const IMAGE_BASE = baseurl + "/";
    const getBanners = async () => {
        const res = await axiosAdmin.get("/admin/get-banner");
        setBannerList(res.data.data);
    };

    useEffect(() => {
        getBanners();
    }, []);
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = editIdRef.current;
        if (!title) return;

        const formData = new FormData();
        formData.append("title", title);
        if (banner) formData.append("photo", banner);

        if (id) {
            await axiosAdmin.put(
                `/admin/update-banner/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } else {
            await axiosAdmin.post(
                "/admin/create-banner",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        }

        resetForm();
        getBanners();
    };
    const handleDelete = async (id) => {
        await axiosAdmin.delete(`/admin/delete-banner/${id}`);
        getBanners();
    };

    /* ---------------- EDIT ---------------- */
    const handleEdit = async (id) => {
        try {
            editIdRef.current = id;
            setIsEditMode(true);
            const res = await axiosAdmin.get(`/admin/get-banner/${id}`);

            const bannerData = res.data.data;

            setTitle(bannerData.title);
            setPreview(IMAGE_BASE + bannerData.image);
            setBanner(null);
        } catch (err) {
            console.error("Edit fetch error:", err);
        }
    };
    const resetForm = () => {
        setTitle("");
        setBanner(null);
        setPreview("");
        setIsEditMode(false);

        editIdRef.current = null;
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold">Banner Management</h3>
            <form onSubmit={handleSubmit} className="card p-3 mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Banner Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="file"
                    className="form-control mb-2"
                    ref={fileRef}
                    onChange={handleImage}
                />

                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        width="200"
                        className="mb-2"
                    />
                )}

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                        {isEditMode ? "Update Banner" : "Create Banner"}
                    </button>

                    {isEditMode && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bannerList.map((b, i) => (
                        <tr key={b.id}>
                            <td>{i + 1}</td>
                            <td>{b.title}</td>
                            <td>
                                <img
                                    src={IMAGE_BASE + b.image}
                                    width="120"
                                    alt="banner"
                                />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(b.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(b.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BannerUpdate;
