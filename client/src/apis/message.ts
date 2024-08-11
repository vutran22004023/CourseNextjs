import axios, { AxiosResponse } from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const GetMessage = async (courseId: any,chapterId: any,videoId: any,page: number, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.get(`/api/message/getMessages?courseId=${courseId}&chapterId=${chapterId}&videoId=${videoId}&page=${page}&limit=10`,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
      });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const PostMessage = async (data: any, access_Token: string) => {
    try {
      const response: AxiosResponse = await axios.post(`/api/message/postMessage`,data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
      });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const UpdateMessage = async (courseId: any, chapterId: any, videoId: any, messageId: any, data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.put(
        `/api/message/updateMessage/${courseId}/${chapterId}/${videoId}/${messageId}`,
        data,
        {
          headers: {
            token: `Bearer ${access_Token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error updating message');
    }
  };

export const DeleteMessage = async (courseId: any, chapterId: any, videoId: any, messageId: any, access_Token: any,idUser: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`/api/message/deleteMessage/${courseId}/${chapterId}/${videoId}/${messageId}`,{
        headers: {
            token: `Bearer ${access_Token}`,
        },
        data: { userId: idUser }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

