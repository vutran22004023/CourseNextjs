import axios, { AxiosResponse } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import axiosInstance from "./index";
export const GetMessage = async (
  courseId: any,
  chapterId: any,
  videoId: any,
  page: number,
) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/message/getMessages?courseId=${courseId}&chapterId=${chapterId}&videoId=${videoId}&page=${page}&limit=10`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const PostMessage = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/message/postMessage`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const UpdateMessage = async (
  courseId: any,
  chapterId: any,
  videoId: any,
  messageId: any,
  data: any,
) => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/message/updateMessage/${courseId}/${chapterId}/${videoId}/${messageId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating message");
  }
};

export const DeleteMessage = async (
  courseId: any,
  chapterId: any,
  videoId: any,
  messageId: any,
  idUser: any
) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/message/deleteMessage/${courseId}/${chapterId}/${videoId}/${messageId}`,
      {
        data: { userId: idUser },
      }
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
