'use client'
import VideoYoutubeComponment from "@/components/VideoYoutube/VideoYoutube";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonComponment from "@/components/Button/Button";
import { ArrowBigLeft, ArrowBigRight, CircleCheck ,Lock   } from "lucide-react";
import {useParams} from 'next/navigation'
import { useMutationHook } from "@/hooks";
import { GetDetailCourses} from "@/apis/course";
import {StartCourse,UpdateUserCourse} from "@/apis/usercourse";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import {CheckCircleFilled} from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { totalVideo } from '@/redux/Slides/timeVideoSide';
import WordPost from "@/components/WordPost/wordPost";
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/navigation';
export default function page() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  const user = useSelector((state: RootState) => state.user);
  if(!user.id || !user.email || !user.status) return router.push('/');
  const [dataCourseDetail, setDataCourseDetail] = useState();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [dataVideo, setDataVideo] = useState()
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number>(0); // New state for tracking playback time
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [disableNextLesson,setDisableNextLesson] = useState<any>()
  const initialActiveVideoRef = useRef<any>(null); 
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  const mutationGetDetailCourse = useMutationHook(async (slug: any) => {
    try {
      const res = await GetDetailCourses(slug);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationStateCouses = async () => {
    try {
      const res = await StartCourse({userId:user.id,courseId: dataCourseDetail?._id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const mutationUpdateCourse = useMutationHook(async(data) => {
    try {
      const res = await UpdateUserCourse(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  })

  const { data: dataStateCourses, isPending: __isPendingState } = useQuery({
    queryKey: ["dataLUserCouse"],
    queryFn: mutationStateCouses,
    enabled: Boolean(user.id && dataCourseDetail?._id),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (dataStateCourses) {
      let total = 0;
      let completed = 0;
      dataStateCourses.chapters?.forEach((chapter: any) => {
        chapter.videos?.forEach((video: any) => {
          total += 1;
          if (video.status === "completed") {
            completed += 1;
          }
        });
      });

      // Tính phần trăm hoàn thành
      const percentage = (total > 0) ? (completed / total) * 100 : 0;
      const roundedPercentage = Math.round(percentage);
      dispatch(totalVideo({ percentCourse: roundedPercentage, totalVideo: total, totalcompletedVideo: completed }));
    }
  }, [dataStateCourses, dispatch]);

  

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
  const handleVideo = (slug: any) => {
    const video = dataCourseDetail?.chapters?.flatMap((chapter: any) => chapter.videos).find((video: any) => video.slug === slug);
    setDataVideo(video);
    setActiveSlug(slug);
    setPlaybackTime(0);
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
  }

  const timeStringToSeconds = (timeString: any) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return 0;
    }
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    if (dataVideo?.time && timeVideo.isPlaying) { // Check if isPlaying is true
      const videoDurationInSeconds = timeStringToSeconds(dataVideo.time);
      const halfDuration = videoDurationInSeconds / 2;
      const incrementPlaybackTime = () => {
        setPlaybackTime(prevTime => {
          const newTime = prevTime + 1;
          if (Math.abs(newTime - halfDuration) <= 1) {
            console.log('Thành công khóa học');
            mutationUpdateCourse.mutate({userId:user.id,courseId: dataCourseDetail?._id, videoId:dataVideo?._id })
          }
          return newTime;
        });
      };

      playbackIntervalRef.current = setInterval(incrementPlaybackTime, 1000);

      return () => {
        if (playbackIntervalRef.current) {
          clearInterval(playbackIntervalRef.current);
        }
      };
    } else {
      // Pause the playback if isPlaying is false or video data is not available
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    }
  }, [timeVideo.isPlaying, dataVideo]);



  const mergedChapters = dataCourseDetail?.chapters?.map((chapter: any) => {
    const userChapter = dataStateCourses?.chapters?.find((c:any) => {
      return c.chapterId === chapter._id
    });
    if (userChapter) {
      return {
        ...chapter,
        videos: chapter.videos.map((video: any) => {
          const userVideo = userChapter.videos.find((v: any) => v.videoId === video._id);
          return {
            ...video,
            status: userVideo?.status,
          };
        }),
      };
    }
    return chapter;
  }) || [];

  useEffect(() => {
    if (mergedChapters && mergedChapters.length > 0 && !initialActiveVideoRef.current) {
      let inProgressVideo = null;
      let chapterIndex = null;

      // Loop through each chapter to find the in-progress video
      for (let i = 0; i < mergedChapters.length; i++) {
        const chapter = mergedChapters[i];
        if (chapter.videos) {
          inProgressVideo = chapter.videos.find((video: any) => video.status === "in_progress");
          if (inProgressVideo) {
            chapterIndex = i;
            break; // Stop searching once the in-progress video is found
          }
        }
      }

      if (inProgressVideo) {
        initialActiveVideoRef.current = inProgressVideo; // Store the initially active video
        setDataVideo(inProgressVideo);
        setActiveSlug(inProgressVideo.slug);
        setActiveChapterIndex(chapterIndex); // Set the active chapter index
      }
    }
  }, [mergedChapters]);

  const handleAccordionChange = (value: string) => {
    const chapterIndex = parseInt(value.split('-')[1]);
    setActiveChapterIndex(chapterIndex);
  };

  const handlePreviousLesson = () => {
    if (activeChapterIndex !== null && activeSlug !== null) {
      const currentChapter = mergedChapters[activeChapterIndex];
      const currentIndex = currentChapter.videos.findIndex((video: any) => video.slug === activeSlug);
  
      if (currentIndex > 0) {
        const previousVideo = currentChapter.videos[currentIndex - 1];
        setActiveSlug(previousVideo.slug);
        setDataVideo(previousVideo);
        setDisableNextLesson(false);
      } else if (activeChapterIndex > 0) {
        const previousChapter = mergedChapters[activeChapterIndex - 1];
        const lastVideoOfPreviousChapter = previousChapter.videos[previousChapter.videos.length - 1];
        setActiveChapterIndex(activeChapterIndex - 1);
        setActiveSlug(lastVideoOfPreviousChapter.slug);
        setDataVideo(lastVideoOfPreviousChapter);
        setDisableNextLesson(false);
      }
    }
  };
  
  const handleNextLesson = () => {
    if (activeChapterIndex !== null && activeSlug !== null) {
      const currentChapter = mergedChapters[activeChapterIndex];
      const currentIndex = currentChapter.videos.findIndex((video: any) => video.slug === activeSlug);
  
      // Find the next playable video
      let nextVideoIndex = currentIndex + 1;
      while (nextVideoIndex < currentChapter.videos.length) {
        const nextVideo = currentChapter.videos[nextVideoIndex];
        if (nextVideo.status !== "not_started") {
          setActiveSlug(nextVideo.slug);
          setDataVideo(nextVideo);
          setDisableNextLesson(false); // Enable the button
          return; // Exit the function after setting the next playable video
        }
        nextVideoIndex++;
      }
  
      // If no playable video found in current chapter, move to next chapter
      if (activeChapterIndex < mergedChapters.length - 1) {
        let nextChapterIndex = activeChapterIndex + 1;
        while (nextChapterIndex < mergedChapters.length) {
          const nextChapter = mergedChapters[nextChapterIndex];
          const firstVideoOfNextChapter = nextChapter.videos[0];
          if (firstVideoOfNextChapter.status !== "not_started") {
            setActiveChapterIndex(nextChapterIndex);
            setActiveSlug(firstVideoOfNextChapter.slug);
            setDataVideo(firstVideoOfNextChapter);
            setDisableNextLesson(false); // Enable the button
            return; // Exit the function after setting the first playable video of next chapter
          }
          nextChapterIndex++;
        }
      }
  
      // If all next videos are not started, disable the button
      setDisableNextLesson(true);
    }
  };
  
  const handleOpenEditBlog = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  return (
    <div className='mt-[40px]'>
    <div className="flex ">
      <div className="w-[70%] ">
        <div className="bg-black pr-[20px] pl-[20px]">
          <VideoYoutubeComponment
            style={{
              width: "100%",
              height: "600px",
            }}
            src={dataVideo?.video}
            title="YouTube video player"
          />
        </div>
        <div className="p-10">
          <div className="flex justify-between">
            <div className="cactus-classical-serif-md mb-1 text-[25px]">
              {dataVideo?.childname}
            </div>
            <ButtonComponment
              className="p-5 w-[200px]"
              style={{ marginTop: "0", borderRadius: "10px" }}
              onClick={handleOpenEditBlog}
            >
              {" "}
              Thêm ghi chú
            </ButtonComponment>
          </div>
          <div className="mb-5">Cập nhật {dataVideo?.updatedAt}</div>
          <div className="mb-5">
            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem
            F8 sắp có gì mới nhé!
          </div>
          <div>Fanpage: https://www.facebook.com/f8vnofficial</div>
        </div>
      </div>
      <div className="flex-1 border-l-2 mt-4">
        <div className="cactus-classical-serif-md mb-3 p-2">
          Nội dung khóa học
        </div>
        <Accordion type="single" collapsible className="w-full" 
        value={activeChapterIndex !== null ? `item-${activeChapterIndex}` : undefined}
        onValueChange={handleAccordionChange}
        >
          {mergedChapters?.map((chapter: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="bg-slate-100 px-2 hover:bg-slate-200 ">
                {chapter.namechapter}
              </AccordionTrigger>
              {chapter.videos.map((video: any, vidIndex: number) => (
                <AccordionContent
                  key={vidIndex}
                  className={`flex justify-between p-3
                    ${video.slug === activeSlug ? "bg-slate-400" : ""}
                    ${
                      video.status === "not_started"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${
                      video.status === "not_started" ? "" : "hover:bg-slate-300"
                    }
                    ${video.status === "not_started" ? "bg-slate-200" : ""}
                    `}
                  onClick={() => {
                    if (video.status !== "not_started") {
                      handleVideo(video?.slug);
                    }
                  }}
                >
                  <div className="w-[80%] text-[14px]">
                    <div className="mb-1">{video.childname}</div>
                    <div>{video.time}</div>
                  </div>
                  <div className="w-[20%] justify-center items-center">
                    {video.status === "not_started" ? (
                      <div className="flex justify-between mr-3">
                        <div></div>
                        <Lock size="20"/>
                      </div>
                    ) : video.status === "completed" ? (
                      <div className="flex justify-between mr-3 text-center">
                        <div></div>
                          {/* <CircleCheck size="20" className="text-[#55c72b]" /> */}
                          <CheckCircleFilled  className="text-[#55c72b] text-[20px]" />
                      </div>
                    ) : (
                      []
                    )}
                  </div>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="fixed bottom-0 left-0 bg-[#dbdbdb] right-0 z-10 border-b p-3 flex  items-center">
        <div className="flex justify-center items-center w-full">
          <ButtonComponment
            className="w-[200px]"
            style={{ marginTop: "0", borderRadius: "10px", marginRight: "5px" }}
            onClick={handlePreviousLesson}
          >
            <ArrowBigLeft />
            BÀI TRƯỚC
          </ButtonComponment>
          <ButtonComponment
            className={`w-[200px] ${disableNextLesson ? "opacity-50 cursor-not-allowed " : ""}`}
            style={{ marginTop: "0", borderRadius: "10px" }}
            onClick={handleNextLesson}
          >
            BÀI TIẾP THEO
            <ArrowBigRight />
          </ButtonComponment>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-3 flex items-center">
          <div>{dataVideo?.childname}</div>
          <ButtonComponment
            className="ml-2 p-3 w-[50px]"
            style={{ marginTop: "0", borderRadius: "60%" }}
          >
            <ArrowBigRight />
          </ButtonComponment>
        </div>
      </div>
      <CSSTransition
        in={isModalOpenEdit}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
         <div className="fixed bottom-0 left-0 bg-[#f4f4f4] right-0 z-10 border-b p-5 w-[69.5%] h-[290px] border-t border-black">
          <div className="p-5 bg-[#fff] border  border-black rounded-xl h-[200px]">
            <WordPost/>
          </div>
          <div className="flex justify-between">
            <div ></div>
            <div className="flex mt-5">
            <ButtonComponment
            className="ml-2 p-3 w-[150px]"
            style={{ marginTop: "0", borderRadius: 10 }}
            onClick={() => setIsModalOpenEdit(false)}
          >
            Hủy bỏ
          </ButtonComponment>
          <ButtonComponment
            className="ml-2 p-3 w-[150px]"
            style={{ marginTop: "0", borderRadius: 10 }}
          >
            Tạo ghi chú
          </ButtonComponment>
            </div>
          </div>
      </div> 
      </CSSTransition>
    </div>
    </div>
  )
}
