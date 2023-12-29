import { Router } from "express";
import { createSurvey } from "../controllers/survey.js";

const router = Router();

router.post("/submit", createSurvey);

export default router;
