"use client";
<<<<<<< HEAD
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
=======
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
>>>>>>> master
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import ButtonComponent from "@/components/Button/Button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
<<<<<<< HEAD
import { SendHorizontal } from "lucide-react";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function sheetmessage({ isOpen, onOpenChange }: Props) {
=======
import { SendHorizontal, MoreHorizontal } from "lucide-react";
import {
  GetMessage,
  PostMessage,
  UpdateMessage,
  DeleteMessage,
} from "@/apis/message";
import { useMutationHook } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getTokenFromCookies } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  dataChapter: any;
  dataVideo: any;
  dataChapVideo: any;
}
export default function sheetmessage({
  isOpen,
  onOpenChange,
  dataChapter,
  dataVideo,
  dataChapVideo,
}: Props) {
  const [text, setText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const getMessageApi = async () => {
    const token = await getTokenFromCookies();
    if (token === null) {
      throw new Error("No token found");
    }
    const res = await GetMessage(
      dataVideo?._id,
      dataChapter[0]._id,
      dataChapVideo?._id,
      page,
      token
    );
    return res;
  };
  const mutationPostMessage = useMutationHook(async (data) => {
    const token = await getTokenFromCookies();

    if (token === null) {
      throw new Error("No token found");
    }
    const res = await PostMessage(data, token);
    return res;
  });
  const mutationUpdateMessage = useMutationHook(async (data) => {
    const token = await getTokenFromCookies();

    if (token === null) {
      throw new Error("No token found");
    }
    const res = await UpdateMessage(dataVideo?._id,dataChapter[0]._id,dataChapVideo?._id,editMessageId,data, token);
    return res;
  })

  const mutationDeleteMessage = useMutationHook(async (idMess) => {
    const token = await getTokenFromCookies();

    if (token === null) {
      throw new Error("No token found");
    }
    const res = await DeleteMessage(dataVideo?._id,dataChapter[0]._id,dataChapVideo?._id,idMess, token,user?.id);
    return res;
  })
  
  const {
    data: dataMessage,
    isPending: isLoadingMessage,
    refetch,
  } = useQuery({
    queryKey: [
      "message",
      dataVideo?._id,
      dataChapter[0]?._id,
      dataChapVideo?._id,
      page,
    ],
    queryFn: getMessageApi,
    enabled:
      !!dataVideo?._id &&
      !!dataChapter[0]?._id &&
      !!dataChapVideo?._id &&
      isOpen,
    onError: (error: any) => {
      console.error("Error fetching messages:", error.message);
    },
    retry: 3, // Không thử lại khi có lỗi
    refetchInterval: 1000, // Thực hiện gọi lại mỗi 500ms (0.5 giây)
    onSuccess: () => {
      console.log("Success fetching messages");
    },
  });

  useEffect(() => {
    // Khi video thay đổi, thực hiện refetch dữ liệu bình luận
    refetch();
  }, [dataVideo, dataChapter, dataChapVideo, isOpen]);

  useEffect(() => {
    // Kết hợp dữ liệu cũ với dữ liệu mới
    if (page === 1) {
      setMessages(dataMessage?.messages || []);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        ...(dataMessage?.messages || []),
      ]);
    }
  }, [dataMessage]);

  const handleButton = () => {
    mutationPostMessage.mutate(
      {
        courseId: dataVideo?._id,
        chapterId: dataChapter[0]._id,
        videoId: dataChapVideo?._id,
        userId: user?.id,
        name: user?.name,
        avatar: user?.avatar || "https://github.com/shadcn.png",
        text: text,
      },
      {
        onSuccess: () => {
          refetch(); // Làm mới dữ liệu bình luận sau khi gửi thành công
          setText("");
        },
        onError: (error) => {
          console.error("Error posting message:", error.message);
        },
      }
    );
  };

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      // Kiểm tra nếu cuộn đến cuối và không vượt quá tổng số trang
      if (
        target.scrollHeight - target.scrollTop === target.clientHeight &&
        page < dataMessage?.totalPages
      ) {
        setPage((prevPage) => prevPage + 1); // Tăng số trang
      }
    },
    [page, dataMessage?.totalPages]
  );

  const handleEditClick = (message: any) => {
    setEditingMessageId(message._id); // Đặt ID của tin nhắn đang chỉnh sửa
  };

  const handleOnClickEdit =(message: any) => {
    setEditMessageId(message._id)
    setEditedText(message.text);
  }

  const handleSaveEdit = () => {
    if (editMessageId) {
      // Thực hiện gọi API để lưu nội dung đã chỉnh sửa
      mutationUpdateMessage.mutate({userId: user?.id, text: editedText})
      setEditedText(""); // Xóa nội dung đã chỉnh sửa
    }
  };

  const {data: dataUpdate} = mutationUpdateMessage
  useEffect(() => {
    if(dataUpdate?.message === 'Message updated successfully.') {
      setEditMessageId(null)
    }
  },[dataUpdate]) 
  
  const handleOnClickDelete= (message: any) => {
    mutationDeleteMessage.mutate(message._id)
  }

