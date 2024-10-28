import axios, {AxiosResponse} from "axios";

const axiosJWT = axios.create();
import {
    User,
    Registers,
    LoginProps,
    EmailProps,
    ResetPassProps,
    StatusAuthProps,
} from "@/types";
import axiosInstance from "./index";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

export const GetAllUsers = async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(
            `/api/user/get-all-users`
        );
        return response.data;
    } catch {
        throw new Error("Error get users");
    }
};

export const GetDetailUser = async (id: any, token: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(
            `/api/user/get-detail-user/${id}`
        );
        return response.data;
    } catch {
        throw new Error("Error get users");
    }
};

export const CreateUser = async (data: Omit<User, "confirmPassword">) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(
            `/api/user/create-user`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error create user");
    }
};

export const UpdateUser = async (
    id: string,
    data: Partial<Pick<User, "password">> & Omit<User, "confirmPassword">
) => {
    try {
        const response: AxiosResponse = await axiosInstance.put(
            `/api/user/update-user/${id}`,
            data
        );
        return response.data;
    } catch {
        throw new Error("Error update user");
    }
};

export const DeleteUser = async (id: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.delete(
            `/api/user/delete-user/${id}`
        );
        return response.data;
    } catch {
        throw new Error("Error delete user");
    }
};

export const DeleteManyUser = async (ids: Array<string>) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(
            `/api/user/delete-many-user`,
            ids
        );
        return response.data;
    } catch {
        throw new Error("Error delete many user");
    }
};
export const SearchUser = async (search: string) => {
    try {
        if (search) {
            const response: AxiosResponse = await axiosInstance.get(
                `/api/user/get-search-users?filter=name:${search}`
            );
            return response.data;
        } else {
            const response: AxiosResponse = await axiosInstance.get(
                `/api/user/get-search-users`
            );
            return response.data;
        }
    } catch {
        throw new Error("Error delete many user");
    }
};
