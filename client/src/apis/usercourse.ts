import axios, { AxiosResponse } from 'axios';

export const StartCourse = async(data: any, access_Token: string) => {
    try{
        const response: AxiosResponse = await axios.post(`/api/user-course/start-course`, data,{
            headers: {
                token: `Bearer ${access_Token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

export const UpdateUserCourse = async(data: any, access_Token: string) => {
    try{
        const response: AxiosResponse = await axios.post(`/api/user-course/update-progress`, data, {
            headers: {
                token: `Bearer ${access_Token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 