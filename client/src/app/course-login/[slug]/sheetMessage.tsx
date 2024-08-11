"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import ButtonComponent from "@/components/Button/Button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  dataChapter: any;
  dataVideo: any;
  dataChapVideo: any;
}
export default function sheetmessage({ isOpen, onOpenChange }: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="text-while"></SheetTrigger>
      <SheetContent className="bg-[#fff] pr-[20px]">
        <div className="text-2xl font-semibold">166 Bình luận</div>
        <SheetHeader className="mb- mt-5">
          <SheetTitle>
            <div className="flex gap-2 justify-center items-center">
              <div className="w-[80%]">
                <Textarea placeholder="Type your message here." />
              </div>
              <ButtonComponent className="w-[15%]">
                <SendHorizontal />
              </ButtonComponent>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 w-full">
          <div className="flex gap-3 mb-1 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-ml text-orange-600 font-semibold">
                Vũ Trần{" "}
              </div>
              <div className="p-3 bg-slate-200 rounded-lg max-w-[300px] overflow-hidden break-words">
                đâsdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssss
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end text-right mb-1 ">
            <div>
              <div className="text-ml text-orange-600 font-semibold mb-1">
                Vũ Trần
              </div>
              <div className="p-3 bg-slate-300 rounded-lg max-w-[300px] overflow-hidden break-words shadow-md text-left">
                đâsdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssss
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
