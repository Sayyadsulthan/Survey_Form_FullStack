import { Router } from "express";
import {
  loginAdmin,
  createAdmin,
  getAllSurvey,
  handleRemoveSurvey,
} from "../controllers/admin.js";
import passport from "passport";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", createAdmin);
router.get(
  "/allSurvey",
  passport.authenticate("jwt", { session: false }),
  getAllSurvey
);
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  handleRemoveSurvey
);
export default router;
