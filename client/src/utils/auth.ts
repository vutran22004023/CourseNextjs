import { serialize, parse } from 'cookie';
export const setCookie = (res: any, name: string, value: string, options: any) => {
    const cookie = serialize(name, value, { path: '/', ...options });
    res.setHeader('Set-Cookie', cookie);
  };
  
  export const getCookie = (req: any, name: string) => {
    const cookies = parse(req.headers.cookie || '');
    return cookies[name] || null;
  };