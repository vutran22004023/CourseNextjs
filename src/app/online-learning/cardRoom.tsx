"use client";
import React from "react";
import Text from "@/components/Text/text";
import ImageErr from "@/assets/Images/image.png";
import Image from "next/image";
import { ShowUserTeacherRoom, ShowUserStudentRoom } from "@/apis/videoSDK";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CalendarClock, CalendarCheck2, CalendarCog } from "lucide-react";
import Button from "@/components/Button/Button";
import { formatDateRoom } from "@/utils";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
}
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
export default function cardRoom({ title }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const { data: dataRoom, isPending: isLoadingMessage } = useQuery({
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

  const handleJoinRoom  = (roomId: string) => {
    router.push(`/online-learning/${roomId}`);
  }
  return (
    <>
      <Text type="subtitle" className="mb-2">
        {title}
      </Text>
      {dataRoom?.status === 200 ? (
        <div className="w-full flex flex-nowrap md:grid md:grid-cols-4 gap-2 mb-3 pt-10 md:gap-4 overflow-x-auto">
          {dataRoom?.data?.rooms?.map((room: any) => (
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
                  <CalendarClock size={20} color="#000" />
                </div>
                <Text>{formatDateRoom(room?.startTime)}</Text>
              </div>
              <div className="w-[2px] h-6 bg-black ml-[15px] mb-1"></div>
              <div className="flex gap-2 mb-2 items-center">
                <div className="rounded-full p-1 border-[#000] border-2 items-center">
                  <CalendarCheck2 size={20} color="#000" />
                </div>
                <Text>{formatDateRoom(room?.startTime)}</Text>
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <div className="rounded-full p-1 border-[#000] border-2 items-center">
                  <CalendarCog size={20} color="#000" />
                </div>
                <Text>{room?.status}</Text>
              </div>
              <Button
                type="courseHeader"
                className="p-2 flex flex-row justify-center mb-2 cursor-pointer"
              >
                Xem chi tiết
              </Button>
              <Button
                type="courseHeader"
                className="p-2 flex flex-row justify-center cursor-pointer"
                onClick={() => handleJoinRoom(room._id)}
              >
                Tham gia ngay
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
            Hiện tại không có cuộc họp nào đang diễn ra
          </Text>
        </div>
      )}
    </>
  );
}
