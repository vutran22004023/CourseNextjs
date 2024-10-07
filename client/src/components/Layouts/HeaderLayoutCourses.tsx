"use client";
import React, { useState } from "react";
import Link from "next/link";
import { NotebookPen, MessageCircleQuestion } from "lucide-react";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import ButtonComponent from "../Button/Button";
import NoteSheet from "src/app/course-login/[slug]/note";
import { RootState } from "@/redux/store";

export default function HeaderLayoutCourses() {
  const timeVideo = useSelector((state: RootState) => state.timesVideo);

  // State to control NoteSheet visibility
  const [isNoteSheetOpen, setIsNoteSheetOpen] = useState(false);

  // Function to toggle NoteSheet visibility
  const handleOpenChange = () => {
    setIsNoteSheetOpen(!isNoteSheetOpen);
  };

  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b p-2 md:p-3 flex justify-between items-center">
      <div className="flex">
        <ButtonComponent
          className="text-[16px] w-[90px] h-[30px] md:text-xl md:w-[133px] md:h-[43px]"
          type="hoverbutton"
        >
          <Link
            href="/"
            className="bg-[#FF5A00] rounded-[30px] w-[28px] h-[28px] md:h-[41px] md:w-[40px] flex items-center justify-center absolute left-[0.5px] top-[0px] group-hover:w-[88   px] z-10 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#fff"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#fff"
              ></path>
            </svg>
          </Link>
          <p className="translate-x-2 pl-2 pt-[1px] md:pt-[6px] ">Trở về</p>
        </ButtonComponent>
        <p className="text-[16px] ml-[20px] flex items-center md:text-[24px] md:ml-[53px] font-medium">
          HTML CSS từ ZERO đến HERO
        </p>
      </div>
      <div className=" flex gap-2 items-center mr-3">
        <div className="flex justify-center items-center md:relative md:top-auto">
          <Progress
            type="circle"
            percent={timeVideo?.percentCourse}
            size={50}
          />
          <div className="hidden md:block md:ml-2 md:text-[18px] font-normal">
            {timeVideo?.totalcompletedVideo}/{timeVideo?.totalVideo} bài học
          </div>
        </div>
        <div className="hidden md:block">
          <ButtonComponent
            onClick={handleOpenChange}
            type="notesheet"
            className="h-[43px] flex items-center px-3 select-none"
          >
            <NotebookPen className="size-[20px] mr-1" />
            Chú thích
          </ButtonComponent>
          <ButtonComponent
            type="notesheet"
            className="h-[43px] flex items-center px-3 select-none"
          >
            <Link href="/my-courses" className="flex">
              <MessageCircleQuestion className="size-[20px] mr-1" />
              Hướng dẫn
            </Link>
          </ButtonComponent>
        </div>
      </div>

      <NoteSheet
        isOpen={isNoteSheetOpen}
        onOpenChange={handleOpenChange}
        dataChapter={null}
        dataVideo={null}
      />
    </div>
  );
}
