import React, { useState, useEffect } from "react";
import useAdminProfile from "../../hooks/useAdminProfile";

function AdminProfile() {
    const { profile, loading, error } = useAdminProfile();
    const [formData, setFormData] = useState(null);

    // Fill form when profile arrives
    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                photo: profile.photo || "https://i.pravatar.cc/150"
            });
        }
    }, [profile]);

    if (loading) return <p className="text-center mt-5">Loading profile...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!formData) return null;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                photo: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile update API will be added next 🚀");
    };

    return (
        <>
            {/* HEADER */}
            <div
                style={{
                    height: "220px",
                    background: "linear-gradient(to right, #4e73df, #1cc88a)",
                    borderRadius: "0 0 30px 30px"
                }}
                className="mb-5"
            >
                <h2 className="text-white fw-bold text-center pt-5">
                    Admin Profile
                </h2>
                <p className="text-center text-light">
                    Manage your personal account details
                </p>
            </div>

            {/* PROFILE CARD */}
            <div className="container mb-5">
                <div
                    className="card shadow-lg border-0 mx-auto p-4"
                    style={{
                        maxWidth: "900px",
                        marginTop: "-120px",
                        borderRadius: "20px"
                    }}
                >
                    <div className="row align-items-center">

                        {/* LEFT */}
                        <div className="col-lg-4 text-center border-end">
                            <img
                                src={formData.photo}
                                alt="profile"
                                className="rounded-circle shadow-lg"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover"
                                }}
                            />

                            <h4 className="mt-3 fw-bold">
                                {formData.name}
                            </h4>
                            <p className="text-muted">
                                {formData.email}
                            </p>

                            <label className="btn btn-outline-primary rounded-pill px-4 mt-2">
                                Change Photo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </label>
                        </div>

                        {/* RIGHT */}
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="px-3">

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control form-control-lg"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn btn-success btn-lg w-100 rounded-pill mt-2">
                                    Save Changes
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProfile;
