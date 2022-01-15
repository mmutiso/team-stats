import axios from "axios";

const baseURL = "localhost:5000";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
