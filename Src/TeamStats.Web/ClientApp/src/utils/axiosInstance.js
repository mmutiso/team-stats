import axios from "axios";
import axiosRetry from "axios-retry";

const baseURL = "http://localhost:56481";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization:
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")}`
          : null
        : null,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosRetry(axiosInstance, { retries: 3 });

export const userConfirmationInstance = axios.create({
  baseURL: "https://localhost:44318",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     // Do something before request is sent
//     const accessToken = localStorage.getItem("access_token");

//     config.headers = {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     };
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;

    if (
      localStorage.getItem("refresh_token") &&
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === "canceled") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      return axiosInstance
        .get(`/token/refresh?refreshToken=${refreshToken}`)
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access_token;

          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return err.message;
        });
    }

    return Promise.reject({ ...error });
  }
);
