import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserDocument } from "../models/userModel"; // Adjust path if needed

interface RequestWithUser extends Request {
  user?: UserDocument;
}

// 1. Protection Middleware (Verifies JWT)
export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check for the token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (removes 'Bearer ')
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // Attach the user (excluding password) to the request object
      // decoded.id comes from generateToken(user._id)
      req.user = (await User.findById(decoded.id).select(
        "-password"
      )) as UserDocument;

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
export const admin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};
