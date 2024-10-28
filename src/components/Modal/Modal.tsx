import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserDialogProps {
  triggerContent: ReactNode;
  contentHeader: ReactNode;
  contentBody: ReactNode;
  contentFooter: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  style?: string;
}
export default function Modal({
  triggerContent,
  contentHeader,
  contentBody,
  contentFooter,
  isOpen,
  setIsOpen,
  style,
}: UserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent
        className={`max-w-[355px] md:max-w-[450px] bg-[#F3EBEB] flex-col  ${style}`}
        style={{ borderRadius: "20px" }}
      >
        <DialogHeader>{contentHeader}</DialogHeader>
        <div className="w-full">{contentBody}</div>
        <DialogFooter>{contentFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
