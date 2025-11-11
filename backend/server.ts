import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import fs from "fs";

import connectDB from "./utils/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import { protect } from "./middleware/userAuth";

connectDB();

const app = express();

// --- MULTER CONFIGURATION (START) ---

const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    callback(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    callback(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  fileFilter(req: Request, file: Express.Multer.File, callback) {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      (callback as (error: Error | null, acceptFile: boolean) => void)(
        new Error("Only image files are allowed!"),
        false
      );
    }
  },
});

// --- MULTER CONFIGURATION (END) ---

// --- MIDDLEWARE ---
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8081", "exp://192.168.x.x:8081"],
  })
);

app.use("/public", express.static(path.join(process.cwd(), "public")));

// --- ROUTES ---
app.use("/api/user", authRoutes);
app.use("/api/products", productRoutes(upload, protect));

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
