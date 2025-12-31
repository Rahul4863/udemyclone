import React, { useState } from "react";

function AdminProfile() {
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        phone: "9876543210",
        photo: "https://i.pravatar.cc/150"
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfile({ ...profile, photo: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile Updated Successfully 🎉");
    };

    return (
        <>
            {/* ----------- HEADER BANNER ----------- */}
            <div
                style={{
                    height: "220px",
                    background:
                        "linear-gradient(to right, #4e73df, #1cc88a)",
                    borderRadius: "0 0 30px 30px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
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

            {/* ----------- PROFILE CARD ----------- */}
            <div className="container mb-5">
                <div
                    className="card shadow-lg border-0 mx-auto p-4"
                    style={{
                        maxWidth: "900px",
                        marginTop: "-120px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    <div className="row align-items-center">

                        {/* ---------- LEFT PROFILE PANEL ---------- */}
                        <div className="col-lg-4 text-center border-end">
                            <img
                                src={profile.photo}
                                alt="profile"
                                className="rounded-circle shadow-lg"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                    border: "5px solid white"
                                }}
                            />

                            <h4 className="mt-3 fw-bold">{profile.name}</h4>
                            <p className="text-muted">{profile.email}</p>

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

                        {/* ---------- RIGHT FORM PANEL ---------- */}
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
                                            value={profile.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={profile.email}
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
                                        value={profile.phone}
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
