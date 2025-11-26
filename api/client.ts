import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://localhost:8000/api/";
// " https://subnitrated-elatedly-ashley.ngrok-free.dev/api/";
const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

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
