import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthResponse {
  user: { id: string; name: string; email: string; isAdmin: boolean };
  token: string;
}
// User registration function
export const registerUser = async (userData: any): Promise<AuthResponse> => {
  const response = await client.post("auth/signup", userData);
  if (response.data.token) {
    await AsyncStorage.setItem("userToken", response.data.token);
  }

  return response.data as AuthResponse;
};
// User login function
export const loginUser = async (userData: any): Promise<AuthResponse> => {
  const response = await client.post("auth/login", userData);

  if (response.data.token) {
    await AsyncStorage.setItem("userToken", response.data.token);
  }

  return response.data as AuthResponse;
};
// Product
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

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await client.get("/products");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch product listings."
    );
  }
};
