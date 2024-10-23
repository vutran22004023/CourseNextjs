import axios, { AxiosResponse } from "axios";
import axiosInstance from "./index";

export const CreateRoomApi = async (data: any) => {
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

export const ValidateRoom = async (IdRoom: string, token: string) => {
  try {
    const axiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_VIDEOSDK_URL}/rooms/validate/${IdRoom}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return axiosResponse;
  } catch {
    throw new Error("Error get all courses");
  }
};





const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;
const API_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;

  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
