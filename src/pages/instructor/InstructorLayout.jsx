import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaUsers } from "react-icons/fa";
import "./Instructor.css";

export default function InstructorLayout() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    // 🔐 AUTH CHECK
    useEffect(() => {
        const token = localStorage.getItem("usertoken");
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="instructor-wrapper">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-top">
                    <h2
                        className="logo"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        {collapsed ? "" : "LMS"}
                    </h2>

                    <button
                        className="toggle-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        ☰
                    </button>
                </div>

                <ul>
                    <li>
                        <NavLink to="/instructor" end>
                            <FaHome className="icon" />
                            {!collapsed && "Dashboard"}
                        </NavLink>

                        <NavLink to="/instructor/instructor-create">
                            <FaUsers className="icon" />
                            {!collapsed && "Instructor"}
                        </NavLink>

                        <NavLink to="/instructor/courses">
                            <FaBook className="icon" />
                            {!collapsed && "Courses"}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/instructor/students">
                            <FaUsers className="icon" />
                            {!collapsed && "Students"}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/instructor/allblogs">
                            <FaUsers className="icon" />
                            {!collapsed && "Blogs"}
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="content-area">
                {/* ===== HEADER BAR ===== */}
                <div className="header-bar">
                    <h3 className="page-title">Instructor Panel</h3>

                    <div className="header-right">
                        <span className="welcome-text">Welcome Instructor</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="user"
                            className="profile-pic"
                        />
                    </div>
                </div>

                {/* Page Content */}
                <Outlet />
            </div>
        </div>
    );
}
