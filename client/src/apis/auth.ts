import axios, { AxiosResponse } from 'axios';
const axiosJWT = axios.create()
import {User,Registers, LoginProps,EmailProps, ResetPassProps, StatusAuthProps} from '@/types/index';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const Login = async( data:LoginProps): Promise<LoginProps> => {
    try{
        const response: AxiosResponse<LoginProps> = await axios.post(`${apiUrl}/api/login-in`, data);
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const Register = async (data: Registers): Promise<Registers> => {
    try {
      const response: AxiosResponse<Registers> = await axios.post(`${apiUrl}/api/register`, data);
      return response.data;
    } catch {
      throw new Error('Error registering');
    }
  };

  export const LoginOut = async(): Promise<User> => {
    try{
        const response: AxiosResponse<User> = await axios.post(`${apiUrl}/api/register`);
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const ForgotPassword = async(data:EmailProps ):Promise<EmailProps> => {
    try{
        const response: AxiosResponse<EmailProps> = await axios.post(`${apiUrl}/api/forgot-password`, data);
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const ResetPass = async(data : ResetPassProps): Promise<ResetPassProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`${apiUrl}/api/reset-password`, data,{
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
        const response: AxiosResponse<ResetPassProps> = await axios.post(`${apiUrl}/api/authenticate-user`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export const Refreshtoken = async(data : StatusAuthProps): Promise<StatusAuthProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`${apiUrl}/api/refresh-token`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

