import { CourseProgress } from "@/types";
import { Progress } from "antd";
import Image from "next/image";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

moment.locale("vi");

interface Props {
  data: CourseProgress;
}

export default function CardHistory({ data }: Props) {
  const { t } = useTranslation("common");
  const { course, updatedAt } = data;
  const progress = Math.round((course.progress / course.totalVideos) * 100);
  const time = moment(updatedAt).fromNow();
  const router = useRouter();
  const navigate = (path: string) => {
    router.push('/course-login/' + path);
  };

  return (
    <div
      onClick={() => navigate(course.slug)}
      className="w-full flex justify-between gap-3 hover:bg-slate-200 rounded p-2 cursor-pointer"
    >
      <div className="w-[30%] h-[5em] flex justify-center">
        <Image
          src={course.image}
          alt="icon"
          width={150} // Replace with the appropriate width
          height={60}
          className="w-[125.5px] h-[80px] rounded" // Ensuring the image covers the div
        />
      </div>
      <div className="w-[70%]">
        <div className="text-ml font-semibold">{course.name}</div>
        <div className="text-sm">{t("TimeStudy")} {time}</div>
        <Progress
          percent={progress}
          percentPosition={{ align: "center", type: "inner" }}
          size={[230, 20]}
        />
      </div>
    </div>
  );
}