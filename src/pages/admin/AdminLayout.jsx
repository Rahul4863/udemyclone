import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaChevronDown } from "react-icons/fa";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
export default function AdminLayout() {
    const navigate = useNavigate();
    const [openCourseMenu, setOpenCourseMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="instructor-wrapper">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-top">
                    <h2 className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>{collapsed ? "" : "AdminLMS"}</h2>
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
                            to="/instructor/students"
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Students"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/instructor/allblogs"
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Blogs"}
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="content-area">

                {/* ===== HEADER BAR ===== */}
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
                                            navigate("/admin/changepassword");
                                        }}
                                    >
                                        Change Password
                                    </button>

                                    <button
                                        className="dropdown-item logout"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/admin/login");
                                        }}
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
