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
import { Trash2, Pencil } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  dataNote: any;
  mutationAllNote: (value: any) => void;
  setSelectedChapter: (value: any) => void;
  setSelectedSortOrder: (value: any) => void;
}

export default function NoteSheet({
  isOpen,
  onOpenChange,
  dataNote,
  setSelectedChapter,
  setSelectedSortOrder,
}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="bg-white pr-[20px] w-full md:w-[40%]">
        <div className="flex md:space-x-20">
          <div className="text-[18px] md:text-2xl pt-1 md:pt-0 font-semibold">
            Ghi chú của tôi
          </div>
          <div className="flex gap-4">
            <Select onValueChange={(value) => setSelectedChapter(value)}>
              <SelectTrigger className="w-[120px] text md:w-[180px]">
                <SelectValue placeholder="Trong chương hiện tại" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="current">Trong chương hiện tại</SelectItem>
                  <SelectItem value="next">Chương sau</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedSortOrder(value)}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Mới nhất" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetHeader className="mb-4 mt-5">
          <SheetTitle>
            {dataNote?.data?.map((item: any) => (
              <div
                className="flex gap-2 p-[15px] border-[#ff5a00] border-2 rounded-[10px] mb-2"
                key={item?._id}
              >
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="flex justify-center p-1 w-[60px] h-auto rounded-[20px] bg-[#f22c3d] text-white">
                      {item?.time}
                    </div>
                    <div className="flex gap-3">
                      <Pencil />
                      <Trash2 />
                    </div>
                  </div>
                  <div className="text-[#f22c3d]">{item?.title}</div>
                </div>
              </div>
            ))}
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
