import axios from "axios";

const baseURL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
