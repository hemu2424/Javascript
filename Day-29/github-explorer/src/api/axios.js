import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method, config.url);

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status);

    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data?.message
    );

    return Promise.reject(error);
  }
);

export default api;