'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../../../components/ui/sheet"
import ButtonComponent from '@/components/Button/Button';
  interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
  }
export default function sheetmessage({isOpen, onOpenChange}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild ></SheetTrigger>
    <SheetContent className="bg-[#fff] pr-[20px]">
    <SheetHeader className="mb-3">
      <SheetTitle>
        <div>Chỉnh sửa khóa học </div>
      </SheetTitle>
    </SheetHeader>
    <div></div>
    <SheetFooter>
      <SheetClose asChild>
        <ButtonComponent
        >
          Chỉnh sửa
        </ButtonComponent>
      </SheetClose>
    </SheetFooter>
    </SheetContent>
  </Sheet>
  )
}
