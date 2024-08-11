
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import { Users } from 'lucide-react';
interface Course {
  chapters: any[];
  createdAt: string;
  image: string;
  name: string;
  price: string;
  slug: string;
  updatedAt: string;
  video: string;
  __v: number;
  _id: string;
}

// Định nghĩa kiểu dữ liệu cho props
interface Idata {
  course: Course;
}
export default function Cart({ course }: Idata) {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl mb-2 relative">
        <img
          src={course?.image}
          alt={course?.name}
          className="w-[300px] h-[150px] md:h-[200px] rounded-xl transition-all duration-300 group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
          <div className="opacity-0 transform translate-y-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-black px-4 py-2  bg-white bg-opacity-0 p-3 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl">Xem khóa học</span>
          </div>
        </div>
      </div>
      <div className="mb-1 font-medium">{course?.name}</div>
      <div className="flex gap-2 text-[14px]">
        <Users className="text-[12px]" />
        <span>127.127</span>
      </div>
    </div>
  );
}
