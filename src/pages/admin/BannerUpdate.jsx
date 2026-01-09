import React, { useEffect, useState } from "react";
import axiosAdmin from "../../utils/axiosAdmin";

function BannerUpdate() {
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(null);
    const [preview, setPreview] = useState("");
    const [bannerList, setBannerList] = useState([]);
    const [editId, setEditId] = useState(null);

    /* ---------------- GET BANNERS ---------------- */
    const getBanners = async () => {
        const res = await axiosAdmin.get("/admin/get-banner");
        setBannerList(res.data.data);
    };

    useEffect(() => {
        getBanners();
    }, []);

    /* ---------------- IMAGE CHANGE ---------------- */
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    /* ---------------- CREATE / UPDATE ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) return;

        const formData = new FormData();
        formData.append("title", title);
        if (banner) formData.append("photo", banner);

        if (editId) {
            // UPDATE
            await axiosAdmin.put(
                `/admin/update-banner/${editId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
        } else {
            // CREATE
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
    const handleEdit = (item) => {
        setEditId(item._id);
        setTitle(item.title);
        setPreview(item.image); // backend image URL
    };

    /* ---------------- RESET ---------------- */
    const resetForm = () => {
        setTitle("");
        setBanner(null);
        setPreview("");
        setEditId(null);
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold">Banner Management</h3>

            {/* FORM */}
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
                    onChange={handleImage}
                />

                {preview && (
                    <img src={preview} alt="preview" width="200" className="mb-2" />
                )}

                <button className="btn btn-success">
                    {editId ? "Update Banner" : "Create Banner"}
                </button>
            </form>

            {/* LIST */}
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
                        <tr key={b._id}>
                            <td>{i + 1}</td>
                            <td>{b.title}</td>
                            <td>
                                <img src={b.image} width="120" alt="" />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(b)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(b._id)}
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
