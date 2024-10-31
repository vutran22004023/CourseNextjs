import Anh1 from "@/assets/Images/hinh-dep.jpg";
import { Course } from "@/types";
import { Users } from "lucide-react";
import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho props
interface Idata {
  course: Course;
}
export default function Cart({ course }: Idata) {
  return (
    <div className="relative group rounded-xl border  hover:border-none transition-all duration-300 hover:shadow-[0_8px_16px_rgba(255,90,0,0.6)] hover:translate-y-[-8px]">
      <div className="overflow-hidden relative h-[190px]">
        <Image
            src={course?.image}
            alt={course?.name}
            width={500}
            height={500}
            quality={90}
            className="w-full h-[190px] md:h-[200px] rounded-t-xl transition-all duration-300 group-hover:opacity-70 object-cover"
        />
        <div className="absolute h-[190px] inset-0 bg-black bg-opacity-0 rounded-t-xl group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
          <div className="opacity-0 transform translate-y-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-black px-4 py-2 bg-white bg-opacity-0 p-3 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl">
              Xem khóa học
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white text-black p-4 rounded-b-xl">
        <div className="mb-1 font-bold">{course?.name}</div>
        <div className="flex gap-2 text-[14px]">
          <Users className="text-[12px] text-[#ff5a00]" />
          <span className="font-bold text-[16px] text-[#ff5a00]">{course.view}</span>
        </div>
      </div>
    </div>
  );
}
