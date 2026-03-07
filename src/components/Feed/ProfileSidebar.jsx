import React, { useEffect, useState } from "react";
import { baseurl } from "../../App";

const ProfileSidebar = ({ userdata }) => {
    const BASE_URL = baseurl + '/';
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchQuote = () => {
        setLoading(true);
        fetch("https://api.quotable.io/random")
            .then(res => res.json())
            .then(data => {
                setQuote(data.content);
                setAuthor(data.author);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchQuote();
    }, []);
    return (
        <div className="col-md-3">
            <div className="profile-card text-center p-3 shadow-sm rounded">
                <img
                    src={`${BASE_URL}${userdata?.image}`}
                    alt="profile"
                    className="rounded-circle mb-2"
                    width="120"
                    height="120"
                />
                <h4 className="mb-0">
                    {userdata?.name || "Rahul Soni"}
                </h4>
                <span className="text-muted">
                    {userdata?.designation || "Software Developer"}
                </span>
            </div>
            {/* Quote Widget */}
            <div className="widget-box mt-3 p-3 shadow-sm rounded">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">💡 Daily Quote</h6>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={fetchQuote}
                        title="Refresh Quote"
                    >
                        <i className="bi bi-arrow-repeat"></i>
                    </button>
                </div>
                <p className="mt-2 mb-1" style={{ fontSize: "14px" }}>
                    {loading ? "Loading..." : quote}
                </p>
                <small className="text-muted">
                    {author && `— ${author}`}
                </small>
            </div>
        </div>
    );
};
export default ProfileSidebar;