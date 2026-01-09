const express = require("express");
const AuthRouter = express.Router();
const { userRegister, userlogin, logout, BannerController,
    getBannerController,
    deleteBannerController,
    EditBannerController,
    updateBanner } = require("../controllers/userAuthController");
const { authenticate } = require("../middleware/Auth");
AuthRouter.post("/register", userRegister);
AuthRouter.post("/login", userlogin);

AuthRouter.post("/logout", logout);
module.exports = AuthRouter;