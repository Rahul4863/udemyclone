import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center  bg-light">
            <div className="card shadow p-3" style={{ width: "420px", borderRadius: "12px", height: "410px", margin: "20px" }}>
                <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
                <p className="text-center text-muted mb-4">
                    Login to continue learning 🚀
                </p>
                <div className="">
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
                        placeholder="Enter your password"
                        className="form-control rounded-pill"
                    />
                </div>

                <button className="btn btn-primary w-100 rounded-pill py-2">
                    Login
                </button>

                <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" className="fw-semibold text-primary" style={{ textDecoration: "none" }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
