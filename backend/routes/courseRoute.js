const express = require("express");
const CourseRouter = express.Router();
const { createCourse, getSubcategories, getAllCourses, createSection, GetAllSection, CreateLecture, editSection, createLectureResource, updateSection } = require("../controllers/CourseCreateController");
const uploadSingleImage = require('../utils/uploadSingleImage');
const uploadMiddleware = require('../middleware/uploadMiddleware');
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
CourseRouter.get('/allsection/:id', userauthenticate, GetAllSection)
CourseRouter.get('/edit-section/:id', userauthenticate, editSection)
CourseRouter.put('/update-section', userauthenticate, updateSection)
const allowedTypess = [".mp4"];
const maxSizes = 2 * 1024 * 1024;
const uploadBannerFolder = "uploads/lectures";
const uploadBanner = uploadSingleImage(allowedTypess, maxSizes, uploadBannerFolder, "video");
CourseRouter.post("/create-lecture", uploadMiddleware(uploadBanner), userauthenticate, CreateLecture);




// for lecture resource
const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip", ".rar", ".7z", ".jpg", ".jpeg", ".png", ".webp"];
const maxSize = 10 * 1024 * 1024;
const uploadFolder = "uploads/resources";
const uploadResource = uploadSingleImage(allowedTypes, maxSize, uploadFolder, "file");
CourseRouter.post("/create-lecture-resource", uploadMiddleware(uploadResource), userauthenticate, createLectureResource);
module.exports = CourseRouter;