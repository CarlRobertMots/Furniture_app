import axios from "axios";
// 🌟 REQUIRED: Import AsyncStorage to retrieve the token
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://192.168.1.230:8000/api/";

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🌟 FIX: Add Request Interceptor to attach JWT
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      // 🌟 ADD THIS LINE TO CHECK TOKEN RETRIEVAL
      console.log(
        "Token Retrieved from AsyncStorage:",
        token ? "Token Found" : "Token MISSING"
      );

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving or setting token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
