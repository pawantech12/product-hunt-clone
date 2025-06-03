// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with real or mock API
});

export default api;
