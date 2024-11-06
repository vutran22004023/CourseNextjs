import axios, { AxiosResponse } from 'axios';
import axiosInstance from "./index";
import { CourseProgress } from '@/types';
export const StartCourse = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/start-course`, data);
        return response.data;
    } catch {
        throw new Error('Error get all courses');
    }
}

export const UpdateUserCourse = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/update-progress`, data);
        return response.data;
    } catch {
        throw new Error('Error get all courses');
    }
}

export const CreateNote = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/create-note`, data);
        return response.data;
    } catch {
        throw new Error('Error get all courses');
    }
}

export const AllNote = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`/api/user-course/all-note`, data);
        return response.data;
    } catch {
        throw new Error('Error update note');
    }
}

export const UpdateNote = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.put(`/api/user-course/update-note`, data);
        return response.data;
    } catch {
        throw new Error('Error update note');
    }
}

export const GetCourseProgress = async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`/api/user-course/course-progress`);
        return response.data;
    } catch {
        throw new Error('Error get course progress');
    }
}

export const CheckQuizAnswers = async (data: any) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`/api/user-course/check-quiz-answers`,data);
        return response.data;
    } catch {
        throw new Error('Error get course progress');
    }
}
