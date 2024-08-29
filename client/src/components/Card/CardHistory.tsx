import { CourseProgress } from "@/types";
import { Progress } from "antd";
import Image from "next/image";
import React from "react";

interface Props {
  data: CourseProgress;
}

export default function CardHistory({ data }: Props) {
  const { course, updatedAt } = data;
  const progress = Math.round(course.progress / course.totalVideos);
  return (
    <div className="w-full flex justify-between gap-3 hover:bg-slate-200 rounded p-2">
      <div className="w-[30%]">
        <Image
          src={course.image}
          alt="icon"
          width={150} // Replace with the appropriate width
          height={60}
          className="w-full h-full rounded" // Ensuring the image covers the div
        />
      </div>
      <div className="w-[70%]">
        <div className="text-ml font-semibold">{course.name}</div>
        <div className="text-sm">{updatedAt}</div>
        <Progress
          percent={progress}
          percentPosition={{ align: "center", type: "inner" }}
          size={[230, 20]}
        />
      </div>
    </div>
  );
}
