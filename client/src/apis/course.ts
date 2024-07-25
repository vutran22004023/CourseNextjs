import axios, { AxiosResponse } from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetAllCourses = async(search: string) => {
    try{
      if(search){ 
        const response: AxiosResponse = await axios.get(`${apiUrl}/api/course/all-courses?filter=name:${search}`);
        return response.data;
      }else {
        const response: AxiosResponse = await axios.get(`${apiUrl}/api/course/all-courses`);
        return response.data;
      }
    }catch {
        throw new Error('Error get all courses');
    }
}



export const GetDetailCourses = async(slug: StringConstructor) => {
  try{
      const response: AxiosResponse = await axios.get(`${apiUrl}/api/course/detail-courses/${slug}`);
      return response.data;
  }catch {
      throw new Error('Error login detail course');
  }
}

export const CreateCourses = async (data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.post(`${apiUrl}/api/course/create-courses`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
  };

  export const UpdateCourse = async (id: any,data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.put(`${apiUrl}/api/course/update-courses/${id}`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error update coutses');
    }
  };

  export const DeleteCourses = async (id: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`${apiUrl}/api/course/delete-courses/${id}`,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error delete coutse');
    }
  };
