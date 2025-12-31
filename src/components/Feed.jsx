import React, { useState } from "react";
import "./Feed.css";

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "Administrator",
            avatar: "https://i.pravatar.cc/150?img=5",
            date: "Dec 27, 2025",
            text: "Happy Birthday to Our COO & Inspiring Leader 🎉",
            images: [
                "https://picsum.photos/700/400?1",
                "https://picsum.photos/700/401?2",
                "https://picsum.photos/700/402?3"
            ],
            likes: 15,
            liked: false,
            comments: 2
        },
        {
            id: 2,
            user: "Administrator",
            avatar: "https://i.pravatar.cc/150?img=10",
            date: "Dec 25, 2025",
            text: "Merry Christmas 🎄🎅",
            images: [
                "https://picsum.photos/700/403?4",
                "https://picsum.photos/700/404?5"
            ],
            likes: 8,
            liked: false,
            comments: 1
        },
        {
            id: 3,
            user: "Administrator",
            avatar: "https://i.pravatar.cc/150?img=10",
            date: "Dec 25, 2025",
            text: "Merry Christmas 🎄🎅",
            images: [
                "https://picsum.photos/700/403?4",
                "https://picsum.photos/700/404?5"
            ],
            likes: 8,
            liked: false,
            comments: 1
        }
    ]);

    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2);


    // Add Post
    const addPost = () => {
        if (!text && files.length === 0)
            return alert("Write something or upload!");

        const newPost = {
            id: Date.now(),
            user: "Rahul Soni",
            avatar: "https://i.pravatar.cc/150?img=12",
            date: "Just Now",
            text,
            images: files.map(f => URL.createObjectURL(f)),
            likes: 0,
            liked: false,
            comments: 0
        };

        setPosts([newPost, ...posts]);
        setText("");
        setFiles([]);
    };

    // Like
    const toggleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id
                ? {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1
                }
                : post
        ));
    };

    return (
        <>
            {/* ===== HEADER BAR ===== */}
            <div className="feed-header shadow-sm">
                <div className="left">
                    {/* <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        alt="logo"
                    /> */}
                    <span className="brand-name">LMS</span>
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
            <div className="container py-4">
                <div className="row">

                    {/* LEFT PROFILE */}
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

                    {/* FEED */}
                    <div className="col-md-6">

                        {/* Create Post Box */}
                        <div className="create-box">
                            <input
                                className="create-input"
                                placeholder="What's your mind?"
                                readOnly
                                data-bs-toggle="modal"
                                data-bs-target="#createPostModal"
                            />

                            <div className="d-flex justify-content-center mt-3 gap-3">
                                <button
                                    className="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#createPostModal"
                                >
                                    <i className="bi bi-image"></i> Image
                                </button>

                                <button
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#createPostModal"
                                >
                                    Create Post
                                </button>
                            </div>
                        </div>

                        {/* Show Posts */}
                        {posts.slice(0, visibleCount).map(post => (

                            <div className="post-card" key={post.id}>
                                <div className="d-flex align-items-center gap-2">
                                    <img src={post.avatar} className="avatar" alt="" />
                                    <div>
                                        <b>{post.user}</b> <br />
                                        <small>Published: {post.date}</small>
                                    </div>
                                </div>

                                <p className="mt-2">{post.text}</p>

                                {/* Image Layout */}
                                {post.images && post.images.length > 0 && (
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

                                    <span>
                                        <i className="bi bi-chat-right-text"></i> {post.comments} Comments
                                    </span>
                                    {/* LOAD MORE BUTTON */}


                                </div>

                            </div>
                        ))}
                        {visibleCount < posts.length && (
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setVisibleCount(prev => prev + 2)}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT WIDGET */}
                    <div className="col-md-3">
                        <div className="widget-box">
                            <h6>Try your Logical Brain...</h6>

                            <div className="num-box mt-2">
                                <div>1</div><div>6</div><div>3</div>
                                <div>7</div><div>5</div><div>4</div>
                                <div>9</div><div>8</div><div>2</div>
                            </div>

                            <a className="mt-2 d-block" href="#">Reload</a>
                        </div>
                    </div>

                </div>


                {/* ================= BOOTSTRAP CREATE POST MODAL ================= */}
                <div className="modal fade" id="createPostModal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Create Post</h5>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">

                                <textarea
                                    className="form-control mb-3"
                                    rows="3"
                                    placeholder="What's on your mind ?"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />

                                <div className="d-flex gap-3 mb-3">
                                    <label className="btn btn-outline-primary">
                                        <i className="bi bi-image"></i> Image
                                        <input
                                            type="file"
                                            hidden
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => setFiles([...e.target.files])}
                                        />
                                    </label>

                                    <button className="btn btn-outline-secondary" disabled>
                                        <i className="bi bi-camera-video"></i> Video
                                    </button>

                                    <button className="btn btn-outline-secondary" disabled>
                                        <i className="bi bi-file-earmark"></i> Documents
                                    </button>

                                </div>

                                {/* File Preview */}
                                {files.length > 0 && (
                                    <div className="border rounded p-2">
                                        {files.map((file, index) => (
                                            <div
                                                className="d-flex justify-content-between align-items-center border-bottom py-2"
                                                key={index}
                                            >
                                                <div>
                                                    <strong>{file.name}</strong>
                                                    <div className="text-muted" style={{ fontSize: "13px" }}>
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        ))}

                                        <small className="text-muted">
                                            Total: {files.length} files, {(files.reduce((a, b) => a + b.size, 0) / 1024 / 1024).toFixed(2)} MB
                                        </small>
                                    </div>
                                )}

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>

                                <button
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={addPost}
                                >
                                    Post
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Feed;
