const PostCard = ({ post, toggleLike, setSelectedPost, setSelectedLikePost }) => (
    <div className="post-card">

        <div className="d-flex align-items-center gap-2">
            <img src={post.avatar} className="avatar" alt="" />
            <div>
                <b>{post.user}</b> <br />
                <small>Published: {post.date}</small>
            </div>
        </div>

        <p className="mt-2">{post.text}</p>

        {post.images.length > 0 && (
            <div className={`image-grid grid-${post.images.length}`}>
                {post.images.slice(0, 3).map((img, index) => (
                    <div key={index} className="img-wrapper">
                        <img src={img} className="post-img" alt="" />
                        {index === 2 && post.images.length > 3 && (
                            <div className="overlay">
                                +{post.images.length - 3}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

        <div className="like-box">
            <span onClick={() => toggleLike(post.id)} style={{ cursor: "pointer" }}>
                <i className={`bi bi-hand-thumbs-up ${post.liked ? "text-primary" : ""}`}></i>
                {" "} {post.likes} Likes
            </span>

            <span
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#commentsModal"
                onClick={() => setSelectedPost(post)}
            >
                <i className="bi bi-chat-right-text"></i> {post.comments} Comments
            </span>

            <span
                style={{ cursor: "pointer", color: "red" }}
                data-bs-toggle="modal"
                data-bs-target="#likesModal"
                onClick={() => setSelectedLikePost(post)}
            >
                ❤️ View Likes
            </span>
        </div>

    </div>
);

export default PostCard;
