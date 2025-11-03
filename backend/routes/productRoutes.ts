import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/productController";
import protect from "../middleware/authJWT";

const router = express.Router();

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .post(protect, createProduct)
  .delete(protect, deleteProduct);

export default router;
