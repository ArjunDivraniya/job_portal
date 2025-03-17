import express from "express";
import { register, login, logout, updateProfile,getAnalyticsData } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Assuming the path of your middleware
import { multipleUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, multipleUpload, updateProfile);  // Protected route
router.route("/logout").get(logout);  
router.route("/analytics").get(getAnalyticsData)
export default router;
