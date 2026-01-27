const express = require("express");
const AuthRouter = express.Router();
const { userRegister, userlogin, getProfileById, updateProfile } = require("../controllers/userAuthController");
const { UserInsightController, getUserInsightController, deleteUserInsightController, EditUserInsightController, updateUserInsightController, getAllCategory } = require("../controllers/UserInsightController");
// const { authenticate } = require("../middleware/Auth");
const { userauthenticate } = require("../middleware/userauth");
const uploadSingleImage = require('../utils/uploadSingleImage');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const allowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const maxSize = 2 * 1024 * 1024;
const uploadFolder = "uploads/users";
const upload = uploadSingleImage(allowedTypes, maxSize, uploadFolder, "photo");
AuthRouter.post("/register", userRegister);
AuthRouter.post("/login", userlogin);
AuthRouter.get("/profile", userauthenticate, getProfileById);

AuthRouter.put("/update", userauthenticate, uploadMiddleware(upload), updateProfile);


// user insight controller
const interestallowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const interestmaxSize = 2 * 1024 * 1024;
const interestuploadFolder = "uploads/user-insight";
const insightupload = uploadSingleImage(interestallowedTypes, interestmaxSize, interestuploadFolder, "photo");
AuthRouter.post('/insightinterest', userauthenticate, uploadMiddleware(insightupload), UserInsightController)
AuthRouter.get('/getinsightinterest', userauthenticate, getUserInsightController)
AuthRouter.delete('/deleteinsightinterest/:id', userauthenticate, deleteUserInsightController)
AuthRouter.get('/editinsightinterest/:id', userauthenticate, EditUserInsightController)
AuthRouter.put('/updateinsightinterest/:id', userauthenticate, uploadMiddleware(insightupload), updateUserInsightController)
AuthRouter.get('/getallcategory', userauthenticate, getAllCategory)
module.exports = AuthRouter;



