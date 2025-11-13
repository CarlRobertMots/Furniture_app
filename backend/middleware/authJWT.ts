import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET_KEY = "aVeryLongAndComplexRandomStringThatIsHardToGuess12345"; // 🌟 Use the known value

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: string };

      req.user = { id: decoded.id };
      return next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;
