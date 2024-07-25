import { ReactNode }  from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"

  interface UserDialogProps {
    triggerContent: ReactNode;
    contentHeader: ReactNode;
    contentBody: ReactNode;
    contentFooter: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }
export default function Modal({ triggerContent, contentHeader, contentBody, contentFooter, isOpen, setIsOpen }: UserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerContent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[355px] md:max-w-[550px] bg-slate-50 " style={{borderRadius:'10px'}}>
        <DialogHeader>
          {contentHeader}
        </DialogHeader>
        {contentBody}
        <DialogFooter>
          {contentFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
