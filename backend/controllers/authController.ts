import { Request, Response } from "express";
import User, { UserDocument } from "../models/userModel";
import generateToken from "../utils/generateToken";

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
