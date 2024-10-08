'use client'
import React, {useEffect} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonComponent from '@/components/Button/Button'
import { GetAllBlogs , DeleteBlogs } from '@/apis/blog'
import { useMutationHook } from '@/hooks/index';
import { success, error } from '@/components/Message/Message'
import { message } from 'antd';
import {useCombinedData } from '@/hooks/index'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {getTokenFromCookies} from '@/utils/auth'
interface DeleteProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
  }
export default function deleteCourse({id,isOpen, onClose}: DeleteProps) {
  const token = getTokenFromCookies()
  const user = useSelector((state: RootState) => state.user);
  const GetAllBlogs = async() => {
    const res = await GetAllBlogs()
    return res
 } 
  const fetchTableData =useCombinedData('dataAllBlogs', GetAllBlogs);
  const { data: _dataAllBlogs, error: _Errdata, isLoading: _isLoadingAllBlogs,refetch  } = fetchTableData
  const mutationDeleteBlogs = useMutationHook(async(idDelete) => {
    const access_Token = token;
    const res = await DeleteBlogs(idDelete,access_Token)
    return res
  })

  const {data: dataDeleteBlogs} = mutationDeleteBlogs

  useEffect(() => {
    if(dataDeleteBlogs?.status === 200) {
      success(`${dataDeleteBlogs?.message}`)
    }else if(dataDeleteBlogs?.status === 'ERR') {
      error(`${dataDeleteBlogs?.message}`)
    }
  },[dataDeleteBlogs])

  const handleButtonDelete = () => {
    mutationDeleteBlogs.mutate(id)
    onClose()
    refetch()
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn xóa blog ...</DialogTitle>
          <DialogDescription>
            Bạn phải chắc chắn rằng bạn sẽ xóa blog này, nếu xóa thì dữ liệu mất vĩnh viễn.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonComponent type="submit" onClick={handleButtonDelete}>Xóa Blog</ButtonComponent>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
