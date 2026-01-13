import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <h1 className="notfound-code">404</h1>
            <h2 className="notfound-title">Page Not Found</h2>
            <p className="notfound-text">
                Oops! The page you are looking for doesn’t exist.
            </p>

            <button
                className="notfound-btn"
                onClick={() => navigate("/")}
            >
                Go to Home
            </button>
        </div>
    );
}
export default NotFound;
