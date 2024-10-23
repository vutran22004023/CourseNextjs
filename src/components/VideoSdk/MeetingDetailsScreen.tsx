"use client";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import useResponsiveSize from "@/utils/useResponsiveSize";

export function MeetingDetailsScreen({ meetingId, onClickStartMeeting }: any) {
  const [isCopied, setIsCopied] = useState(false);
  const padding = useResponsiveSize({
    xl: 6,
    lg: 6,
    md: 6,
    sm: 4,
    xs: 1.5,
  });

  return (
    <div
      className={`flex flex-1 flex-col w-full `}
      style={{
        padding: padding,
      }}
    >
      <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
        <p className="text-[#000] text-base">Meeting code: {meetingId}</p>
        <button
          className="ml-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingId);
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        >
          {isCopied ? (
            <CheckIcon className="h-5 w-5 text-green-400" />
          ) : (
            <ClipboardIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      <div className="w-full md:mt-0 mt-4 flex items-center justify-center flex-col">
        <button
          className="w-full bg-[#FF5A00] text-white px-2 py-3 rounded-xl mt-5"
          onClick={(e) => {
            if (meetingId) {
              onClickStartMeeting(true);
            }
          }}
        >
          Join a meeting
        </button>
      </div>
    </div>
  );
}
