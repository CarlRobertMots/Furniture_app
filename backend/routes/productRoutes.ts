import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController";
import protect from "../middleware/authJWT";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);

router.route("/my-listings").get(protect, getMyProducts);

router.route("/:id").get(getProductById).delete(protect, deleteProduct);

export default router;
