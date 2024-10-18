import axios, { AxiosResponse } from "axios";
import axiosInstance from "./index";

export const CreateRoom = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/videosdk/create-room`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};

export const ShowUserTeacherRoom = async (userIdZoom: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/videosdk/show-user-teacher-zoom/${userIdZoom}`
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};

export const ShowUserStudentRoom = async (userIdZoom: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/videosdk/show-user-student-zoom/${userIdZoom}`
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};

export const ShowDetailRoom = async (idRoom: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/videosdk/show-details-zoom/${idRoom}`
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};

export const UpdateRoom = async (id: any, data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/videosdk/update-zoom/${id}`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};

export const DeleteRoom = async (id: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/videosdk/update-zoom/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error get all courses");
  }
};
