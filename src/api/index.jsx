import axios from "axios";
import { API_PATH, API_TOKEN } from "../utils/constants";

const Api = axios.create({
  baseURL: API_PATH,
  headers: {
   "Authorization": `Bearer ${localStorage.getItem(API_TOKEN)}`,
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default Api;
