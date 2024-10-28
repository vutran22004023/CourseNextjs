import axios, {AxiosResponse} from "axios";
import axiosInstance from "./index";

const axiosJWT = axios.create();
import {
    User,
    Registers,
    LoginProps,
    EmailProps,
    ResetPassProps,
    StatusAuthProps,
    token,
} from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const Login = async (data: LoginProps): Promise<LoginProps> => {
    try {
        const response: AxiosResponse<LoginProps> = await axios.post(
            `/api/login-in`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};
export const getTokenFromApi = async (): Promise<token | null> => {
    try {
        const response: AxiosResponse<token> = await axios.get("/api/get-token");
        return response.data; // Return the token
    } catch (error) {
        console.error("Error fetching token from API", error);
        return null; // Return null on error
    }
};
export const getRefreshTokenFromApi = async (): Promise<token | null> => {
    try {
        const response: AxiosResponse<token> = await axios.get(
            "/api/get-refreshtoken"
        );
        // Lấy token từ đối tượng trả về
        return response.data;
    } catch (error) {
        console.error("Error fetching token from API", error);
        return null;
    }
};

export const Register = async (data: Registers): Promise<Registers> => {
    try {
        const response: AxiosResponse<Registers> = await axios.post(
            `$/api/register`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error registering");
    }
};

export const LoginOut = async (): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axios.post(`/api/login-out`);
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};

export const ForgotPassword = async (data: EmailProps): Promise<EmailProps> => {
    try {
        const response: AxiosResponse<EmailProps> = await axios.post(
            `$/api/forgot-password`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};

export const ResetPass = async (
    data: ResetPassProps
): Promise<ResetPassProps> => {
    try {
        const response: AxiosResponse<ResetPassProps> = await axiosInstance.post(
            `/api/reset-password`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};

export const StatusAuth = async (
    data: StatusAuthProps
): Promise<StatusAuthProps> => {
    try {
        const response: AxiosResponse<ResetPassProps> = await axiosInstance.post(
            `/api/authenticate-user`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};

export const Refreshtoken = async () => {
    try {
        const response = await axiosInstance.post(`/api/refresh-token`, null);
        return response.data;
    } catch (error) {
        throw new Error("Error refreshing token");
    }
};

export const LoginGoogle = async (data: any) => {
    try {
        const response: AxiosResponse<any> = await axios.post(
            `/api/login-in/google`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error login");
    }
};
