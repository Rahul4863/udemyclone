const express = require("express");
const FeedRouter = express.Router();
const { createFeed, addComment, toggleLike } = require("../controllers/FeedController")
const { userauthenticate } = require("../middleware/userauth");
const uploadMedia = require("../utils/uploadMedia");
const uploadCourseMedia = uploadMedia([
    {
        name: "images",
        types: [".jpg", ".jpeg", ".png", ".webp"],
        size: 4 * 1024 * 1024,
        folder: "uploads/feed",
        maxCount: 25,
    },
    {
        name: "videos",
        types: [".mp4"],
        size: 4 * 1024 * 1024,
        folder: "uploads/feed",
        maxCount: 25,
    },
    {
        name: "docs",
        types: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip", ".rar", ".7z", ".jpg", ".jpeg", ".png", ".webp"],
        size: 4 * 1024 * 1024,
        folder: "uploads/feed",
        maxCount: 25,
    }
]);
FeedRouter.post("/createfeed", userauthenticate, uploadCourseMedia, createFeed)
FeedRouter.post("/addcomment", userauthenticate, addComment)
FeedRouter.post("/togglelike", userauthenticate, toggleLike);

module.exports = FeedRouter