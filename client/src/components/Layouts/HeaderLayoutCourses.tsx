"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import ButtonComponent from "../Button/Button";
import NoteSheet from "src/app/course-login/[slug]/note"; 
import { RootState } from "@/redux/store";

export default function smallHeaderLayoutCourses() {
  const timeVideo = useSelector((state: RootState) => state.timesVideo);

  // State to control NoteSheet visibility
  const [isNoteSheetOpen, setIsNoteSheetOpen] = useState(false);

  // Function to toggle NoteSheet visibility
  const handleOpenChange = () => {
    setIsNoteSheetOpen(!isNoteSheetOpen);
  };

  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b p-3 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <Link href="/">
          <ButtonComponent type="coursesmallHeader" className="px-3 py-1">
            <ArrowBigLeft />
          </ButtonComponent>
        </Link>
        <h1 className="text-[#040404] font-bold text-2xl ml-3">Trở về</h1>
      </div>
      <div>
        <input />
      </div>
      <div className="flex gap-4 items-center mr-3">
        <div className="flex justify-center items-center">
          <Progress
            type="circle"
            percent={timeVideo?.percentCourse}
            size={40}
          />
          <div className="ml-2">
            {timeVideo?.totalcompletedVideo}/{timeVideo?.totalVideo} bài học
          </div>
        </div>
        <ButtonComponent
          onClick={handleOpenChange}
          type="notesheet"
        >
          Chú thích
        </ButtonComponent>
        <Link href="/my-courses" className="text-black">
          Hướng dẫn
        </Link>
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
