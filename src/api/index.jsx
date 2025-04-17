import axios from "axios";
import { API_PATH, API_TOKEN } from "../utils/constants";

const Api = axios.create({
  baseURL: API_PATH,
  headers: {
   "Authorization": `Bearer ${localStorage.getItem(API_TOKEN)}`,
  },
});

export default Api;
