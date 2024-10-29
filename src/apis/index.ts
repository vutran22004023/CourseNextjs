import axios, {AxiosInstance, AxiosResponse} from "axios";
import {getTokenFromCookies} from "@/utils/auth";
import {useAtoms} from '@/hooks/useAtom';
const axiosInstance: AxiosInstance = axios.create({
    timeout: 5000, // Timeout sau 5 giây
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const {token} =useAtoms();
            // const tokenCookies = await getTokenFromCookies(); // Chờ đợi giá trị trả về từ hàm async

            if (token) {
                config.headers.token = `Bearer ${token}`;
            } else {
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
