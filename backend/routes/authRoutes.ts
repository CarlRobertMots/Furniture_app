import { Router } from "express";
import {
  authUser,
  registerUser,
  getProfile,
  updateProfile,
} from "../controllers/authController";
import {
  // 💡 Import the new favorites controllers
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../controllers/productController";
import authJWT from "../middleware/authJWT";
import protect from "../middleware/authJWT";

const router = Router();

router.post("/signup", registerUser);

router.post("/login", authUser);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/favorites", protect, getFavourites);

router.post("/favorites", protect, addFavourite);

router.delete("/favorites/:productId", protect, removeFavourite);

export default router;
