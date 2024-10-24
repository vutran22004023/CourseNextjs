import axios, { AxiosResponse } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetAllBlogs = async (search: string) => {
  try {
    if (search) {
      const response: AxiosResponse = await axios.get(
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

export const GetDetailBlogs = async (slug: StringConstructor) => {
  try {
    const response: AxiosResponse = await axios.get(
      `/api/blog/detail-post/${slug}`
    );
    return response.data;
  } catch {
    throw new Error("Error login detail blog");
  }
};

export const CreateBlogs = async (data: any, access_Token: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `/api/blog/create-post`,
      data,
      {
        headers: {
          token: `Bearer ${access_Token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error("Error create blogs");
  }
};

export const UpdateBlogs = async (id: any, data: any, access_Token: any) => {
  try {
    const response: AxiosResponse = await axios.put(
      `/api/blog/update-post/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${access_Token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error("Error update coutses");
  }
};

export const DeleteBlogs = async (id: any, access_Token: any) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `/api/blog/delete-post/${id}`,
      {
        headers: {
          token: `Bearer ${access_Token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error("Error delete coutse");
  }
};
