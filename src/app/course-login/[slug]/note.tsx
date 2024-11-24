"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { UpdateNote , DeleteNote} from "@/apis/usercourse";

import { useMutationHook } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { success } from "@/components/Message/Message";
import {useTranslation} from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import ButtonComponent from "@/components/Button/Button";

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
  const {t} = useTranslation('common');
  const user = useSelector((state: RootState) => state.user);
  const [detailNote, setDetailNote] = useState<any>();
  console.log(detailNote);
  const [valueTitle, setValueTitle] = useState<string>("");
  const [valueWord, setValueWord] = useState<string>("");
  const [isOpenDeleteNote, setIsOpenDeleteNote] = useState<boolean>(false);
  const [isOpenUpdateNote, setIsOpenUpdateNote] = useState<boolean>(false);

  useEffect(() => {
    if (detailNote) {
      setValueTitle(detailNote?.title);
    }
  }, [detailNote]);

  const handleClose = () => {
    setDetailNote(null);
  };
  const handleOpenUpdateNote = (item: any) => {
    setDetailNote(item);
    setIsOpenUpdateNote(true);
  }
  const mutationUpdateNote = useMutationHook(async (data) => {
    try {
      const res = await UpdateNote(data);
      return res;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationDeleteNote = useMutationHook(async (data) => {
    try {
      const res = await DeleteNote(data);
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

  const handleOpenModalDelete = (item: any) => {
    setIsOpenDeleteNote(true);
    setDetailNote(item);
  }
  const handleButtonDelete = () => {
    if (detailNote) {
      mutationDeleteNote.mutate(
          {
            userId: user.id,
            courseId: courseId,
            videoId: videoId,
            noteId: detailNote?._id
          },
          {
            onSuccess(data, variables, context) {
              success("Xóa thành công");
              setIsOpenDeleteNote(false);
              setDetailNote(null);
            },
          }
      );
    }
  }
  return (
      <>
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild></SheetTrigger>
      {detailNote && isOpenUpdateNote ? (
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
              {t('CourseLogin.Note')}
            </div>
            <div className="flex gap-4">
              <Select onValueChange={(value) => setSelectedChapter(value)}>
                <SelectTrigger className="w-[120px] text md:w-[180px]">
                  <SelectValue placeholder= {t('CourseLogin.Chapter1')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel></SelectLabel>
                    <SelectItem value="current">
                      {t('CourseLogin.Chapter1')}
                    </SelectItem>
                    <SelectItem value="next">{t('CourseLogin.Chapter2')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedSortOrder(value)}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder={t('CourseLogin.New')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel></SelectLabel>
                    <SelectItem value="newest">{t('CourseLogin.New')}</SelectItem>
                    <SelectItem value="oldest">{t('CourseLogin.Old')}</SelectItem>
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
                        <button onClick={() => handleOpenUpdateNote(item)}>
                          <Pencil />
                        </button>
                        <button onClick={() => handleOpenModalDelete(item)}>
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
        <Dialog open={isOpenDeleteNote} onOpenChange={() => setIsOpenDeleteNote(!isOpenDeleteNote)}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#fff]">
            <DialogHeader>
              <DialogTitle>Bạn có chắc chắn xóa khóa học ...</DialogTitle>
              <DialogDescription>
                Bạn phải chắc chắn rằng bạn sẽ xóa note này, nếu xóa thì dữ liệu
                mất vĩnh viễn.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <ButtonComponent
                  type="courseHeader"
                  className="p-2"
                  onClick={handleButtonDelete}
              >
                Xóa note
              </ButtonComponent>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  );
}
