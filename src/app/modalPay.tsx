import React, { useEffect } from "react";
import ModalComponent from "@/components/Modal/Modal";
import VideoYoutubeComponment from "@/components/VideoYoutube/VideoYoutube";
import { formatCurrencyVND } from "@/utils";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import IconZaloPay from "@/assets/Images/Logo-ZaloPay-Square.png";
import IconQR from "@/assets/Images/qr.png";
import { useMutationHook } from "@/hooks";
import { CreateLinkPayOs, PaymentZalopay } from "@/apis/pay";
import { formatTime, parseTime } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setItemPay } from "@/redux/Slides/itemPay";
import Text from "@/components/Text/text";
import {useTranslation} from "react-i18next";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course: any;
}

export default function modalPay({ isOpen, setIsOpen, course }: Props) {
  const {t} = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const totalVideos =
    course?.chapters?.reduce((total: number, chapter: any) => {
      return total + chapter.videos.length;
    }, 0) || 0;

  const totalTime =
    course?.chapters?.reduce((total: number, chapter: any) => {
      return (
        total +
        chapter.videos.reduce((chapterTotal: number, video: any) => {
          return chapterTotal + parseTime(video.time);
        }, 0)
      );
    }, 0) || 0;

  const formattedTime = formatTime(totalTime);

  const mutationLinkOs = useMutationHook(async (data) => {
    try {
      const res = await CreateLinkPayOs(data);
      return res;
    } catch (err) {
      console.log("Failed to create link");
    }
  });

  const mutationLinkZaloPay = useMutationHook(async (data) => {
    try {
      const res = await PaymentZalopay(data);
      return res;
    } catch (err) {
      console.log("Failed to create link");
    }
  });

  const handPayOs = () => {
    mutationLinkOs.mutate({
      fullName: user.name,
      totalPrice: course.priceAmount,
      buyerEmail: user.email,
    });
    dispatch(setItemPay({ idPayCourse: course._id }));
  };

  const handZaloPay = () => {
    mutationLinkZaloPay.mutate({
      fullName: user.name,
      totalPrice: course.priceAmount,
      orderItem: {
        productId: course._id,
      },
    });
    dispatch(setItemPay({ idPayCourse: course._id }));
  };
  const { data: dataPayOs, isPending: isLoading } = mutationLinkOs;
  const { data: dataZaloPay, isPending: isLoadingZalo } = mutationLinkZaloPay;
  useEffect(() => {
    if (dataPayOs) {
      router.push(dataPayOs?.checkoutUrl);
    }
  }, [dataPayOs, router]);

  useEffect(() => {
    if (dataZaloPay?.return_code === 1) {
      router.push(dataZaloPay?.order_url);
    }
  }, [dataZaloPay, router]);
  return (
    <ModalComponent
      isOpen={isOpen}
      style="md:max-w-[1000px]"
      setIsOpen={setIsOpen}
      triggerContent={<></>}
      contentHeader={
        <>
          <div className="text-center cactus-classical-serif-md text-[25px]">
            {t('ModalPay.Title')}
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
              <Text type="subtitle" className="mb-1 ">
                {course?.name}
              </Text>
              <Text className="text-[#a2adbd]">
                {t('ModalPay.Price')}{" "}
                <span className="cactus-classical-serif-md text-[25px] font-bold text-[#000]">
                  {formatCurrencyVND(course?.priceAmount)}
                </span>
              </Text>
              <Text className="mb-7 ">
                {t('ModalPay.Description')}
              </Text>
              <Button
                className="w-full p-5 rounded-xl bg-slate-800 text-[#fff] cactus-classical-serif-md text-[18px] uppercase relative mb-3 hover:bg-slate-600"
                onClick={handZaloPay}
              >
                <Image
                  width={30}
                  height={30}
                  src={IconZaloPay}
                  className="absolute left-6"
                  alt="Zalopay"
                />
                <Text>{t('ModalPay.ZaloPay')}</Text>
              </Button>
              <Button
                className="w-full p-5 rounded-xl bg-slate-800 text-[#fff] cactus-classical-serif-md text-[18px] uppercase relative mb-3 hover:bg-slate-600"
                onClick={handPayOs}
              >
                <Image
                  width={30}
                  height={30}
                  src={IconQR}
                  className="absolute left-6 text-[#fff]"
                  alt="QR"
                />
                <Text>{t('ModalPay.QR')}</Text>
              </Button>
            </div>
          </div>
          <div className="mb-5 px-9">
            <Text className="cactus-classical-serif-md text-[20px] mb-4 ">
              {t('CourseNotLogin.WillLearn')}
            </Text>
            <div className="text-[15px] mb-7 flex justify-between ">
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
            <div className="cactus-classical-serif-md text-[20px] mb-4 ">
              {t('CourseNotLogin.CourseContent')}
            </div>
            <div className="flex justify-between mb-3">
              <div>
                {course?.chapters?.length} {t('CourseNotLogin.Chapter')} - {totalVideos} {t('CourseNotLogin.Lesson')} - {t('CourseNotLogin.Time')} {formattedTime}
              </div>
              <div className="cactus-classical-serif-md text-[14px]">
                {t('CourseNotLogin.All')}
              </div>
            </div>
            <div className="px-9">
              <Accordion type="single" collapsible className="w-full">
                {course?.chapters?.map((chapter: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{chapter.namechapter}</AccordionTrigger>
                    {chapter.videos.map((video: any, vidIndex: number) => (
                      <AccordionContent
                        key={vidIndex}
                        className="flex justify-between"
                      >
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
