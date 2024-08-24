export interface Video {
    _id: string;
    childname: string;
    video: string;
    time: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    status?: string;
}

export interface Chapter {
    _id: string;
    namechapter: string;
    createdAt: string;
    updatedAt: string;
    videos: Video[];
}

export interface Course {
    _id: string;
    name: string;
    price: string;
    slug: string;
    image: string;
    totalTime: string;
    totalVideos: number;
    createdAt: string;
    updatedAt: string;
    video: string;
    view: number;
    __v: number;
    chapters: Chapter[];
}