import express from "express"
import  {protectRoute}  from "../Middleware/protectRoute.middleware.js";
import { loginController, signupController, logoutController, updateProfileController, checkAuth,getLeaderboard , getCurrUser } from "../Controller/authController.js";

const router = express.Router();

router.post("/login" , loginController)
router.post("/signup" , signupController )
router.post("/verify",verifyUser);
router.post("/logout" ,protectRoute,logoutController)
router.get("/profile", protectRoute, getCurrUser);

router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.put("/updateProfile" , protectRoute,updateProfileController)
router.get("/check" , protectRoute , checkAuth);
router.get("/leaderboard", getLeaderboard);

export default router;