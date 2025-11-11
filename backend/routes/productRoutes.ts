import express, { Response, Request, NextFunction } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController";

const productRoutes = (
  upload: any,
  protect: (req: Request, res: Response, next: NextFunction) => void
) => {
  const router = express.Router(); // Endpoint: POST /api/products/upload // Middleware: 1. protect (authentication), 2. upload.single('image') (file handling)

  router.post(
    "/upload",
    protect,
    upload.single("image"),
    async (req: Request, res: Response) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      } // 💡 FIX: Prioritize the SERVER_URL environment variable for production.

      // 💡 For LOCAL MOBILE TESTING, explicitly use the local IP address
      //    (This assumes your server runs on port 8000 and your IP is 192.168.1.230)
      const baseUrl = `http://192.168.1.230:${process.env.PORT || 8000}`;

      const publicUrl = `${baseUrl}/public/uploads/${req.file.filename}`;
      res.status(200).json({
        url: publicUrl,
        message: "File uploaded successfully",
      });
    }
  ); // Existing routes

  router.route("/").get(getProducts).post(protect, createProduct);

  router.route("/my-listings").get(protect, getMyProducts);

  router.route("/:id").get(getProductById).delete(protect, deleteProduct);

  return router;
};

export default productRoutes;
