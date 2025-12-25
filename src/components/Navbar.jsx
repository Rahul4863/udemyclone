import React, { useState, useRef } from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {

    const navigate = useNavigate();
    const [activeCat, setActiveCat] = useState(null);
    const [arrowLeft, setArrowLeft] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const [cartItems, setCartItems] = useState([
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
    const categories = {
        Development: [
            "Web Development",
            "Mobile Development",
            "Programming Languages",
            "Game Development",
            "Database Design",
            "Software Testing"
        ],
        Business: ["Entrepreneurship", "Strategy", "Sales", "Communication"],
        "Finance & Accounting": ["Stock Market", "Crypto", "Banking", "Tax"],
        "IT & Software": ["Networking", "Cyber Security", "AWS", "Cloud"],
        "Office Productivity": ["Microsoft Office", "Excel", "PowerPoint"],
        "Personal Development": ["Leadership", "Confidence", "Productivity"],
        Design: ["UI/UX", "Graphic Design"],
        Marketing: ["Digital Marketing", "SEO"],
        "Health & Fitness": ["Yoga", "Gym", "Nutrition"],
        Music: ["Guitar", "Piano", "Singing"]
    };
    const handleHover = (cat) => {
        setActiveCat(cat);

        const rect = catRef.current[cat].getBoundingClientRect();
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

                    <Form className="mx-auto w-50">
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
                        {/* <span className="nav-item-text">My learning</span> */}


                        <i className="bi bi-heart fs-4"></i>
                        {/* <i className="bi bi-cart fs-4"></i> */}
                        <div
                            className="cart-wrapper"
                            onMouseEnter={() => setShowCart(true)}
                            onMouseLeave={() => setShowCart(false)}
                        >
                            <i className="bi bi-cart fs-4 position-relative">

                                {/* Badge Count */}
                                <span className="cart-badge">
                                    {cartItems.length}
                                </span>
                            </i>

                            {/* CART DROPDOWN */}
                            {showCart && (
                                <div className="cart-dropdown shadow">

                                    {cartItems.length === 0 ? (
                                        <p className="empty-text">Your cart is empty</p>
                                    ) : (
                                        <>
                                            {cartItems.map(item => (
                                                <div key={item.id} className="cart-item">
                                                    <img src={item.img} alt="" />
                                                    <div>
                                                        <p className="title">{item.title}</p>
                                                        <small>{item.author}</small>
                                                        <p className="price">₹{item.price} <span className="old">₹{item.oldPrice}</span></p>
                                                    </div>
                                                </div>
                                            ))}

                                            <hr />

                                            <div className="total">
                                                Total: ₹
                                                {cartItems.reduce((a, b) => a + b.price, 0)}
                                            </div>

                                            <button
                                                className="go-cart-btn"
                                                onClick={() => navigate("/cart")}
                                            >
                                                Go to cart
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <i
                            className="bi bi-person fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/login")}
                        ></i>
                        {/* <img
                            src="https://picsum.photos/40"
                            className="rounded-circle"
                            alt="profile"
                            width="35"
                            height="35"
                        /> */}
                    </Nav>

                </Container>
            </Navbar>

            <div className="category-bar shadow-sm">
                <div className="category-container">
                    {Object.keys(categories).map(cat => (
                        <span
                            key={cat}
                            ref={(el) => (catRef.current[cat] = el)}
                            className={`cat-item ${activeCat === cat ? "active" : ""}`}
                            onMouseEnter={() => handleHover(cat)}
                            onMouseLeave={() => setActiveCat(null)}
                        >
                            {cat}
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

                    {/* Moving Arrow */}
                    <div className="triangle" style={{ left: arrowLeft }}></div>

                    <div className="mega-content">
                        {categories[activeCat].map((t, i) => (
                            <span key={i} className="mega-link">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
