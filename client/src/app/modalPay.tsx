import React from 'react'
import ModalComponent from '@/components/Modal/Modal'
import VideoYoutubeComponment from '@/components/VideoYoutube/VideoYoutube'
import {formatCurrencyVND} from '@/utils/index'
import { Button } from '@/components/ui/button';
import { CircleCheckBig } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void;
    course: any;
}
export default function modalPay({isOpen,setIsOpen,course}: Props) {

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours} giờ ${minutes} phút`;
      };
    const parseTime = (time: string) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
      };
    const totalVideos = course?.chapters?.reduce((total: number, chapter: any) => {
        return total + chapter.videos.length;
      }, 0) || 0;
    
      const totalTime = course?.chapters?.reduce((total: number, chapter: any) => {
        return total + chapter.videos.reduce((chapterTotal: number, video: any) => {
          return chapterTotal + parseTime(video.time);
        }, 0);
      }, 0) || 0;
      
  const formattedTime = formatTime(totalTime);
  return (
    <ModalComponent
      isOpen={isOpen}
      style="md:max-w-[1000px]"
      setIsOpen={setIsOpen}
      triggerContent={<></>}
      contentHeader={
        <>
          <div className="text-center cactus-classical-serif-md text-[25px]">
            Mở khóa toàn bộ khóa học
          </div>
        </>
      }
      contentBody={
        <div className="h-[500px] overflow-y-auto">
          <div className="p-5 flex gap-5">
          <VideoYoutubeComponment
               style={{ width: "450px", height: "300px", borderRadius: "20px" }}
               src={course?.video}
               title="YouTube video player"
             />
            <div>
                <div className="cactus-classical-serif-md text-[25px] mb-1 ">
                {course?.name}
                </div>
                <div className="text-[#a2adbd]">Giá bán: <span className="cactus-classical-serif-md text-[25px] font-bold text-[#000]">{formatCurrencyVND(course?.priceAmount)}</span></div>
                <div className="text-[15px] mb-7 ">
                    Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
                    Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
                </div>
                <Button className='w-full p-5 rounded-xl bg-slate-800 text-[#fff] cactus-classical-serif-md text-[18px] uppercase'>Lấy thông tin thanh toán</Button>
            </div>
          </div>
          <div className="mb-5 px-9">
             <div className="cactus-classical-serif-md text-[20px] mb-4 ">
               Bạn sẽ học được gì?
             </div>
             <div className="text-[15px] mb-7 flex justify-between ">
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
                 {course?.chapters?.length} chương - {totalVideos} bài
                 học - Thời lượng {formattedTime}
               </div>
               <div className="cactus-classical-serif-md text-[14px]">
                 Mở rộng tất cả
               </div>
             </div>
             <div className='px-9'>
             <Accordion type="single" collapsible className="w-full">
                {course?.chapters?.map((chapter: any, index: number) => (
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
        </div>
      }
      contentFooter={<></>}
    />
  );
}
