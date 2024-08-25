import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getTokenFromCookies } from "../utils/auth";
const axiosInstance: AxiosInstance = axios.create({
  timeout: 5000, // Timeout sau 5 giây
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const tokenCookies = await getTokenFromCookies(); // Chờ đợi giá trị trả về từ hàm async

      if (tokenCookies) {
        config.headers.token = `Bearer ${tokenCookies}`;
      }else {
        console.log('loi')
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
