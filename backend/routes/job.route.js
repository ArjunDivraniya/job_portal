import express from "express";
import isAuthenticated,{ verifyStudent } from "../middlewares/isAuthenticated.js"; 

import { getAdminJobs, getAllJobs, getJobById, postJob,getTopJobs,getRecommendedJobs ,getFilteredJobs} from "../controllers/job.controller.js";

const router = express.Router();

// Routes
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);  
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs );
router.route("/get/:id").get(isAuthenticated, getJobById); 
router.route("/topjobs").get(isAuthenticated, getTopJobs); 
router.route('/getstudentjobs').get(verifyStudent, getTopJobs) ;
router.route('/getrecommendedjobs/:studentId').get(verifyStudent, getRecommendedJobs);
router.route('/getfilteredjobs').get( getFilteredJobs);


export default router;
