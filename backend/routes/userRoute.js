const express = require("express");
const AuthRouter = express.Router();
const { userRegister, userlogin, getProfileById } = require("../controllers/userAuthController");
// const { authenticate } = require("../middleware/Auth");
const { userauthenticate } = require("../middleware/userauth");
AuthRouter.post("/register", userRegister);
AuthRouter.post("/login", userlogin);
AuthRouter.get("/profile", userauthenticate, getProfileById);
// AuthRouter.post("/logout", logout);
module.exports = AuthRouter;



