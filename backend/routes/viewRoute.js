const express = require("express");
const viewRouter = express.Router();
const { getAllBlogs } = require("../controllers/ViewController");
viewRouter.get("/get-allview-blogs", getAllBlogs);
module.exports = viewRouter;