>>>>>>> master
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="text-while"></SheetTrigger>
      <SheetContent className="bg-[#fff] pr-[20px]">
<<<<<<< HEAD
        <div className="text-2xl font-semibold">166 Bình luận</div>
=======
        <div className="text-2xl font-semibold">
          {dataMessage?.totalMessages} Bình luận
        </div>
>>>>>>> master
        <SheetHeader className="mb- mt-5">
          <SheetTitle>
            <div className="flex gap-2 justify-center items-center">
              <div className="w-[80%]">
<<<<<<< HEAD
                <Textarea placeholder="Type your message here." />
              </div>
              <ButtonComponent className="w-[15%]">
=======
                <Textarea
                  placeholder="Type your message here."
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                  }
                />
              </div>
              <ButtonComponent className="w-[15%]" onClick={handleButton}>
>>>>>>> master
                <SendHorizontal />
              </ButtonComponent>
            </div>
          </SheetTitle>
        </SheetHeader>
<<<<<<< HEAD
        <div className="mt-4 w-full">
          <div className="flex gap-3 mb-1 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-ml text-orange-600 font-semibold">
                Vũ Trần{" "}
              </div>
              <div className="p-3 bg-slate-200 rounded-lg max-w-[300px] overflow-hidden break-words">
                đâsdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssss
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end text-right mb-1 ">
            <div>
              <div className="text-ml text-orange-600 font-semibold mb-1">
                Vũ Trần
              </div>
              <div className="p-3 bg-slate-300 rounded-lg max-w-[300px] overflow-hidden break-words shadow-md text-left">
                đâsdasdasdasdasdssssssssssssssssssssssssssssssssssssssssssssss
              </div>
            </div>
          </div>
=======
        <div
          className="mt-4 w-full max-h-[500px] overflow-y-auto p-2"
          onScroll={handleScroll}
        >
          {messages?.map((message: any, index) =>
            message?.userId === user?.id ? (
              <div className="flex gap-3 justify-end text-right mb-1 group" key={index}>
              <div>
                <div className="text-ml text-orange-600 font-semibold mb-1">
                  {message?.name}
                </div>
                
                {editMessageId === message._id ? (
                  <div>
                    <Textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="min-w-[400px]"
                    />
                    <div className='flex gap-2'>
                    <ButtonComponent onClick={handleSaveEdit}>Lưu</ButtonComponent>
                    <ButtonComponent onClick={()=> setEditMessageId(null)}>Thoát</ButtonComponent>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => handleEditClick(message)}
                    className="p-3 bg-slate-300 rounded-lg max-w-[300px] overflow-hidden break-words shadow-md text-left"
                  >
                    {message?.text}
                  </div>
                )}
                
                {/* Chỉ hiển thị các nút Chỉnh sửa/Xóa khi không ở trạng thái chỉnh sửa */}
                {editMessageId !== message._id && (
                  <div className="flex gap-2">
                    <div onClick={() => handleOnClickEdit(message)} className='cursor-pointer'>Chỉnh sửa</div>
                    <div  className='cursor-pointer  text-red-600' onClick={() => handleOnClickDelete(message)}>Xóa</div>
                  </div>
                )}
              </div>
            </div>
            ) : (
              <div className="flex gap-3 mb-1" key={index}>
                <Avatar>
                  <AvatarImage src={message?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-ml text-orange-600 font-semibold">
                    {message?.name}
                  </div>
                  <div className="p-3 bg-slate-200 rounded-lg max-w-[300px] overflow-hidden break-words">
                    {message?.text}
                  </div>
                </div>
              </div>
            )
          )}
>>>>>>> master
        </div>
      </SheetContent>
    </Sheet>
  );
}
