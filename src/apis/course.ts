import axios, { AxiosResponse } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import axiosInstance from "./index";
export const GetAllCourses = async (search: string) => {
  try {
    if (search) {
      const response: AxiosResponse = await axios.get(
        `/api/course/all-courses?filter=name:${search}`
      );
      return response.data;
    } else {
      const response: AxiosResponse = await axios.get(
        `/api/course/all-courses`
      );
      return response.data;
    }
  } catch {
    throw new Error("Error get all courses");
  }
};

export const GetDetailCourses = async (slug: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/course/detail-courses/${slug}`
    );
    return response.data;
  } catch {
    throw new Error("Error login detail course");
  }
};

export const GetDetailCoursesNotLogin = async (slug: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `/api/course/detail-courses/not-login/${slug}`
    );
    return response.data;
  } catch {
    throw new Error("Error get detail course");
  }
};

export const CreateCourses = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/course/create-courses`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const UpdateCourses = async (id: any, data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/course/update-courses/${id}`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error update coutses");
  }
};

export const DeleteCourses = async (id: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/course/delete-courses/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error delete coutse");
  }
};
