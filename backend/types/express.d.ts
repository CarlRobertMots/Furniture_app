// Import Multer types directly
import { Request } from "express";
import * as multer from "multer"; // 💡 Import Multer's entire module

declare global {
  namespace Express {
    interface Request {
      // Use the type from the imported Multer module
      file?: multer.File;
      files?: multer.File[];
    }
  }
}
