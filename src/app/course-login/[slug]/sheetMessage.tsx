"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonComponent from "@/components/Button/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useQuery } from "@tanstack/react-query";
import Text from "@/components/Text/text";
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation('common');
  const [text, setText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [showActionsId, setShowActionsId] = useState<string | null>(null);

  const getMessageApi =  useMutationHook(async(data: any) => {
    const {courseId,chapterId,videoId,page} = data
    console.log(videoId,chapterId,videoId)
    const res = await GetMessage(
        courseId,
        chapterId,
        videoId,
        page
      );
    return res;
  })

  const mutationPostMessage = useMutationHook(async (data) => {
    const res = await PostMessage(data);
    return res;
  });

  const mutationUpdateMessage = useMutationHook(async (data) => {
    const res = await UpdateMessage(
      dataVideo?._id,
      dataChapter[0]._id,
      dataChapVideo?._id,
      editMessageId,
      data
    );
    return res;
  });

  const mutationDeleteMessage = useMutationHook(async (idMess) => {
    const res = await DeleteMessage(
      dataVideo?._id,
      dataChapter[0]._id,
      dataChapVideo?._id,
      idMess,
      user?.id
    );
    return res;
  });
  const {data: dataMessage} = getMessageApi

  useEffect(() => {
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
          setText("");
          getMessageApi.mutate({
            courseId: dataVideo._id,
            chapterId: dataChapter[0]._id,
            videoId: dataChapVideo._id,
            page
          });
        },
        onError: (error) => {
          console.error("Error posting message:", error.message);
        },
      }
    );
    setText("");
  };

  useEffect(() => {
    if (dataVideo?._id && dataChapter[0]?._id && dataChapVideo?._id && isOpen) {
      getMessageApi.mutate({
        courseId: dataVideo._id,
        chapterId: dataChapter[0]._id,
        videoId: dataChapVideo._id,
        page
      });
    }
  }, [isOpen]);

  const handleEditClick = (message: any) => {
    setEditingMessageId(message._id);
  };

  const handleOnClickEdit = (message: any) => {
    setEditMessageId(message._id);
    setEditedText(message.text);
    setShowActionsId(null);
  };

  const handleSaveEdit = () => {
    if (editMessageId) {
      mutationUpdateMessage.mutate({ userId: user?.id, text: editedText });
      setEditedText("");
    }
  };

  const { data: dataUpdate } = mutationUpdateMessage;
  useEffect(() => {
    if (dataUpdate?.message === "Message updated successfully.") {
      setEditMessageId(null);
      getMessageApi.mutate({
        courseId: dataVideo._id,
        chapterId: dataChapter[0]._id,
        videoId: dataChapVideo._id,
        page
      });
    }
  }, [dataUpdate]);

  const handleOnClickDelete = (message: any) => {
    mutationDeleteMessage.mutate(message._id);
  };

  const toggleActions = (id: string) => {
    setShowActionsId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="text-while"></SheetTrigger>
      <SheetContent className="bg-[#fff] pr-[20px] w-[500px] max-w-full step7">
        <Text type="subtitle">{dataMessage?.totalMessages} Bình luận</Text>
        <SheetHeader className="mb- mt-5">
          <SheetTitle>
            <div className="flex gap-2 justify-center items-center">
              <div className="w-[80%]">
                <Input
                  placeholder="Type your message here."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setText(e.target.value)
                  }
                />
              </div>
              <ButtonComponent
                className="w-[15%] h-[40px] flex justify-center items-center rounded-[8px]"
                type="notesheet"
                onClick={handleButton}
              >
                <SendHorizontal />
              </ButtonComponent>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 w-full max-h-[500px] overflow-y-auto p-2">
          {messages?.map((message: any, index) =>
            message?.userId === user?.id ? (
              <div
                className="flex gap-3 justify-end text-right mb-1"
                key={index}
              >
                <div className="flex gap-3">
                  <div className=" mt-[37px]">
                    <button
                      onClick={() => toggleActions(message._id)}
                      className="text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      <MoreHorizontal />
                    </button>
                    {showActionsId === message._id && (
                      <div className="absolute right-7 text-[12px] mt-1 bg-white border border-gray-200 rounded-[5px] flex shadow-lg">
                        <div
                          onClick={() => handleOnClickEdit(message)}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                        >
                          {t('CourseLogin.Edit')}
                        </div>
                        <div
                          onClick={() => handleOnClickDelete(message)}
                          className="cursor-pointer p-2 text-red-600 hover:bg-gray-100"
                        >
                          {t('CourseLogin.Delete')}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-orange-600 font-semibold mb-1 text-[14px]">
                      {message?.name}
                    </div>

                    {editMessageId === message._id ? (
                      <div>
                        <Textarea
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="min-w-[400px]"
                        />
                        <div className="flex gap-2">
                          <ButtonComponent type="notesheet" className="px-2 py-1" onClick={handleSaveEdit}>
                          {t('CourseLogin.Save')}
                          </ButtonComponent>
                          <ButtonComponent
                            type="notesheet"
                            className="px-2 py-1"
                            onClick={() => setEditMessageId(null)}
                          >
                            {t('CourseLogin.Exit')}
                          </ButtonComponent>
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
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 mb-1" key={index}>
                <Avatar>
                  <AvatarImage src={message?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <Text
                    type="defaultSemiBold"
                    className="text-ml text-orange-600 font-semibold text-[14px]"
                  >
                    {message?.name}
                  </Text>
                  <Text className="p-3 bg-slate-200 rounded-lg max-w-[300px] overflow-hidden break-words">
                    {message?.text}
                  </Text>
                </div>
              </div>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
