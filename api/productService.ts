import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface for a product fetched from the backend
export interface ProductType {
  _id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isSold: boolean;
  isActive: boolean;
  createdAt: string;
}

// Data structure expected by the backend for creation
export interface ProductCreationData {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

// Service function to fetch all products (Read)
export const getProducts = async (): Promise<ProductType[]> => {
  try {
    // GET /api/products
    const response = await client.get("/products");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch product listings."
    );
  }
};

// Service function to create a product (Create)
export const createProduct = async (
  productData: ProductCreationData
): Promise<ProductType> => {
  // Assuming 'userToken' key is used for storage
  const token = await AsyncStorage.getItem("userToken");

  if (!token) {
    throw new Error("User must be logged in to create a product.");
  }

  try {
    // POST /api/products (Requires 'protect' middleware)
    const response = await client.post("/products", productData, {
      headers: {
        // Attach the JWT for authorization
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating product:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to create product."
    );
  }
};
export const getMyProducts = async (): Promise<ProductType[]> => {
  const token = await AsyncStorage.getItem("userToken");

  if (!token) {
    throw new Error("User must be logged in to view their listings.");
  }

  try {
    // We will assume the backend has a protected route like GET /api/products/my-listings
    // that uses the token to filter products by sellerId.
    const response = await client.get("/products/my-listings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user products:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user listings."
    );
  }
};
