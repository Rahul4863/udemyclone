import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaChevronDown } from "react-icons/fa";
import "./Instructor.css";
import { useNavigate } from "react-router-dom";
export default function InstructorLayout() {
    const navigate = useNavigate();
    const [openCourseMenu, setOpenCourseMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="instructor-wrapper">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <div className="sidebar-top">
                    <h2 className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>{collapsed ? "" : "LMS"}</h2>
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
                            to="/instructor"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <FaHome className="icon" />
                            {!collapsed && "Dashboard"}
                        </NavLink>
                        <NavLink
                            to="/instructor/instructor-create"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Instructor"}
                        </NavLink>
                        <NavLink
                            to="/instructor/courses"
                        >
                            <FaBook className="icon" />
                            {!collapsed && "Courses"}
                        </NavLink>
                    </li>
                    {/* <li
                        className={`menu-title ${openCourseMenu ? "open" : ""}`}
                        onClick={() => setOpenCourseMenu(!openCourseMenu)}
                    >
                        <div>
                            <FaBook className="icon" />
                            {!collapsed && "Courses"}
                        </div>

                        {!collapsed && (
                            <FaChevronDown className={`arrow ${openCourseMenu ? "rotate" : ""}`} />

                        )}
                    </li>
                    {!collapsed && (
                        <ul className={`submenu ${openCourseMenu ? "show" : ""}`}>
                            <li>
                                <NavLink to="/instructor/create">
                                    Create Course
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/instructor/courses">
                                    All Courses
                                </NavLink>
                            </li>
                        </ul>
                    )} */}
                    <li>
                        <NavLink
                            to="/instructor/students"
                        >
                            <FaUsers className="icon" />
                            {!collapsed && "Students"}
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
