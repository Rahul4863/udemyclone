import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { baseurl } from "../../App";
function AdminLogin() {
    const navigate = useNavigate();
    const { loginAdmin } = useAdminAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${baseurl}/api/admin/admin-login`,
                { email, password },
            );
            if (res.data.status) {
                loginAdmin(res.data.token); // ✅ THIS LINE FIXES EVERYTHING
                toast.success(res.data.message);
                navigate("/admin/dashboard");
            } else {
                toast.error(res.data.message || "Login failed");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const key = params.get("key");

        if (key !== "ADMIN123") {
            navigate("/");
        }
    }, []);
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
                className="card shadow p-4"
                style={{
                    width: "420px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.9)"
                }}
            >
                <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
                <p className="text-center text-muted mb-4">
                    Login to continue 🚀
                </p>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        className="form-control rounded-pill"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control rounded-pill"
                        placeholder="Enter your password"
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
            </div>
        </div>
    );
}

export default AdminLogin;
