import React, { useState, useRef, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { baseurl } from "../App";
import "./Navbar.css";

function NavBar() {
    const navigate = useNavigate();
    // const token = localStorage.getItem("usertoken");
    const [activeCat, setActiveCat] = useState(null);
    const [arrowLeft, setArrowLeft] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [categories, setCategories] = useState([]);

    const { token, logout, user, loadingUser } = useAuth();
    const [cartItems] = useState([
        {
            id: 1,
            title: "An Entire MBA in 1 Course",
            price: 689,
            oldPrice: 3869,
            author: "Chris Haroun",
            img: "https://img-c.udemycdn.com/course/240x135/399268_268a_5.jpg"
        },
        {
            id: 2,
            title: "Intro to Entrepreneurship",
            price: 579,
            oldPrice: 3259,
            author: "Evan Kimbrell",
            img: "https://img-c.udemycdn.com/course/240x135/533682_c10c_4.jpg"
        }
    ]);

    const catRef = useRef({});
    useEffect(() => {
        fetch(`${baseurl}/api/view/categories-with-subcategories`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setCategories(data.data);
                }
            })
            .catch(err => console.error("Category API error:", err));
    }, []);
    const handleHover = (catId) => {
        setActiveCat(catId);
        const rect = catRef.current[catId].getBoundingClientRect();
        setArrowLeft(rect.left + rect.width / 2);
    };

    return (
        <>
            <Navbar bg="white" expand="lg" className="shadow-sm sticky-top py-2">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
                        LMS
                    </Navbar.Brand>
                    <Nav.Link className="ms-3 text-dark fw-semibold">Explore</Nav.Link>
                    <Form className="mx-3 flex-grow-1">
                        <div className="search-wrapper">
                            <i className="bi bi-search"></i>
                            <FormControl
                                type="search"
                                placeholder="Search for anything"
                                className="search-box"
                            />
                        </div>
                    </Form>
                    <Nav className="align-items-center gap-3">
                        {token && (
                            <>
                                <span
                                    className="nav-item-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/instructor")}
                                >
                                    Instructor
                                </span>
                                <span
                                    className="nav-item-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/mylearning")}
                                >
                                    My learning
                                </span>

                                <i className="bi bi-heart fs-4"></i>
                            </>
                        )}
                        <div
                            className="cart-wrapper"
                            onMouseEnter={() => setShowCart(true)}
                            onMouseLeave={() => setShowCart(false)}
                        >
                            <i className="bi bi-cart fs-4 position-relative">
                                <span className="cart-badge">
                                    {cartItems.length}
                                </span>
                            </i>

                            {showCart && (
                                <div className="cart-dropdown shadow">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.img} alt="" />
                                            <div>
                                                <p className="title">{item.title}</p>
                                                <p className="price">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className="go-cart-btn"
                                        onClick={() => navigate("/cart")}
                                    >
                                        Go to cart
                                    </button>
                                </div>
                            )}
                        </div>
                        {!token ? (
                            <i
                                className="bi bi-person fs-4"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/login")}
                            ></i>
                        ) : (
                            <div className="profile-wrapper">
                                <img
                                    src="https://picsum.photos/40"
                                    className="rounded-circle profile-img"
                                    alt="profile"
                                    width="35"
                                    height="35"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowProfile(prev => !prev);
                                    }}
                                />

                                {showProfile && (
                                    <div
                                        className="profile-dropdown shadow"
                                        onClick={(e) => e.stopPropagation()} // 🔴 VERY IMPORTANT
                                    >
                                        <p className="profile-name">
                                            Hello, {user?.name} 👋
                                        </p>
                                        <hr />

                                        <button
                                            className="profile-btn"
                                            onClick={() => navigate("/instructor/instructor-create")}
                                        >
                                            <i className="bi bi-person"></i> Edit Profile
                                        </button>

                                        <button
                                            className="profile-btn"
                                            onClick={() => navigate("/feed")}
                                        >
                                            <i className="bi bi-person"></i> Feed
                                        </button>

                                        <button
                                            className="profile-btn logout"
                                            onClick={() => {
                                                logout();
                                                navigate("/login");
                                            }}
                                        >
                                            <i className="bi bi-box-arrow-right"></i> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>

                        )}

                    </Nav>
                </Container>
            </Navbar>

            <div className="category-bar shadow-sm">
                <div className="category-container">
                    {categories.map(cat => (
                        <span
                            key={cat.id}
                            ref={(el) => (catRef.current[cat.id] = el)}
                            className={`cat-item ${activeCat === cat.id ? "active" : ""}`}
                            onMouseEnter={() => handleHover(cat.id)}
                            onMouseLeave={() => setActiveCat(null)}
                        >
                            {cat.name}
                        </span>
                    ))}

                </div>
            </div>

            {activeCat && (
                <div
                    className="mega-menu"
                    onMouseEnter={() => setActiveCat(activeCat)}
                    onMouseLeave={() => setActiveCat(null)}
                >
                    <div className="triangle" style={{ left: arrowLeft }}></div>
                    <div className="mega-content">
                        {categories
                            .find(cat => cat.id === activeCat)
                            ?.subcategories.map(sub => (
                                <span key={sub.id} className="mega-link">
                                    {sub.name}
                                </span>
                            ))}
                    </div>
                </div>
            )}

        </>
    );
}
export default NavBar;