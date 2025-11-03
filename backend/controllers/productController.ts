import { Request, Response } from "express";
import Product, { ProductDocument } from "../models/productModel";
import { UserDocument } from "../models/userModel";

export interface AuthRequest extends Request {
  user?: { id: string };
}

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
export const createProduct = async (req: AuthRequest, res: Response) => {
  const sellerId = req.user?.id;
  const { name, description, price, category, images } = req.body;

  try {
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const product: ProductDocument = await Product.create({
      sellerId,
      name,
      description,
      price,
      category,
      images: images || [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
};
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user?.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
