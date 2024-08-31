import { Progress } from "antd";
import Image from "next/image";
import React from "react";
import Text from "../Text/text";

export default function CardHistory() {
  return (
    <div className="w-full flex justify-between gap-3 hover:bg-slate-200 rounded p-2">
      <div className="w-[30%]">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/note-app-384ec.appspot.com/o/files%2F737c58f9-2aaf-468d-be1e-2e2370332b97?alt=media&token=9d47ff94-bb7a-47b1-97cc-c891696e194e"
          alt="icon"
          width={150} // Replace with the appropriate width
          height={60}
          className="w-full h-full rounded" // Ensuring the image covers the div
        />
      </div>
      <div className="w-[70%]">
        <Text className="text-ml font-semibold">Tên khóa học</Text>
        <Text className="text-sm">Học cách đây 2 tháng trước</Text>
        <Progress
          percent={100}
          percentPosition={{ align: "center", type: "inner" }}
          size={[230, 20]}
        />
      </div>
    </div>
  );
}
