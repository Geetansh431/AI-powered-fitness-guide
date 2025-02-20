import express from "express"
import  {protectRoute}  from "../Middleware/protectRoute.middleware.js";
import { fetchTutorialController, likeTutorialController, postTutorialsController } from "../Controller/tutorialController.js";


const router = express.Router();

router.patch("/like/:id" ,protectRoute, likeTutorialController);
router.get("/fetch" , fetchTutorialController);
router.post("/post" , postTutorialsController);

export default router;
