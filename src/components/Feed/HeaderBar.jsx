import { useNavigate } from "react-router-dom";
function HeaderBar() {
    const navigate = useNavigate();
    return (
        <div className="feed-header shadow-sm">
            <div className="left">
                <span className="brand-name" onClick={() => navigate("/")}>LMS</span>
            </div>
            <div className="center">
                🌞 Good Afternoon!! &nbsp; <b>Have a Nice Day</b>
            </div>
            <div className="right">
                <div className="bell">
                    <i className="bi bi-bell"></i>
                    <span className="badge">0</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar;
