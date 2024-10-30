import axios, { AxiosResponse } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import axiosInstance from "./index";

export const GetAllBlogs = async (search: string) => {
  try {
    if (search) {
      const response: AxiosResponse = await axiosInstance.get(
        `/api/blog/all-posts?filter=name:${search}`
      );
      return response.data;
    } else {
      const response: AxiosResponse = await axios.get(`/api/blog/all-posts`);
      return response.data;
    }
  } catch {
    throw new Error("Error get all blogs");
  }
};

export const GetDetailBlogs = async (slug: String) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/blog/detail-post/${slug}`
    );
    return response.data;
  } catch {
    throw new Error("Error login detail blog");
  }
};

export const CreateBlogs = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/blog/create-post`,
      data,
    );
    return response.data;
  } catch {
    throw new Error("Error create blogs");
  }
};

export const UpdateBlogs = async (id: any, data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/blog/update-post/${id}`,
      data,
    );
    return response.data;
  } catch {
    throw new Error("Error update coutses");
  }
};

export const DeleteBlogs = async (id: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/blog/delete-post/${id}`,
    );
    return response.data;
  } catch {
    throw new Error("Error delete coutse");
  }
};
