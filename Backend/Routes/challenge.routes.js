import express from "express";
import { updateProgress , getAllChallenges , importChallenges} from "../Controller/progress.controller.js";

const router = express.Router();

router.post("/import-challenges", importChallenges);
router.get("/getChallenges",getAllChallenges)
router.post("/updateProgress", updateProgress);
export default router;
