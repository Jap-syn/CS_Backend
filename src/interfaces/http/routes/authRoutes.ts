import { Router } from "express";
import {
  loginUser,
  logoutUser,
  createUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/logout", logoutUser);

router.get("/profile", getUser);
router.post("/profile/update", updateUser);

export default router;
