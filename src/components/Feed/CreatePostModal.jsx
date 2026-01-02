const CreatePostModal = ({ text, setText, media, setMedia, addPost }) => {

    const handleImages = (e) => {
        setMedia(prev => ({
            ...prev,
            images: [...e.target.files]
        }));
    };

    const handleVideos = (e) => {
        setMedia(prev => ({
            ...prev,
            videos: [...e.target.files]
        }));
    };

    const handleDocs = (e) => {
        setMedia(prev => ({
            ...prev,
            docs: [...e.target.files]
        }));
    };

    const removeImage = (i) => {
        setMedia(prev => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== i)
        }));
    };

    const removeVideo = (i) => {
        setMedia(prev => ({
            ...prev,
            videos: prev.videos.filter((_, idx) => idx !== i)
        }));
    };

    const removeDoc = (i) => {
        setMedia(prev => ({
            ...prev,
            docs: prev.docs.filter((_, idx) => idx !== i)
        }));
    };

    return (
        <>
            <div className="create-box">
                <input
                    className="create-input"
                    placeholder="What's your mind?"
                    readOnly
                    data-bs-toggle="modal"
                    data-bs-target="#createPostModal"
                />
            </div>

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

                            {/* Upload Buttons */}
                            <div className="d-flex gap-3 mb-3">

                                <label className="btn btn-outline-primary">
                                    <i className="bi bi-image"></i> Image
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        accept="image/*"
                                        onChange={handleImages}
                                    />
                                </label>

                                <label className="btn btn-outline-success">
                                    <i className="bi bi-camera-video"></i> Video
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        accept="video/*"
                                        onChange={handleVideos}
                                    />
                                </label>

                                <label className="btn btn-outline-secondary">
                                    <i className="bi bi-file-earmark"></i> Documents
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        onChange={handleDocs}
                                    />
                                </label>

                            </div>


                            {/* ---------------- IMAGE PREVIEW ---------------- */}
                            {media.images.length > 0 && (
                                <div className="border rounded p-2 mb-2">
                                    <h6>Images</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {media.images.map((img, i) => (
                                            <div key={i} className="position-relative">
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    height={90}
                                                    width={120}
                                                    className="rounded"
                                                    alt=""
                                                />
                                                <button
                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                    onClick={() => removeImage(i)}
                                                >
                                                    ✖
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ---------------- VIDEO PREVIEW ---------------- */}
                            {media.videos.length > 0 && (
                                <div className="border rounded p-2 mb-2">
                                    <h6>Videos</h6>

                                    {media.videos.map((video, i) => (
                                        <div key={i} className="mb-2 position-relative">
                                            <video
                                                src={URL.createObjectURL(video)}
                                                controls
                                                height={140}
                                                className="rounded w-100"
                                            />
                                            <button
                                                className="btn btn-sm btn-danger mt-1"
                                                onClick={() => removeVideo(i)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ---------------- DOCUMENT PREVIEW ---------------- */}
                            {media.docs.length > 0 && (
                                <div className="border rounded p-2">
                                    <h6>Documents</h6>

                                    {media.docs.map((doc, i) => (
                                        <div
                                            key={i}
                                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                                        >
                                            <div>
                                                <strong>{doc.name}</strong>
                                                <div className="text-muted" style={{ fontSize: "13px" }}>
                                                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                                                </div>
                                            </div>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeDoc(i)}
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>

                            <button className="btn btn-success" data-bs-dismiss="modal" onClick={addPost}>
                                Post
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePostModal;
