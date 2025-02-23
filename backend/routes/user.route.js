import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Assuming the path of your middleware
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singleUpload,updateProfile);  // Protected route
router.route("/logout").get(logout);  
export default router;
