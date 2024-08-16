"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  dataChapter: any;
  dataVideo: any;
}

export default function NoteSheet({
  isOpen,
  onOpenChange,
  dataChapter,
  dataVideo,
}: Props) {
  const [noteText, setNoteText] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  const handleCreateNote = () => {
    // Thêm logic để lưu ghi chú tại đây
    console.log("Tạo ghi chú:", noteText);
    setNoteText(""); // Reset text sau khi tạo ghi chú
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="bg-white pr-[20px] w-[40%]">
        <div className="flex space-x-20">
          <div className="text-2xl font-semibold">Ghi chú của tôi</div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trong chương hiện tại" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="apple">Trong chương hiện tại</SelectItem>
                  <SelectItem value="banana">Chương sau</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Mới nhất" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="apple">Mới nhất</SelectItem>
                  <SelectItem value="banana">Cũ nhất</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetHeader className="mb-4 mt-5">
          <SheetTitle>
            <div className="flex gap-2 p-[15px] bg-slate-400 rounded-[10px]">
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex justify-center p-1 w-[60px] h-auto rounded-[20px] bg-[#f22c3d] text-white">00:01</div>
                  <div className="flex gap-3">
                    <Pencil />
                    <Trash2 />
                  </div>
                </div>
                <div className="text-[#f22c3d]">Tìm hiểu về HTML, CSS</div>
                <div>hsaudhaisdjhasdád</div>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
