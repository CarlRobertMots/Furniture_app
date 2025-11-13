import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthResponse {
  user: UserProfile;
  token: string;
}

// User Registration Function
export const registerUser = async (userData: any): Promise<AuthResponse> => {
  const response = await client.post("user/signup", userData);
  if (response.data.token) {
    await AsyncStorage.setItem("userToken", response.data.token);
  }
  return response.data as AuthResponse;
};

// User Login Function
export const loginUser = async (userData: any): Promise<AuthResponse> => {
  const response = await client.post("user/login", userData);

  if (response.data.token) {
    await AsyncStorage.setItem("userToken", response.data.token);
  }

  return response.data as AuthResponse;
};

// User profile fetch function
export const getProfile = async (): Promise<UserProfile> => {
  const response = await client.get("user/profile");
  return response.data as UserProfile;
};

// User logout function
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem("userToken");
};
// Add this interface for update payload
interface UpdateProfilePayload {
  name?: string;
  // Add other fields you might want to update later, e.g., password
}

// Function to update user profile
export const updateProfile = async (
  updateData: UpdateProfilePayload
): Promise<UserProfile> => {
  // Assuming your backend has an endpoint like /auth/profile for PUT/PATCH requests
  const response = await client.put("user/profile", updateData);
  return response.data as UserProfile;
};
