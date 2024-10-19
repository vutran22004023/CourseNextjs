import React from "react";
import Button from "@/components/Button/Button";
import CardRoom from "./cardRoom";
import CreateRoom from './createRoom'
export default function page() {
  return (
    <div className="mt h-full overflow-y-auto">
      <div className="flex gap-4 mt-10">
        <div className="w-[80%] shadow-xl p-5 rounded-xl">
          <CardRoom title="Đang diễn ra" />
        </div>
        <div className="flex-auto">
          <CreateRoom/>
          <Button
            type="courseHeader"
            className="p-2 flex flex-row justify-center mt-2"
          >
            Tham gia lớp học ngày
          </Button>
        </div>
      </div>
    </div>
  );
}
