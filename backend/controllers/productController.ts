import { Request, Response } from "express";
import Product, { ProductDocument } from "../models/productModel";
import User, { UserDocument } from "../models/userModel";

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
export const getMyProducts = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(401)
      .json({ message: "Not authorized, user ID not found" });
  }

  try {
    const myProducts: ProductDocument[] = await Product.find({
      sellerId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(myProducts);
  } catch (error) {
    console.error("Get My Products Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user listings" });
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
export const getFavourites = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    // Find the user and populate their 'favorites' field with Product details
    const user: UserDocument | null = await User.findById(userId)
      .select("favorites")
      .populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the populated list of favorite products (can be empty [])
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Server error while fetching favorites." });
  }
};
export const addFavourite = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.body; // Expecting { productId: 'product_id_here' }

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    // 1. Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 2. Add the product ID to the user's favorites array (using $addToSet to prevent duplicates)
    const user: UserDocument | null = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: productId } },
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Success, return a minimal response
    res.status(200).json({ message: "Product added to favorites." });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error while adding favorite." });
  }
};
export const removeFavourite = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const productId = req.params.productId; // Get product ID from URL parameter

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    // Remove the product ID from the user's favorites array
    const user: UserDocument | null = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: productId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Success, return a minimal response
    res.status(200).json({ message: "Product removed from favorites." });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error while removing favorite." });
  }
};
