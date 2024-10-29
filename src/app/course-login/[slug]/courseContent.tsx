"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Lock } from "lucide-react";
import { CheckCircleFilled } from "@ant-design/icons";
import Text from "@/components/Text/text";

interface Props {
  activeChapterIndex?: number | null;
  handleAccordionChange: (value: string) => void;
  mergedChapters: any;
  activeSlug: any;
  handleVideo: (value: any) => void;
}

export default function courseContent({
  activeChapterIndex,
  handleAccordionChange,
  mergedChapters,
  activeSlug,
  handleVideo,
}: Props) {
  return (
    <div className="flex-1 border-l-2 ">
      <div className="font-semibold text-[20px] mb-3 p-2 text-center ">
        Nội dung khóa học
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={
          activeChapterIndex !== null ? `item-${activeChapterIndex}` : undefined
        }
        onValueChange={handleAccordionChange}
      >
        {mergedChapters?.map((chapter: any, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="bg-slate-100 text-[18px] px-2 hover:no-underline hover:bg-slate-200 border-b-2 border-t-2 border-black">
              {chapter.namechapter}
            </AccordionTrigger>
            {chapter.videos.map((video: any, vidIndex: number) => (
              <AccordionContent
                key={vidIndex}
                className={`flex justify-between h-[50px] pl-3 border-b-2 border-black
              ${video.slug === activeSlug ? "bg-[#FFCFAE]" : ""}
              ${
                video.status === "not_started"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }
              ${video.status === "not_started" ? "" : "hover:bg-slate-300"}
              ${video.status === "not_started" ? "bg-slate-200" : ""}
              `}
                onClick={() => {
                  if (video.status !== "not_started") {
                    handleVideo(video?.slug);
                  }
                }}
              >
                <div className="w-[80%] text-[14px]">
                  <div className="mb-1">{video.childname}</div>
                  <div className="flex">
                    <Clock className="size-[20px] mr-2" /> {video.time}
                  </div>
                </div>
                <div className="w-[20%] justify-center items-center">
                  {video.status === "not_started" ? (
                    <div className="flex justify-between mr-3 pt-[15px]">
                      <div></div>
                      <Lock size="18" />
                    </div>
                  ) : video.status === "completed" ? (
                    <div className="flex justify-between mr-3 text-center">
                      <div></div>
                      {/* <CircleCheck size="20" className="text-[#55c72b]" /> */}
                      <CheckCircleFilled className="text-[#55c72b] pt-[15px] text-[20px]" />
                    </div>
                  ) : (
                    []
                  )}
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
