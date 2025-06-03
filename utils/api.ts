// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://product-hunt-clone-ten.vercel.app/api", // Replace with real or mock API
});

export default api;
