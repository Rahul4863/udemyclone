const express = require("express");
const viewRouter = express.Router();
const { getAllBlogs, getBanner, getCategoryAndSubcategory } = require("../controllers/ViewController");
viewRouter.get("/get-banner", getBanner);
viewRouter.get("/get-allview-blogs", getAllBlogs);
viewRouter.get("/categories-with-subcategories", getCategoryAndSubcategory);
module.exports = viewRouter;