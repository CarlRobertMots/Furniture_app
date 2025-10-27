import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  sellerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isSold: boolean;
  isActive: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ProductDocument>("Product", ProductSchema);
