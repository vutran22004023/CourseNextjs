"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NotebookPen, MessageCircleQuestion, Menu } from "lucide-react";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import ButtonComponent from "../Button/Button";
import NoteSheet from "src/app/course-login/[slug]/note";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAtoms } from "@/hooks/useAtom";
import { AllNote } from "@/apis/usercourse";
import { useMutationHook } from "@/hooks";

export default function HeaderLayoutCourses() {
  const { courseDetail } = useAtoms();
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  const [isNoteSheetOpen, setIsNoteSheetOpen] = useState(false);
  const [dataNote, setDataNote] = useState<any>();
  const [selectedChapter, setSelectedChapter] = useState<string>("current");
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>("newest");

  const handleOpenChange = () => {
    setIsNoteSheetOpen(!isNoteSheetOpen);
  };

  const mutationAllNote = useMutationHook(async (data) => {
    try {
      const res = await AllNote(data);
      return res;
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    if (isNoteSheetOpen && courseDetail) {
      mutationAllNote.mutate(
        {
          courseId: courseDetail?.courseId,
          videoId: courseDetail?.videoID,
          currentChapter: selectedChapter === "current" ? 0 : 1,
          nextChapter: selectedChapter === "current" ? 1 : 2,
          sortOrder: selectedSortOrder,
          page: 1,
          limit: 10,
        },
        {
          onSuccess: (data) => {
            setDataNote(data);
          },
        }
      );
    }
  }, [
    isNoteSheetOpen,
    courseDetail,
    dataNote,
    selectedChapter,
    selectedSortOrder,
  ]);

  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b p-2 md:p-3 flex justify-between items-center">
      <div className="flex">
        <ButtonComponent
          className="text-[16px] w-[90px] h-[30px] md:text-xl md:w-[133px] md:h-[43px]"
          type="hoverbutton"
        >
          <Link
            href="/"
            className="bg-[#FF5A00] rounded-[30px] w-[28px] h-[28px] md:h-[41px] md:w-[40px] flex items-center justify-center absolute left-[0.5px] top-[0px] md:group-hover:w-[130px] group-hover:w-[88px] z-10 duration-500"
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
            className="hidden md:block"
          />
          <div className="hidden md:block md:ml-2 md:text-[18px] font-normal">
            {timeVideo?.totalcompletedVideo}/{timeVideo?.totalVideo} bài học
          </div>
        </div>
        <div className="hidden md:flex gap-2">
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="md:hidden rounded-full border-2 border-[#FF5A00] p-2">
            <Menu />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[140px] border-none bg-transparent rounded">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer justify-end">
              <ButtonComponent
                onClick={handleOpenChange}
                type="notesheet"
                className="h-[35px] text-[12px] flex items-center px-3 select-none"
              >
                <NotebookPen className="size-[20px] mr-1" />
                Chú thích
              </ButtonComponent>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer justify-end">
              <ButtonComponent
                type="notesheet"
                className="h-[35px] text-[12px] flex items-center px-3 select-none"
              >
                <Link href="/my-courses" className="flex">
                  <MessageCircleQuestion className="size-[20px] mr-1" />
                  Hướng dẫn
                </Link>
              </ButtonComponent>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <NoteSheet
        isOpen={isNoteSheetOpen}
        onOpenChange={handleOpenChange}
        dataNote={dataNote}
        setSelectedChapter={setSelectedChapter}
        setSelectedSortOrder={setSelectedSortOrder}
        courseId={courseDetail?.courseId}
        videoId={courseDetail?.videoID} mutationAllNote={function (value: any): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
}
