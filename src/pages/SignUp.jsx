import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
            } else {
                toast.success(data.message || "Account created successfully!");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error("Server not responding. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light mt-3">
            <div className="card shadow p-4" style={{ width: "500px", borderRadius: "12px" }}>

                <h2 className="text-center mb-2 fw-bold">Create Account</h2>
                <p className="text-center text-muted mb-4">
                    Join us to start learning 🚀
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control rounded-pill"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control rounded-pill"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control rounded-pill"
                            placeholder="Create a password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 rounded-pill py-2"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span className="text-muted">Already have an account? </span>
                    <Link
                        to="/login"
                        className="fw-semibold text-primary"
                        style={{ textDecoration: "none" }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
