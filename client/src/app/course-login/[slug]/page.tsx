"use client";
import VideoYoutubeComponment from "@/components/VideoYoutube/VideoYoutube";
import ButtonComponment from "@/components/Button/Button";
import { MessageCircleQuestion } from "lucide-react";
import { useParams } from "next/navigation";
import { useMutationHook } from "@/hooks";
import { GetDetailCourses } from "@/apis/course";
import { StartCourse, UpdateNote, UpdateUserCourse } from "@/apis/usercourse";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { totalVideo } from "@/redux/Slides/timeVideoSide";
import { useRouter } from "next/navigation";
import SheetMessage from "./sheetMessage";
import ModalNote from "./modalNote";
import BottomBar from "./bottomBar";
import CourseContent from "./courseContent";
export default function page() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [isNoteSheetOpen, setIsNoteSheetOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(false);
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

  const mutationUpdateNote = useMutationHook(async (data) => {
    try {
      const res = await UpdateNote(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  const handleUpdateNote = (data: string) => {
    const note = {
      time: timeVideo.time,
      content: data,
    };

    mutationUpdateNote.mutate({
      courseId: dataCourseDetail?._id,
      videoId: dataVideo?._id,
      notes: [...dataVideo?.notes, note],
    });
  };

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
              notes: userVideo?.notes,
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
      setDisableNextLesson(true);
    }
  };

  const handleOpenEditBlog = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleOpenChange = () => {
    setIsNoteSheetOpen((prev) => !prev);
  };

  return (
    <div className="mt-[40px]">
      <div className="flex ">
        <div className="w-[70%] ">
          <div className="bg-black pr-[20px] pl-[20px]">
            <VideoYoutubeComponment
              style={{
                width: "100%",
                height: "500px",
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
              Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính"
              xem F8 sắp có gì mới nhé!
            </div>
            <div>Fanpage: https://www.facebook.com/f8vnofficial</div>
          </div>
        </div>

        <CourseContent
          activeChapterIndex={activeChapterIndex}
          handleAccordionChange={handleAccordionChange}
          mergedChapters={mergedChapters}
          activeSlug={activeSlug}
          handleVideo={handleVideo}
        />

        <BottomBar
          disableNextLesson={disableNextLesson}
          handlePreviousLesson={handlePreviousLesson}
          handleNextLesson={handleNextLesson}
          dataChildName={dataVideo?.childname}
        />
        <ModalNote
          isOpen={isModalOpenEdit}
          setIsOpen={setIsModalOpenEdit}
          isNoteSheetOpen={isNoteSheetOpen}
          setIsNoteSheetOpen={setIsNoteSheetOpen}
          handleOpenChange={handleOpenChange}
          handleUpdateNote={handleUpdateNote}
        />
        <div className="fixed bottom-[60px] left-[60%] z-2 border-b p-3 flex  items-center">
          <ButtonComponment
            className=""
            style={{
              marginTop: "0",
              borderRadius: 10,
              display: "flex",
              gap: 4,
            }}
            onClick={() => setIsModalMessage(true)}
          >
            <MessageCircleQuestion />
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
    </div>
  );
}
