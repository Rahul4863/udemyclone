import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div
                className="card shadow p-3"
                style={{
                    width: "420px",
                    borderRadius: "12px",
                    height: "auto",
                    margin: "20px",
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)"
                }}
            >
                <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
                <p className="text-center text-muted mb-4">
                    Login to continue learning 🚀
                </p>

                <div>
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control rounded-pill"
                    />
                </div>

                <div className="mb-3 mt-2">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="form-control rounded-pill"
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                        />
                        <label className="form-check-label fw-semibold" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>
                </div>

                <button className="btn btn-primary w-100 rounded-pill py-2" onClick={() => navigate("/admin/dashboard")}>
                    Login
                </button>

            </div>
        </div>
    );
}

export default AdminLogin;
