import React, { useState } from "react";

function ChangePassword() {

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("New password & Confirm password do not match ❌");
            return;
        }

        alert("Password Changed Successfully 🎉");

        setForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    return (
        <div className="container mt-4 mb-5">
            <h2 className="fw-bold mb-4">Change Password</h2>

            <div className="row">
                <div className="col-lg-12">

                    <div
                        className="card shadow p-4 border-0"
                        style={{ borderRadius: "15px", width: "100%" }}
                    >
                        <form onSubmit={handleSubmit}>

                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label className="form-label fw-semibold">Old Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        name="oldPassword"
                                        value={form.oldPassword}
                                        onChange={handleChange}
                                        placeholder="Enter old password"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label className="form-label fw-semibold">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label className="form-label fw-semibold">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-lg rounded-pill w-100 mt-2">
                                Update Password
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
