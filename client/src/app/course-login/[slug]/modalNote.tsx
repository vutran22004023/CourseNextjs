"use client";
import React, { useState } from "react";
import WordPost from "@/components/WordPost/wordPost";
import ButtonComponment from "@/components/Button/Button";
import { CSSTransition } from "react-transition-group";
import NoteSheet from "./note";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isNoteSheetOpen: boolean;
  setIsNoteSheetOpen: (value: boolean) => void;
  handleOpenChange: () => void;
  handleUpdateNote: (data: string) => void;
}

export default function modalNote({
  isOpen,
  setIsOpen,
  isNoteSheetOpen,
  setIsNoteSheetOpen,
  handleOpenChange,
  handleUpdateNote,
}: Props) {
  const [note, setNote] = useState("");
  const handleNote = (data: string) => {
    handleUpdateNote(data);
    setNote("");
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed bottom-0 left-0 bg-[#f4f4f4] right-0 z-10 border-b p-5 w-[69.5%] h-[290px] border-t border-black">
        <div className="p-5 bg-[#fff] border  border-black rounded-xl h-[200px]">
          <WordPost rawHTML={note} setRawHTML={setNote} />
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex mt-5">
            <ButtonComponment
              className="ml-2 p-3 w-[150px]"
              style={{ marginTop: "0", borderRadius: 10 }}
              onClick={() => setIsOpen(false)}
            >
              Hủy bỏ
            </ButtonComponment>
            <ButtonComponment
              onClick={handleNote(note)}
              className="ml-2 p-3 w-[150px]"
              style={{ marginTop: "0", borderRadius: 10 }}
            >
              Tạo ghi chú
            </ButtonComponment>
          </div>
          <NoteSheet
            isOpen={isNoteSheetOpen}
            onOpenChange={handleOpenChange}
            dataChapter={null}
            dataVideo={null}
          />
        </div>
      </div>
    </CSSTransition>
  );
}
