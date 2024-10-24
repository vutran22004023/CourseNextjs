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
import { Trash2, Pencil, ArrowBigLeft, PencilLine } from "lucide-react";
import Button from "@/components/Button/Button";
import WordPost from "@/components/WordPost/wordPost";
import { UpdateNote } from "@/apis/usercourse";
import { useMutationHook } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { success } from "@/components/Message/Message";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  dataNote: any;
  mutationAllNote: (value: any) => void;
  setSelectedChapter: (value: any) => void;
  setSelectedSortOrder: (value: any) => void;
  courseId: string;
  videoId: string;
}

export default function NoteSheet({
  isOpen,
  onOpenChange,
  dataNote,
  setSelectedChapter,
  setSelectedSortOrder,
  courseId,
  videoId,
}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [detailNote, setDetailNote] = useState<any>();
  const [valueTitle, setValueTitle] = useState<string>("");
  const [valueWord, setValueWord] = useState<string>("");

  useEffect(() => {
    if (detailNote) {
      setValueTitle(detailNote?.title);
    }
  }, [detailNote]);

  const handleClose = () => {
    setDetailNote(null);
  };
  const mutationUpdateNote = useMutationHook(async (data) => {
    try {
      const res = await UpdateNote(data);
      return res;
    } catch (err) {
      console.log(err);
    }
  });
  const handleUpdateNote = () => {
    if (valueTitle && valueWord) {
      mutationUpdateNote.mutate(
        {
          userId: user.id,
          courseId: courseId,
          videoId: videoId,
          notes: {
            title: valueTitle,
            time: detailNote?.time,
            content: valueWord,
          },
        },
        {
          onSuccess(data, variables, context) {
            success("Cập nhập thành công");
            setDetailNote(null);
          },
        }
      );
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild></SheetTrigger>
      {detailNote ? (
        <SheetContent className="bg-white pr-[20px] w-full md:w-[40%]">
          <div className="flex w-full justify-between">
            <Button
              className="p-2 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00] flex w-[75px] justify-center"
              onClick={handleClose}
            >
              <ArrowBigLeft />
            </Button>
            <Button
              className="p-2 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00] flex w-[75px] justify-center"
              onClick={handleUpdateNote}
            >
              <PencilLine />
            </Button>
          </div>
          <SheetHeader className="mb-4 mt-5">
            <SheetTitle>
              <input
                value={valueTitle}
                name="valueTitle"
                onChange={(e) => setValueTitle(e.target.value)}
                className="border-none w-full focus:outline-none border-0 mb-2 p-3 rounded-lg"
                placeholder="Nhập tiêu đề"
              />
              <div className="p-5 bg-[#fff] border  border-black rounded-xl h-[70vh] overflow-y-auto">
                <WordPost
                  setValueWord={setValueWord}
                  initialContent={detailNote?.content || ""}
                />
              </div>
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      ) : (
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
                    <SelectItem value="current">
                      Trong chương hiện tại
                    </SelectItem>
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
                        <button onClick={() => setDetailNote(item)}>
                          <Pencil />
                        </button>
                        <button>
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                    <div className="text-[#f22c3d]">{item?.title}</div>
                  </div>
                </div>
              ))}
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
}
