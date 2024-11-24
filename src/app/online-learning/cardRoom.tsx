"use client";
import React, {useEffect} from "react";
import Text from "@/components/Text/text";
import ImageErr from "@/assets/Images/image.png";
import Image from "next/image";
import {ShowUserTeacherRoom, ShowUserStudentRoom} from "@/apis/videoSDK";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {CalendarClock, CalendarCheck2, CalendarCog} from "lucide-react";
import Button from "@/components/Button/Button";
import {formatDateRoom} from "@/utils";
import {useRouter} from "next/navigation";
import {useAtoms} from "@/hooks/useAtom";
import {useTranslation} from "react-i18next";

const fetchShowUserTeacherRoom = async (id: any) => {
    try {
        const res = await ShowUserTeacherRoom(id);
        return res;
    } catch (err) {
        console.error(err);
    }
};
const fetchShowUserStudentRoom = async (id: any) => {
    try {
        const res = await ShowUserStudentRoom(id);
        return res;
    } catch (err) {
        console.error(err);
    }
};
export default function cardRoom() {
    const {t} = useTranslation('common');
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const {setRoom} = useAtoms();
    const {data: dataRoom, isPending: isLoadingMessage} = useQuery({
        queryKey: ["fetchRoom"],
        queryFn: async () => {
            if (user?.role === "teacher") {
                return await fetchShowUserTeacherRoom(user?.id);
            } else {
                return await fetchShowUserStudentRoom(user?.id);
            }
        },
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchInterval: 5000,
    });

    useEffect(()=> {
        if(dataRoom) {
            setRoom(dataRoom?.data?.rooms);
        }
    },[dataRoom])

    const handleJoinRoom = (roomId: string) => {
        router.push(`/online-learning/${roomId}`);
    }
    const inProgressItems = dataRoom?.data?.rooms?.filter((item: any) => item.status === "in_progress" || item.status === "not_started");
    const completedItems = dataRoom?.data?.rooms?.filter((item: any) => item.status === "completed");
    return (
        <div className="my-3">
            <div className="shadow-xl p-5 rounded-xl border-2">
                <Text type="subtitle" className="mb-2">
                    {t('OnlineLearning.Studying')}
                </Text>
                {inProgressItems?.length > 0 ? (
                    <div
                        className="w-full flex flex-nowrap md:grid md:grid-cols-4 gap-2 mb-3 pt-10 md:gap-4 overflow-x-auto">
                        {inProgressItems.map((room: any) => (
                            <div className="w-full rounded-xl border-[#000] border-2 p-3" key={room._id}>
                                <Text type="defaultSemiBold" className="mb-2">
                                    {room?.title}
                                </Text>
                                <div className="flex gap-2 mb-2 items-center">
                                    <Image
                                        src={dataRoom?.data?.teacher?.avatar}
                                        alt="imageerr"
                                        width={40}
                                        height={40}
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                    <Text type="default">{dataRoom?.data?.teacher?.name}</Text>
                                </div>
                                <div className="flex gap-2 mb-1 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarClock size={20} color="#000"/>
                                    </div>
                                    <Text>{formatDateRoom(room?.startTime)}</Text>
                                </div>
                                <div className="w-[2px] h-6 bg-black ml-[15px] mb-1"></div>
                                <div className="flex gap-2 mb-2 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarCheck2 size={20} color="#000"/>
                                    </div>
                                    <Text>{formatDateRoom(room?.endTime)}</Text>
                                </div>
                                <div className="flex gap-2 mb-2 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarCog size={20} color="#000"/>
                                    </div>
                                    <Text>
                                        {room?.status === "not_started"
                                            ? "Sắp diễn ra"
                                            : room?.status === "completed"
                                                ? "Đã hoàn thành"
                                                : "Đang diễn ra"}
                                    </Text>
                                </div>
                                <Button
                                    type="courseHeader"
                                    className="p-2 flex flex-row justify-center cursor-pointer"
                                    onClick={() => {
                                        if (room?.status === "in_progress") {
                                            handleJoinRoom(room._id)
                                        }
                                    }}
                                    disabled={room?.status === "in_progress" ? false : true}
                                >
                                    {t('OnlineLearning.Join')}
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center h-[300px]">
                        <Image
                            src={ImageErr}
                            alt="imageerr"
                            width={100}
                            height={100}
                            objectFit="cover"
                        />
                        <Text type="defaultSemiBold">
                            {t('OnlineLearning.descriptionClass')}
                        </Text>
                    </div>
                )}
            </div>
            <div className="shadow-xl p-5 rounded-xl mt-5 border-2">
                <Text type="subtitle" className="mb-2">
                    {t('OnlineLearning.Complete')}
                </Text>
                {completedItems?.length > 0 ? (
                    <div
                        className="w-full flex flex-nowrap md:grid md:grid-cols-4 gap-2 mb-3 pt-10 md:gap-4 overflow-x-auto">
                        {completedItems.map((room: any) => (
                            <div className="w-full rounded-xl border-[#000] border-2 p-3" key={room._id}>
                                <Text type="defaultSemiBold" className="mb-2">
                                    {room?.title}
                                </Text>
                                <div className="flex gap-2 mb-2 items-center">
                                    <Image
                                        src={dataRoom?.data?.teacher?.avatar}
                                        alt="imageerr"
                                        width={40}
                                        height={40}
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                    <Text type="default">{dataRoom?.data?.teacher?.name}</Text>
                                </div>
                                <div className="flex gap-2 mb-1 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarClock size={20} color="#000"/>
                                    </div>
                                    <Text>{formatDateRoom(room?.startTime)}</Text>
                                </div>
                                <div className="w-[2px] h-6 bg-black ml-[15px] mb-1"></div>
                                <div className="flex gap-2 mb-2 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarCheck2 size={20} color="#000"/>
                                    </div>
                                    <Text>{formatDateRoom(room?.startTime)}</Text>
                                </div>
                                <div className="flex gap-2 mb-2 items-center">
                                    <div className="rounded-full p-1 border-[#000] border-2 items-center">
                                        <CalendarCog size={20} color="#000"/>
                                    </div>
                                    <Text>
                                        {room?.status === "not_started"
                                            ? "Sắp diễn ra"
                                            : room?.status === "completed"
                                                ? "Đã hoàn thành"
                                                : "Đang diễn ra"}
                                    </Text>
                                </div>
                                <Button
                                    type="courseHeader"
                                    className="p-2 flex flex-row justify-center mb-2 cursor-pointer"
                                >
                                    {t('OnlineLearning.Detail')}
                                </Button>
                                <Button
                                    type="courseHeader"
                                    className="p-2 flex flex-row justify-center cursor-pointer"
                                    onClick={() => {
                                        if (room?.status === "in_progress") {
                                            handleJoinRoom(room._id)
                                        }
                                    }}
                                    disabled={room?.status === "in_progress" ? false : true}
                                >
                                    {t('OnlineLearning.Join')}
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center h-[300px]">
                        <Image
                            src={ImageErr}
                            alt="imageerr"
                            width={100}
                            height={100}
                            objectFit="cover"
                        />
                        <Text type="defaultSemiBold">
                            {t('OnlineLearning.descriptionClass')}
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
}
