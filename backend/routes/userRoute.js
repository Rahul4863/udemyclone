const express = require("express");
const AuthRouter = express.Router();
const { userRegister } = require("../controllers/userAuthController");

AuthRouter.post("/register", userRegister);

module.exports = AuthRouter;