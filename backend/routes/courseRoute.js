const express = require("express");
const CourseRouter = express.Router();
const { createCourse, getSubcategories, getAllCourses, createSection } = require("../controllers/CourseCreateController");
// const uploadSingleImage = require("../utils/uploadSingleImage");
const uploadMedia = require("../utils/uploadMedia");
const { userauthenticate } = require("../middleware/userauth");
const uploadCourseMedia = uploadMedia([
    {
        name: "photo",
        types: [".jpg", ".jpeg", ".png", ".webp"],
        size: 2 * 1024 * 1024,
        folder: "uploads/images",
        maxCount: 1,
    },
    {
        name: "video",
        types: [".mp4"],
        size: 4 * 1024 * 1024,
        folder: "uploads/videos",
        maxCount: 1,
    }
]);
CourseRouter.post("/create", uploadCourseMedia, userauthenticate, createCourse);
CourseRouter.get("/subcategories/:id", userauthenticate, getSubcategories);
CourseRouter.get("/all", userauthenticate, getAllCourses);
CourseRouter.post("/section", userauthenticate, createSection);
module.exports = CourseRouter;