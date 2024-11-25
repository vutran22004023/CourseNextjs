"use client";
import { CircleCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoYoutubeComponment from "@/components/VideoYoutube/VideoYoutube";
import { useParams } from "next/navigation";
import { useMutationHook } from "@/hooks";
import { GetDetailCoursesNotLogin } from "@/apis/course";
import React, { useEffect, useState } from "react";
import Login_RegisterComponent from "@/components/Login-Register/Login";
import Text from "@/components/Text/text";
import {useTranslation} from "react-i18next";

export default function CoursesNotLogin() {
  const {t} = useTranslation('common');
  const [dataCourseDetail, setDataCourseDetail] = useState<any>();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const { slug } = useParams<any>();
  const parseTime = (time: string) => {
    const timeArray = time?.split(":").map(Number);
    if(timeArray?.length === 0) return 0;
    switch (timeArray.length) {
      case 3: {
        const [hh, mm, ss] = timeArray;
        return hh * 3600 + mm * 60 + ss;
      }
      case 2: {
        const [mm, ss] = timeArray;
        return mm * 60 + ss;
      }
      case 1:
        return timeArray[0];
      default:
        return 0;
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours) {
      return `${hours} giờ ${minutes} phút ${seconds} giây`;
    } else if (minutes) {
      return `${minutes} phút ${seconds} giây`;
    } else if (seconds) {
      return `${seconds} giây`;
    } else {
      return "";
    }
  };

  const mutationGetDetailCourse = useMutationHook(async (slug: string) => {
    try {
      const res = await GetDetailCoursesNotLogin(slug);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    mutationGetDetailCourse.mutate(slug, {
      onSuccess: (data) => {
        setDataCourseDetail(data);
        setIsLoadingDetail(false);
      },
      onError: () => {
        setIsLoadingDetail(false);
      },
    });
  }, [slug]);

  // Tính tổng số video và tổng thời gian
  const totalVideos =
    dataCourseDetail?.chapters?.reduce((total: number, chapter: any) => {
      return total + chapter.videos.length;
    }, 0) || 0;

  const totalTime =
    dataCourseDetail?.chapters?.reduce((total: number, chapter: any) => {
      return (
        total +
        chapter.videos.reduce((chapterTotal: number, video: any) => {
          return chapterTotal + parseTime(video.time);
        }, 0)
      );
    }, 0) || 0;

  const formattedTime = formatTime(totalTime);
  useEffect(() => {
    document.title = dataCourseDetail?.name ? `${dataCourseDetail?.name} | Not Login CourseNiver` : "CourseNiver";
  }, [dataCourseDetail]);

  return (
    <div className="container mt-8 w-full">
      <div className="flex">
        <div className="w-[60%] p-5">
          <div className="mb-5">
            <Text type="header" className="mb-1">
              {dataCourseDetail?.name}
            </Text>
            <Text className="mb-7">
              Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
              Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
            </Text>
          </div>

          <div className="mb-5">
            <Text type="subtitle" className="mb-4 ">
              {t('CourseNotLogin.WillLearn')}
            </Text>
            <div className="text-[15px] mb-7 flex justify-between">
              <div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
              </div>

              <div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <Text>Hiểu chi tiết về các khái niệm cơ bản trong JS</Text>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <Text type="subtitle" className="mb-4">
              {t('CourseNotLogin.CourseContent')}
            </Text>
            <div className="flex justify-between mb-3">
              <Text>
                {dataCourseDetail?.chapters?.length} {t('CourseNotLogin.Chapter')} - {totalVideos} {t('CourseNotLogin.Lesson')} - {t('CourseNotLogin.Time')} {formattedTime}
              </Text>
              <Text className="text-[14px]">{t('CourseNotLogin.All')}</Text>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {dataCourseDetail?.chapters?.map(
                  (chapter: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{chapter.namechapter}</AccordionTrigger>
                      {chapter.videos.map((video: any, vidIndex: number) => (
                        <AccordionContent
                          key={vidIndex}
                          className="flex justify-between"
                        >
                          <Text>{video.childname}</Text>
                          <Text>{video.time}</Text>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </div>
          </div>

          <div className="mb-5">
            <Text className="text-[20px] mb-4 ">{t('CourseNotLogin.Request')}</Text>
            <div className="flex mb-1">
              <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
              <Text className="text-[14px]">
                {t('CourseNotLogin.Device')}
              </Text>
            </div>
          </div>
        </div>
        <div className="flex-1  p-5 items-center">
          <div className="w-full flex justify-center mb-3">
            <VideoYoutubeComponment
              style={{ width: "400px", height: "200px", borderRadius: "20px" }}
              src={dataCourseDetail?.video}
              title="YouTube video player"
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="cactus-classical-serif-md text-[25px]">
              {dataCourseDetail?.price === "free" ? "Miễn phí" : "Trả phí"}
            </div>
          </div>
          <div className="w-full flex justify-center mt-3">
            <Login_RegisterComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
