const LikesModal = ({ selectedLikePost, setSelectedLikePost }) => (
    <div className="modal fade" id="likesModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">People who liked</h5>
                    <button className="btn-close" data-bs-dismiss="modal" onClick={() => setSelectedLikePost(null)} />
                </div>

                <div className="modal-body">
                    {selectedLikePost && selectedLikePost.likedUsers?.length > 0 ? (
                        selectedLikePost.likedUsers.map((u, i) => (
                            <div key={i} className="p-2 border rounded mb-2">
                                👍 {u}
                            </div>
                        ))
                    ) : (
                        <small className="text-muted">No likes yet</small>
                    )}
                </div>

            </div>
        </div>
    </div>
);

export default LikesModal;
