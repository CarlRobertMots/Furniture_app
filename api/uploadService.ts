import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the expected response from the server after a successful upload
interface UploadResponse {
  url: string; // The public URL of the uploaded image
}

/**
 * Uploads a local file (from a device URI) to the server.
 * @param localUri The file path obtained from expo-image-picker.
 * @returns A promise that resolves with the public URL of the uploaded image.
 */
export const uploadImage = async (localUri: string): Promise<string> => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    throw new Error("Authentication required for image upload.");
  }

  // 1. Create FormData object
  const formData = new FormData();

  // Get filename and mime type for proper multipart/form-data creation
  const filename = localUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename!);
  const type = match ? `image/${match[1]}` : `image`;

  // 2. Append the file data. 'image' must match the field name your backend expects.
  // Note: We cast to 'any' here because React Native's FormData type is often loose.
  formData.append("image", {
    uri: localUri,
    name: filename,
    type,
  } as any);

  try {
    // 3. Send the request
    const response = await client.post<UploadResponse>(
      // 💡 FIX: Change from "/api/products/upload" to "/products/upload"
      // The client baseURL already provides "/api/"
      "/products/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        // ...
      }
    );

    // 4. Return the public URL from the server response
    return response.data.url;
  } catch (error: any) {
    console.error("Image Upload Error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload file to server."
    );
  }
};
