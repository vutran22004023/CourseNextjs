"use client";
import VideoYoutubeComponment from "@/components/VideoYoutube/VideoYoutube";
import ButtonComponment from "@/components/Button/Button";
import { NotebookPen, MessagesSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useMutationHook } from "@/hooks";
import { GetDetailCourses } from "@/apis/course";
import { StartCourse, UpdateUserCourse } from "@/apis/usercourse";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Progress } from "antd";
import { totalVideo } from "@/redux/Slides/timeVideoSide";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/navigation";
import SheetMessage from "./sheetMessage";
import BottomBar from "./bottomBar";
import CourseContent from "./courseContent";
import { formatDate } from "@/utils";
import useWindowSize from "@/hooks/useScreenWindow";
import CreateNote from "./createNote";
import { useAtoms } from "@/hooks/useAtom";
import Quiz from './quiz'
export default function page() {
  const { setCourseDetail } = useAtoms();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [navbarRight, setNavbarRight] = useState<boolean>(true);
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  const user = useSelector((state: RootState) => state.user);
  if (!user.id || !user.email || !user.status) return router.push("/");
  const [dataCourseDetail, setDataCourseDetail] = useState<any>();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [dataVideo, setDataVideo] = useState<any>();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(
    null
  );
  const [playbackTime, setPlaybackTime] = useState<number>(0); // New state for tracking playback time
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [disableNextLesson, setDisableNextLesson] = useState<any>();
  const initialActiveVideoRef = useRef<any>(null);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(false);
  const { width: WIDTH_WINDOW } = useWindowSize();
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
      const res = await StartCourse({
        userId: user.id,
        courseId: dataCourseDetail?._id,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutationUpdateCourse = useMutationHook(async (data) => {
    try {
      const res = await UpdateUserCourse(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

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
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      const roundedPercentage = Math.round(percentage);
      dispatch(
        totalVideo({
          percentCourse: roundedPercentage,
          totalVideo: total,
          totalcompletedVideo: completed,
        })
      );
    }
  }, [dataStateCourses, dispatch]);

  useEffect(() => {
    if (dataCourseDetail) {
      setCourseDetail({
        courseId: dataCourseDetail?._id,
        videoID: dataVideo?._id,
      });
      document.title = dataCourseDetail?.name ? `${dataCourseDetail?.name} | CourseNiver` : "CourseNiver";
    }
  }, [dataCourseDetail, dataVideo]);

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
    const video = dataCourseDetail?.chapters
      ?.flatMap((chapter: any) => chapter.videos)
      .find((video: any) => video.slug === slug);
    setDataVideo(video);
    setActiveSlug(slug);
    setPlaybackTime(0);
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
  };

  const timeStringToSeconds = (timeString: any) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return 0;
    }
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    if (dataVideo?.time && timeVideo.isPlaying) {
      // Check if isPlaying is true
      const videoDurationInSeconds = timeStringToSeconds(dataVideo.time);
      const halfDuration = videoDurationInSeconds / 2;
      const incrementPlaybackTime = () => {
        setPlaybackTime((prevTime) => {
          const newTime = prevTime + 1;
          if (Math.abs(newTime - halfDuration) <= 1) {
            console.log("Thành công khóa học");
            mutationUpdateCourse.mutate({
              userId: user.id,
              courseId: dataCourseDetail?._id,
              videoId: dataVideo?._id,
            });
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

  const mergedChapters =
    dataCourseDetail?.chapters?.map((chapter: any) => {
      const userChapter = dataStateCourses?.chapters?.find((c: any) => {
        return c.chapterId === chapter._id;
      });
      if (userChapter) {
        return {
          ...chapter,
          videos: chapter.videos.map((video: any) => {
            const userVideo = userChapter.videos.find(
              (v: any) => v.videoId === video._id
            );
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
    if (
      mergedChapters &&
      mergedChapters.length > 0 &&
      !initialActiveVideoRef.current
    ) {
      let inProgressVideo = null;
      let chapterIndex = null;

      // Loop through each chapter to find the in-progress video
      for (let i = 0; i < mergedChapters.length; i++) {
        const chapter = mergedChapters[i];
        if (chapter.videos) {
          inProgressVideo = chapter.videos.find(
            (video: any) => video.status === "in_progress"
          );
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
    const chapterIndex = parseInt(value.split("-")[1]);
    setActiveChapterIndex(chapterIndex);
  };

  const handlePreviousLesson = () => {
    if (activeChapterIndex !== null && activeSlug !== null) {
      const currentChapter = mergedChapters[activeChapterIndex];
      const currentIndex = currentChapter.videos.findIndex(
        (video: any) => video.slug === activeSlug
      );

      if (currentIndex > 0) {
        const previousVideo = currentChapter.videos[currentIndex - 1];
        setActiveSlug(previousVideo.slug);
        setDataVideo(previousVideo);
        setDisableNextLesson(false);
      } else if (activeChapterIndex > 0) {
        const previousChapter = mergedChapters[activeChapterIndex - 1];
        const lastVideoOfPreviousChapter =
          previousChapter.videos[previousChapter.videos.length - 1];
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
      const currentIndex = currentChapter.videos.findIndex(
        (video: any) => video.slug === activeSlug
      );

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
    <div className="md:mt-[20px]">
      <div className="md:flex ">
        <div className={`w-full ${navbarRight ? "md:w-[70%]" : "md:w-full"}`}>
          {dataVideo?.videoType === "video" ? (
              <>
                <div className="bg-black pr-[20px] pl-[20px]">
                  {dataVideo?.video ? (
                      <VideoYoutubeComponment
                          style={{
                            width: "100%",
                            height: WIDTH_WINDOW <= 500 ? "250px" : "500px",
                          }}
                          src={dataVideo?.video}
                          title="YouTube video player"
                      />
                  ) : (
                      <div className="bg-black w-full h-[250px] md:h-[500px]"></div>
                  )}
                </div>
                <div className="p-5 md:p-10 md:mb-[60px]">
                  <div className="md:flex justify-between">
                    <div className="mb-1 flex">
                      <div>
                        <p className="font-semibold text-[25px]">
                          {dataVideo?.childname}
                        </p>
                        <div className="mb-3 md:mb-5">
                          Cập nhật: {formatDate(dataVideo?.updatedAt)}
                        </div>
                      </div>
                      <div>
                        <Progress
                            type="circle"
                            percent={timeVideo?.percentCourse || 0}
                            size={60}
                            className="block pt-[15px] pl-[50px] md:hidden"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <ButtonComponment
                          type="notesheet"
                          className="h-[43px] flex items-center px-3 select-none"
                          onClick={handleOpenEditBlog}
                      >
                        {" "}
                        <NotebookPen className="size-[20px] mr-1"/>
                        Thêm ghi chú
                      </ButtonComponment>
                      <ButtonComponment
                          type="notesheet"
                          className="h-[43px] flex items-center px-3 select-none"
                          onClick={() => setIsModalMessage(true)}
                      >
                        <MessagesSquare className="mr-1"/>
                        <div>Hỏi đáp</div>
                      </ButtonComponment>
                    </div>
                    <SheetMessage
                        isOpen={isModalMessage}
                        onOpenChange={() => setIsModalMessage(!isModalMessage)}
                        dataChapter={mergedChapters}
                        dataVideo={dataCourseDetail}
                        dataChapVideo={dataVideo}
                    />
                  </div>
                  <div className="mb-5">
                    Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính"
                    xem F8 sắp có gì mới nhé!
                  </div>
                  <div>Fanpage: https://www.facebook.com/f8vnofficial</div>
                </div>
              </>
          ) : (
            <Quiz dataVideo={dataVideo} mergedChapters={mergedChapters} dataCourseDetail={dataCourseDetail} mutationUpdateCourse={mutationUpdateCourse} userId={user.id}/>
          )}
        </div>
        <CSSTransition
            in={navbarRight}
            timeout={300}
            classNames="slide"
            unmountOnExit
        >
          <CourseContent
              activeChapterIndex={activeChapterIndex}
              handleAccordionChange={handleAccordionChange}
              mergedChapters={mergedChapters}
              activeSlug={activeSlug}
              handleVideo={handleVideo}
          />
        </CSSTransition>
        <BottomBar
            handlePreviousLesson={handlePreviousLesson}
            disableNextLesson={disableNextLesson}
            handleNextLesson={handleNextLesson}
            setNavbarRight={setNavbarRight}
            navbarRight={navbarRight}
        />
        <CSSTransition
            in={isModalOpenEdit}
            timeout={300}
            classNames="modal"
            unmountOnExit
        >
          <CreateNote
              setIsModalOpenEdit={setIsModalOpenEdit}
              timeVideo={timeVideo?.time}
              dataCourseDetail={dataCourseDetail}
              dataVideo={dataVideo}
              navbarRight={navbarRight}
          />
        </CSSTransition>
      </div>
    </div>
  );
}
