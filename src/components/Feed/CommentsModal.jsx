const CommentsModal = ({ selectedPost, setSelectedPost, commentInput, setCommentInput, addCommentModal }) => (
    <div className="modal fade" id="commentsModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Comments</h5>
                    <button className="btn-close" data-bs-dismiss="modal" onClick={() => setSelectedPost(null)} />
                </div>

                <div className="modal-body">
                    {selectedPost && (
                        <>
                            <b>{selectedPost.user}</b>
                            <p className="text-muted">{selectedPost.text}</p>
                            <hr />

                            {selectedPost.commentsList.length > 0 ? (
                                selectedPost.commentsList.map((c, i) => (
                                    <div key={i} className="p-2 border rounded mb-2">{c}</div>
                                ))
                            ) : (
                                <small className="text-muted">No comments yet</small>
                            )}

                            <div className="d-flex gap-2 mt-2">
                                <input
                                    className="form-control"
                                    placeholder="Write comment..."
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                />
                                <button data-bs-dismiss="modal" className="btn btn-primary" onClick={addCommentModal}>
                                    Post
                                </button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    </div>
);

export default CommentsModal;
