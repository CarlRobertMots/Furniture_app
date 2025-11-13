import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  updatedAt: string;
}

export type CreateProductInput = Omit<
  ProductType,
  "_id" | "createdAt" | "updatedAt" | "sellerId" | "isSold" | "isActive"
>;

// --- GET PRODUCTS ---

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await client.get("/products");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product listings."
    );
  }
};

export const getProductById = async (id: string): Promise<ProductType> => {
  try {
    const response = await client.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch product ${id}.`
    );
  }
};

export const getMyProducts = async (): Promise<ProductType[]> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    throw new Error("User must be logged in to view their listings.");
  }
  try {
    const response = await client.get("/products/my-listings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user listings."
    );
  }
};

// --- CREATE & DELETE ---

export const createProduct = async (
  productData: CreateProductInput
): Promise<ProductType> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    throw new Error("User must be logged in to create a product.");
  }
  try {
    const response = await client.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create product."
    );
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    throw new Error("User must be logged in to delete a product.");
  }
  try {
    await client.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product."
    );
  }
};

// --- FAVORITES ---

export const getFavourites = async (): Promise<ProductType[]> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("User must be logged in to view favorites.");
  try {
    const response = await client.get("/user/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch favorites."
    );
  }
};

export const addFavourite = async (productId: string): Promise<void> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("User must be logged in to add favorites.");
  try {
    await client.post(
      "/user/favorites",
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add favorite.");
  }
};

export const removeFavourite = async (productId: string): Promise<void> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("User must be logged in to remove favorites.");
  try {
    await client.delete(`/user/favorites/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to remove favorite."
    );
  }
};
