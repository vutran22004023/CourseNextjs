import axios, { AxiosResponse } from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const StartCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axios.post(`/api/user-course/start-course`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

export const UpdateUserCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axios.post(`/api/user-course/update-progress`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 