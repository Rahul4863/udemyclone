import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="d-flex justify-content-center align-items-center  bg-light">

            <div className="card shadow p-4" style={{ width: "500px", borderRadius: "12px" }}>

                <h2 className="text-center mb-2 fw-bold">Create Account</h2>
                <p className="text-center text-muted mb-4">
                    Join us to start learning 🚀
                </p>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="form-control rounded-pill"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control rounded-pill"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="form-control rounded-pill"
                    />
                </div>

                <button className="btn btn-primary w-100 rounded-pill py-2">
                    Sign Up
                </button>

                <div className="text-center mt-3">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="fw-semibold text-primary" style={{ textDecoration: "none" }}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
