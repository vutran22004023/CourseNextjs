'use client'
import { CircleCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoYoutubeComponment from '@/components/VideoYoutube/VideoYoutube'
import {useParams} from 'next/navigation'
import { useMutationHook } from "@/hooks";
import {GetDetailCourses} from '@/apis/course'
import React,{ useEffect, useState } from "react";
import Login_RegisterComponent from '@/components/Login-Register/Login'
export default function CoursesNotLogin() {
  const [dataCourseDetail, setDataCourseDetail] = useState();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const {slug} = useParams();
  const parseTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} giờ ${minutes} phút`;
  };

  const mutationGetDetailCourse = useMutationHook(async (slug: any) => {
    try {
      const res = await GetDetailCourses(slug);
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
   const totalVideos = dataCourseDetail?.chapters?.reduce((total: number, chapter: any) => {
    return total + chapter.videos.length;
  }, 0) || 0;

  const totalTime = dataCourseDetail?.chapters?.reduce((total: number, chapter: any) => {
    return total + chapter.videos.reduce((chapterTotal: number, video: any) => {
      return chapterTotal + parseTime(video.time);
    }, 0);
  }, 0) || 0;

  const formattedTime = formatTime(totalTime);
   return (
     <div className="container mt-8 w-full">
       <div className="flex">
         <div className="w-[60%] p-5">
           <div className="mb-5">
             <div className="cactus-classical-serif-md text-[25px] mb-1 ">
               {dataCourseDetail?.name}
             </div>
             <div className="text-[15px] mb-7 ">
               Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
               Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
             </div>
           </div>

           <div className="mb-5">
             <div className="cactus-classical-serif-md text-[20px] mb-4 ">
               Bạn sẽ học được gì?
             </div>
             <div className="text-[15px] mb-7 flex justify-between">
               <div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
               </div>

               <div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
                 <div className="flex mb-1">
                   <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                   <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                 </div>
               </div>
             </div>
           </div>

           <div className="mb-5">
             <div className="cactus-classical-serif-md text-[20px] mb-4 ">
               Nội dung khóa học
             </div>
             <div className="flex justify-between mb-3">
               <div>
                 {dataCourseDetail?.chapters?.length} chương - {totalVideos} bài
                 học - Thời lượng {formattedTime}
               </div>
               <div className="cactus-classical-serif-md text-[14px]">
                 Mở rộng tất cả
               </div>
             </div>
             <div>
             <Accordion type="single" collapsible className="w-full">
                {dataCourseDetail?.chapters?.map((chapter: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{chapter.namechapter}</AccordionTrigger>
                    {chapter.videos.map((video: any, vidIndex: number) => (
                      <AccordionContent key={vidIndex} className="flex justify-between">
                        <div>{video.childname}</div>
                        <div>{video.time}</div>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                ))}
              </Accordion>
             </div>
           </div>

           <div className="mb-5">
             <div className="cactus-classical-serif-md text-[20px] mb-4 ">
               Yêu cầu
             </div>

             <div className="flex mb-1">
               <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
               <div className="text-[14px]">
                 Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)
               </div>
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
               {dataCourseDetail?.price === 'free' ? 'Miễn phí' : 'Trả phí'}
             </div>
           </div>
           <div className="w-full flex justify-center mt-3">
             <Login_RegisterComponent/>
           </div>
         </div>
       </div>
     </div>
   );
}
