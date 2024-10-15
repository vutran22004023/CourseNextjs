import axios, { AxiosResponse } from "axios";
import axiosInstance from "./index";

export const getAnalytics = async (formData: any) => {
    try {
        if(formData) {
            const response: AxiosResponse = await axiosInstance.get(`/api/analytics?date=${formData}`);
            return response.data;
        }else {
            const response: AxiosResponse = await axiosInstance.get(`/api/analytics`);
            return response.data;
        }
    } catch {
        throw new Error('Error get all courses');
    }
}