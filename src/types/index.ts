export interface User {
  name?: string | "";
  email?: string | "";
  password: string | "";
  isAdmin?: boolean | "";
  status?: boolean | "";
  avatar?: string | "";
  confirmPassword?: string | "";
}

export interface Registers {
  name?: string | "";
  email?: string | "";
  password?: string | "";
  confirmPassword?: string | "";
}

export interface LoginProps {
  email?: string | "";
  password?: string | "";
}

export interface EmailProps {
  email?: string;
}

export interface ResetPassProps {
  password?: string;
  confirmPassword?: string;
  token?: string;
}

export interface StatusAuthProps {
  status?: boolean;
  token?: string;
}

export interface Video {
  childname: string;
  video: string;
  time?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chapter {
  namechapter: string;
  videos: Video[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Course {
  chapters: any[];
  createdAt: string;
  image: string;
  name: string;
  price: string;
  slug: string;
  updatedAt: string;
  video: string;
  view: number;
  __v: number;
  _id: string;
}

export interface DataAllCourses {
  status: number;
  message: string;
  data: Course[];
  total: number;
  pageCurrent: number;
  totalPage: number;
}

export interface Blog {
  author: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  likes: string;
  comments: string;
}

export interface DataAllBlogs {
  status: number;
  message: string;
  data: Blog[];
  total: number;
  pageCurrent: number;
  totalPage: number;
}

export interface IfetchTable {
  fetchTableData: {
    data: any;
    error: any;
    isLoading: any;
    refetch: () => Promise<void>;
  };
}

export interface token {
  token: string;
}

export interface Note {
  time: string;
  content: string;
}

export interface CourseProgress {
  _id: string;
  updatedAt: string;
  course: Pick<Course, "_id" | "image" | "name" | "slug"> & {
    totalVideos: number;
    progress: number;
  };
}
