import React, { useState } from "react";

function BannerUpdate() {

    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(null);
    const [preview, setPreview] = useState("");

    const [bannerList, setBannerList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !banner) return;

        const newBanner = {
            id: Date.now(),
            title,
            image: preview
        };

        setBannerList([...bannerList, newBanner]);

        setTitle("");
        setBanner(null);
        setPreview("");
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDelete = (id) => {
        const filter = bannerList.filter((b) => b.id !== id);
        setBannerList(filter);
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setPreview(item.image);
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4 fw-bold">Banner Management</h3>

            <div className="row">

                {/* -------- LEFT CARD : FORM -------- */}
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Add / Update Banner</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Banner Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter Banner Title"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Select Banner Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImage}
                                    />
                                </div>

                                {preview && (
                                    <img
                                        src={preview}
                                        alt="banner preview"
                                        className="img-fluid rounded mb-2"
                                    />
                                )}

                                <button className="btn btn-success w-100">
                                    Save Banner
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">Banner List</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Banner Title</th>
                                        <th>Banner Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bannerList.length === 0 ? (
                                        <tr>
                                            <td colSpan="4">No Banners Available</td>
                                        </tr>
                                    ) : (
                                        bannerList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        width="120"
                                                        className="rounded"
                                                        alt="banner"
                                                    />
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm me-2"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default BannerUpdate;
