"use client";
import React from "react";
import ButtonComponment from "@/components/Button/Button";
import { AlignRight, ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface Props {
  handlePreviousLesson: () => void;
  disableNextLesson: boolean;
  handleNextLesson: () => void;
  // dataChildName: string | undefined;
  setNavbarRight: (value: boolean) => void;
  navbarRight: boolean;
}
export default function bottomBar({
  handlePreviousLesson,
  disableNextLesson,
  handleNextLesson,
  setNavbarRight,
  navbarRight
}:
Props) {
  return (
    <div className="fixed border-2 border-[#000] bottom-0 left-0 bg-white w-full h-16 right-0 z-10 border-t p-3 flex items-center">
      <div className="flex items-center justify-center gap-5 w-full">
        <ButtonComponment
          className="w-[190px] h-[43px] text-xl"
          type="hoverbutton"
          onClick={handlePreviousLesson}
        >
          <div className="bg-[#FF5A00] rounded-[30px] h-[41px] w-[40px] flex items-center justify-center absolute left-[0.5px] top-[0px] group-hover:w-[188px] z-10 duration-500">
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
          </div>
          <p className="translate-x-2 pl-3 pt-[6px] ">Bài trước</p>
        </ButtonComponment>
        <ButtonComponment
          className={`w-[190px] h-[43px] text-xl ${
            disableNextLesson ? "opacity-50 cursor-not-allowed " : ""
          }`}
          type="hoverbutton"
          onClick={handleNextLesson}
        >
          <p className="translate-x-2 pr-[40px] pt-[6px]">Bài tiếp theo</p>
          <div className="bg-[#FF5A00] rounded-[30px] h-[41px] w-[40px] flex items-center justify-center absolute right-[0.5px] top-[0px] group-hover:w-[188px] z-10 duration-500">
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
                d="M780.752 512 550.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L780.752 512z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </ButtonComponment>
      </div>
      <div className="hidden md:absolute top-[25px] right-0 transform -translate-y-1/2 mr-3 md:flex items-center">
        <ButtonComponment
          className="ml-2 p-3 w-[50px] rounded-full"
          onClick={() => setNavbarRight(!navbarRight)}
        >
          {navbarRight ? (
            <ArrowBigRight />
          ): (
            <AlignRight />
          )}
        </ButtonComponment>
      </div>
    </div>
  );
}
