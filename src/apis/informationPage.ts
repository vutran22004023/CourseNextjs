import axiosInstance from "./index";
import axios, { AxiosResponse } from "axios";

export const GetInformationPage = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/api/information-page/`);
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching information page:", error); // Log the error
    }
};

export const UpdateInformationPage = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.put(`/api/information-page/update-information`, data);
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error updating information page:", error); // Log the error
    }
};
