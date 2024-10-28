'use client'
import React, {useEffect, useState} from 'react';
import {useMutationHook} from "@/hooks";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Text from "@/components/Text/text";
import {GetMessageCourse} from '@/apis/message'
import {UpdateNote} from "@/apis/usercourse";
import {MoreHorizontal} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import ButtonComponent from "@/components/Button/Button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface Props {
    data: any;
    isOpen: boolean;
    onClose: () => void;
}

const ShowMessage = ({data, isOpen, onClose}: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const mutationMessage = useMutationHook(async (courseId) => {
        try {
            const res = await GetMessageCourse(courseId);
            return res;
        } catch (e) {
            console.log(e);
        }
    })
    useEffect(() => {
        if (isOpen) {
            mutationMessage.mutate(data?._id)
        }
    }, [isOpen])
    const {data: dataMessageDetail} = mutationMessage;
    console.log(dataMessageDetail)
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild className="text-while"></SheetTrigger>
            <SheetContent className="bg-[#fff] pr-[20px] w-[500px] max-w-full">
                <SheetHeader className="mb-3">
                    <SheetTitle>
                        <Text type="subtitle">{dataMessageDetail?.totalMessages} Bình luận</Text>
                    </SheetTitle>
                </SheetHeader>
                <div className="max-h-[580px] overflow-y-auto">
                    <div className="mt-4 w-full max-h-[500px] overflow-y-auto p-2">
                        {dataMessageDetail?.messages?.map((message: any, index: any) =>
                            message?.userId === user?.id ? (
                                <div
                                    className="flex gap-3 justify-end text-right mb-1"
                                    key={index}
                                >
                                    <div className="flex gap-3">
                                        <div>
                                            <div className="text-orange-600 font-semibold mb-1 text-[14px]">
                                                {message?.name}
                                            </div>
                                            <div
                                                onClick={() => handleEditClick(message)}
                                                className="p-3 bg-slate-300 rounded-lg max-w-[300px] overflow-hidden break-words shadow-md text-left"
                                            >
                                                {message?.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3 mb-1" key={index}>
                                    <Avatar>
                                        <AvatarImage src={message?.avatar}/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Text
                                            type="defaultSemiBold"
                                            className="text-ml text-orange-600 font-semibold text-[14px]"
                                        >
                                            {message?.name}
                                        </Text>
                                        <Text
                                            className="p-3 bg-slate-200 rounded-lg max-w-[300px] overflow-hidden break-words">
                                            {message?.text}
                                        </Text>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ShowMessage;