import React from 'react'
import  ButtonComponment from '@/components/Button/Button';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

interface Props {
    handlePreviousLesson : () => void;
    disableNextLesson: boolean;
    handleNextLesson: () => void;
    dataChildName: string;
}
export default function bottomBar({handlePreviousLesson,disableNextLesson,handleNextLesson,dataChildName}:Props) {
  return (
    <div className="fixed bottom-0 left-0 bg-[#dbdbdb] right-0 z-10 border-b p-3 flex  items-center">
    <div className="flex justify-center items-center w-full">
      <ButtonComponment
        className="w-[200px]"
        style={{
          marginTop: "0",
          borderRadius: "10px",
          marginRight: "5px",
        }}
        onClick={handlePreviousLesson}
      >
        <ArrowBigLeft />
        BÀI TRƯỚC
      </ButtonComponment>
      <ButtonComponment
        className={`w-[200px] ${
          disableNextLesson ? "opacity-50 cursor-not-allowed " : ""
        }`}
        style={{ marginTop: "0", borderRadius: "10px" }}
        onClick={handleNextLesson}
      >
        BÀI TIẾP THEO
        <ArrowBigRight />
      </ButtonComponment>
    </div>
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-3 flex items-center">
      <div>{dataChildName}</div>
      <ButtonComponment
        className="ml-2 p-3 w-[50px]"
        style={{ marginTop: "0", borderRadius: "60%" }}
      >
        <ArrowBigRight />
      </ButtonComponment>
    </div>
  </div>
  )
}
