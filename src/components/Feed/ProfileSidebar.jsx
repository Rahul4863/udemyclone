const ProfileSidebar = () => (
    <div className="col-md-3">
        <div className="profile-card">
            <img src="https://i.pravatar.cc/150?img=12" alt="profile" />
            <h4>Rahul Soni</h4>
            <span>Software Developer</span>
        </div>

        <div className="widget-box mt-3">
            <h6>Happy Wednesday 😊</h6>
            <img
                src="https://via.placeholder.com/250x130/4327ff/ffffff?text=Stay+Positive"
                className="w-100 rounded mt-2"
                alt="widget"
            />
        </div>
    </div>
);

export default ProfileSidebar;
