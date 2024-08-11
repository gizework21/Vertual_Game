import axios from "axios";
import { BASE_URL } from "./baseURL";

const api = axios.create({
  baseURL: BASE_URL, // Initial empty baseURL
  headers: {
    "Content-Type": "application/json", // Add Accept header for application/json
  },
});



// Function to set the Authorization header for requests requiring authentication
export const setAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Function to post user data
export const postUser = async (userData) => {
  try {
    setAuthHeaders();
    const response = await api.post("/user/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error posting user:", error.message);
    throw new Error("Failed to post user");
  }
};

// Function to login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post(`/user/login`, loginData);
    const { token } = response.data;
    localStorage.setItem("token", token);
    setAuthHeaders(); // Set authorization header
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error("Failed to login");
  }
};
