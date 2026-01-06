import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaChevronDown, FaImage } from "react-icons/fa";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../App";
export default function AdminLayout() {
    const handleLogout = async () => {
        try {
            await axios.post(
                `${baseurl}/admin/admin-logout`,
            );
            logoutAdmin();
            toast.success("Logged out successfully");
            navigate("/admin/login", { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        }
    };
    const { logoutAdmin } = useAdminAuth();
    const navigate = useNavigate();
    const [openCourseMenu, setOpenCourseMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="instructor-wrapper">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-top">
                    <h2 className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>{collapsed ? "" : "Admin"}</h2>
                    <button
                        className="toggle-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        ☰
                    </button>
                </div>
                <ul>
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <FaHome className="icon" />
                            {!collapsed && "Dashboard"}
                        </NavLink>
                        <NavLink
                            to="/admin/banner-update"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <FaImage className="icon" />
                            {!collapsed && "Banner Update"}
                        </NavLink>
                        <NavLink
                            to="/admin/total-instructor"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Instructor"}
                        </NavLink>
                        <NavLink
                            to="/admin/category"
                        >
                            <FaBook className="icon" />
                            {!collapsed && "Category"}
                        </NavLink>
                        <NavLink
                            to="/admin/subcategory"
                        >
                            <FaBook className="icon" />
                            {!collapsed && "SubCategory"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/admin-blogs"
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Blogs"}
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="content-area">
                <div className="header-bar">
                    <h3 className="page-title">Admin Panel</h3>

                    <div className="header-right">
                        <span className="welcome-text">Welcome Admin</span>

                        <div className="profile-wrapper" style={{ position: "relative" }}>
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="user"
                                className="profile-pic"
                                style={{ cursor: "pointer" }}
                                onClick={() => setProfileOpen(!profileOpen)}
                            />

                            {/* DROPDOWN */}
                            {profileOpen && (
                                <div
                                    className="profile-dropdown"
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "50px",
                                        background: "#fff",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                        borderRadius: "8px",
                                        width: "180px",
                                        zIndex: 10
                                    }}
                                >
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/admin/profile");
                                        }}
                                    >
                                        Edit Profile
                                    </button>


                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/admin/change-password");
                                        }}
                                    >
                                        Change Password
                                    </button>
                                    <button
                                        type="button"
                                        className="dropdown-item logout"
                                        onClick={handleLogout}
                                    >
                                        Sign Out
                                    </button>


                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Page Content */}
                <Outlet />
            </div>

        </div>
    );
}
