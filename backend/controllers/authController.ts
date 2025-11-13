import { Request, Response } from "express";
import User, { UserDocument } from "../models/userModel";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../controllers/productController";
import { AuthenticatedRequest } from "../middleware/authJWT";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    console.log("Register request body:", req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const user: UserDocument = await User.create({
      name,
      email,
      password,
    });
    console.log("Created user:", user);

    if (user) {
      res.status(201).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
// Profile controller
export const getProfile = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(401)
      .json({ message: "Not authorized, user ID not found" });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        // Add any other profile fields here
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  // Ensure req.user.id is populated by the authJWT middleware
  if (!req.user?.id) {
    return res
      .status(401)
      .json({ message: "Not authorized, user ID not found" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Only update allowed fields (e.g., name)
      if (req.body.name !== undefined) {
        user.name = req.body.name;
      }
      // You can add more fields here if you want to make them editable

      const updatedUser = await user.save(); // Save changes to the database

      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};
