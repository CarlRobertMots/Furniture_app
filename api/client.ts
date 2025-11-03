import axios from "axios";

const baseURL = "http://192.168.1.230:8000/api/";

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
