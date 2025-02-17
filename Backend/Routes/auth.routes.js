import express from "express"
import  {protectRoute}  from "../Middleware/protectRoute.middleware.js";
import { loginController, signupController, logoutController, updateProfileController, checkAuth } from "../Controller/authController.js";


const router = express.Router();

router.post("/login" , loginController)
router.post("/signup" , signupController )
router.post("/logout" , logoutController)

router.put("/updateProfile" , protectRoute,updateProfileController)
router.get("/check" , protectRoute , checkAuth);

export default router;