import axios, { AxiosResponse } from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const GetDetailBlog = async (slug: any) => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/api/blog/detail-post/${slug}`);
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const GetAllBlog = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/api/blog/all-posts`);
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const CreateBlog = async (data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.post(`${apiUrl}/api/blog/create-post`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const UpdateBlog = async (id:any,data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.put(`${apiUrl}/api/blog/update-post/${id}`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export const DeleteBlog = async (id:any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`${apiUrl}/api/blog/delete-post/${id}`,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

