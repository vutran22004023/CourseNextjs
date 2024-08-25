"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonComponent from "@/components/Button/Button";
import { GetAllCourses, DeleteCourses } from "@/apis/course";
import { useMutationHook } from "@/hooks/index";
import { success, error } from "@/components/Message/Message";
import { useCombinedData } from "@/hooks/index";
import Text from "@/components/Text/text";
interface DeleteProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}
export default function deleteCourse({ id, isOpen, onClose }: DeleteProps) {
  const getAllCourses = async () => {
    const res = await GetAllCourses();
    return res;
  };
  const fetchTableData = useCombinedData("dataAllCoursess", getAllCourses);
  const {
    data: _dataAllCourses,
    error: _Errdata,
    isLoading: _isLoadingAllCourses,
    refetch,
  } = fetchTableData;
  const mutationDeleteCourses = useMutationHook(async (idDelete) => {
    const res = await DeleteCourses(idDelete);
    return res;
  });

  const { data: dataDeleteCourses } = mutationDeleteCourses;

  useEffect(() => {
    if (dataDeleteCourses?.status === 200) {
      success(`${dataDeleteCourses?.message}`);
    } else if (dataDeleteCourses?.status === "ERR") {
      error(`${dataDeleteCourses?.message}`);
    }
  }, [dataDeleteCourses]);

  const handleButtonDelete = () => {
    mutationDeleteCourses.mutate(id);
    onClose();
    refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn xóa khóa học ...</DialogTitle>
          <DialogDescription>
            Bạn phải chắc chắn rằng bạn sẽ xóa khóa học này, nếu xóa thì dữ liệu
            mất vĩnh viễn.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonComponent type="submit" onClick={handleButtonDelete}>
            Xóa khóa học
          </ButtonComponent>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
