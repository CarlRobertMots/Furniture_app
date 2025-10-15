import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  res.json({ message: "Signup route works" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route works" });
});

export default router;
