import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { baseurl } from "../App";
function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }
        if (loading) return;
        setLoading(true);

        try {
            const res = await axios.post(
                `${baseurl}/api/auth/login`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            login(res.data.token);
            toast.success(res.data.message || "Login successful 🚀");
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light">
            <div
                className="card shadow p-3"
                style={{ width: "420px", borderRadius: "12px", height: "424px", margin: "20px" }}
            >
                <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
                <p className="text-center text-muted mb-4">
                    Login to continue learning 🚀
                </p>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        className="form-control rounded-pill"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control rounded-pill"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary w-100 rounded-pill py-2"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" className="fw-semibold text-primary">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
