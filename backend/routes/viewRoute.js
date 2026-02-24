const express = require("express");
const viewRouter = express.Router();
const { getAllBlogs, getBanner, getCategoryAndSubcategory, getCourseById, getCourse } = require("../controllers/ViewController");
viewRouter.get("/get-banner", getBanner);
viewRouter.get("/get-allview-blogs", getAllBlogs);
viewRouter.get("/categories-with-subcategories", getCategoryAndSubcategory);
viewRouter.get("/get-course", getCourse);
viewRouter.get("/get-course-by-id/:id", getCourseById);
module.exports = viewRouter;