import axios, { AxiosResponse } from 'axios';
import axiosInstance from "./index";
export const StartCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/start-course`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

export const UpdateUserCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/update-progress`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 