import { Router } from "express";
import { authUser, registerUser } from "../controllers/authController";

const router = Router();

router.post("/signup", registerUser);

router.post("/login", authUser);

export default router;
