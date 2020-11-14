import axios from "axios";
import { baseUrl } from "../config";
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    alert("Ooops! There was an error!");
    return error;
  }
);

export default axiosInstance;
