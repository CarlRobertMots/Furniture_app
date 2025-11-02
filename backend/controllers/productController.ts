import { Request, Response } from "express";
import Product, { ProductDocument } from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductDocument[] = await Product.find({
      isActive: true,
      isSold: false,
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product: ProductDocument | null = await Product.findById(
      req.params.id
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Product not found or invalid ID format" });
  }
};
