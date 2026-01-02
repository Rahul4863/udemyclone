import React, { useState } from "react";
import "./Feed.css";

import HeaderBar from "./HeaderBar";
import ProfileSidebar from "./ProfileSidebar";
import GameWidget from "./GameWidget";
import PostCard from "./PostCard";
import CommentsModal from "./CommentsModal";
import LikesModal from "./LikesModal";
import CreatePostModal from "./CreatePostModal";
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
            comments: 2,
            commentsList: ["Great post!", "Happy Birthday!"],
            likedUsers: ["Rahul", "Amit", "Sneha"],
            showComments: false,
            commentText: ""
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
            comments: 1,
            commentsList: ["Merry Christmas!"],
            showComments: false,
            commentText: ""
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
            comments: 1,
            commentsList: ["Merry Christmas!"],
            showComments: false,
            commentText: ""
        }
    ]);

    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(2);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentInput, setCommentInput] = useState("");
    const [selectedLikePost, setSelectedLikePost] = useState(null);

    // Sliding Game
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];
    const [board, setBoard] = useState([1, 6, 3, 7, 5, 4, 9, 8, null]);
    const [message, setMessage] = useState("");
    const [media, setMedia] = useState({
        images: [],
        videos: [],
        docs: []
    });

    const shuffleBoard = () => {
        let arr = [...correctOrder];
        do {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        } while (!isSolvable(arr));
        setBoard(arr);
        setMessage("");
    };

    const isSolvable = (arr) => {
        const nums = arr.filter(n => n !== null);
        let inv = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] > nums[j]) inv++;
            }
        }
        return inv % 2 === 0;
    };

    const moveTile = (index) => {
        const blankIndex = board.indexOf(null);
        const validMoves = [
            blankIndex - 1,
            blankIndex + 1,
            blankIndex - 3,
            blankIndex + 3
        ];
        if (!validMoves.includes(index)) return;

        let newBoard = [...board];
        [newBoard[index], newBoard[blankIndex]] =
            [newBoard[blankIndex], newBoard[index]];

        setBoard(newBoard);

        if (JSON.stringify(newBoard) === JSON.stringify(correctOrder)) {
            setMessage("🎉 You Won The Game!");
        }
    };

    // Like
    const toggleLike = (id) => {
        const userName = "Rahul Soni";
        setPosts(posts.map(post => {
            if (post.id === id) {
                const isLiked = post.liked;
                return {
                    ...post,
                    liked: !isLiked,
                    likes: isLiked ? post.likes - 1 : post.likes + 1,
                    likedUsers: isLiked
                        ? post.likedUsers.filter(u => u !== userName)
                        : [...post.likedUsers, userName]
                };
            }
            return post;
        }));
    };

    // Add Post
    const addPost = () => {
        if (!text && files.length === 0) return alert("Write something or upload!");

        const newPost = {
            id: Date.now(),
            user: "Rahul Soni",
            avatar: "https://i.pravatar.cc/150?img=12",
            date: "Just Now",
            text,
            images: files.map(f => URL.createObjectURL(f)),
            likes: 0,
            liked: false,
            comments: 0,
            commentsList: [],
            showComments: false,
            commentText: ""
        };
        setPosts([newPost, ...posts]);
        setText("");
        setFiles([]);
    };

    const addCommentModal = () => {
        if (!commentInput.trim()) return;

        setPosts(posts.map(p =>
            p.id === selectedPost.id
                ? {
                    ...p,
                    commentsList: [...p.commentsList, commentInput],
                    comments: p.comments + 1
                }
                : p
        ));

        setSelectedPost(prev => ({
            ...prev,
            commentsList: [...prev.commentsList, commentInput],
            comments: prev.comments + 1
        }));

        setCommentInput("");
    };


    return (
        <>
            <HeaderBar />

            <div className="container py-4">
                <div className="row">

                    <ProfileSidebar />

                    <div className="col-md-6">

                        <CreatePostModal
                            text={text}
                            setText={setText}
                            media={media}
                            setMedia={setMedia}
                            addPost={addPost}
                        />
                        {posts.slice(0, visibleCount).map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                toggleLike={toggleLike}
                                setSelectedPost={setSelectedPost}
                                setSelectedLikePost={setSelectedLikePost}
                                setPosts={setPosts}
                            />
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

                    <GameWidget
                        board={board}
                        moveTile={moveTile}
                        shuffleBoard={shuffleBoard}
                        message={message}
                    />

                </div>
            </div>


            <CommentsModal
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                commentInput={commentInput}
                setCommentInput={setCommentInput}
                addCommentModal={addCommentModal}
            />

            <LikesModal
                selectedLikePost={selectedLikePost}
                setSelectedLikePost={setSelectedLikePost}
            />

        </>
    );
};

export default Feed;
