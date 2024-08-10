import axios, { AxiosResponse } from 'axios';
const axiosJWT = axios.create()
import {User,Registers, LoginProps,EmailProps, ResetPassProps, StatusAuthProps} from '@/types/index'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ResetPass = async(data : ResetPassProps): Promise<ResetPassProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`/api/reset-password`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const StatusAuth = async(data : StatusAuthProps): Promise<StatusAuthProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`/api/authenticate-user`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const GetAllUsers = async (token: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `/api/user/get-all-users`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error get users');
  }
};

export const GetDetailUser = async (id:any,token: any) => {
  try {
    const response: AxiosResponse = await axios.get(
      `/api/user/get-detail-user/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error get users');
  }
};

export const CreateUser = async (
  token: string,
  data: Omit<User, 'confirmPassword'>
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `/api/user/create-user`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error create user');
  }
};

export const UpdateUser = async (
  id: string,
  token: string,
  data: Partial<Pick<User, 'password'>> & Omit<User, 'confirmPassword'>
) => {
  try {
    const response: AxiosResponse = await axios.put(
      `/api/user/update-user/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error update user');
  }
};

export const DeleteUser = async (id: string, token: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `/api/user/delete-user/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error delete user');
  }
};

export const DeleteManyUser = async (ids: Array<string>) => {
  try {
    const response: AxiosResponse = await axios.post(
      `/api/user/delete-many-user`,
      ids
    );
    return response.data;
  } catch {
    throw new Error('Error delete many user');
  }
};


