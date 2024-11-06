"use client";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import CardComponentBlog from "@/components/Card/CardBlog";
import Text from "@/components/Text/text";
import { Users } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CourseProgress } from "@/types";
import { useEffect, useState } from "react";
import CardHistory from "@/components/Card/CardHistory";
import { getTokenFromCookies } from "@/utils/auth";
import { GetCourseProgress } from "@/apis/usercourse";

export default function PersonalPage() {
  const { t } = useTranslation("common");
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [token, setToken] = useState<any>();

  useEffect(() => {
    const gettoken = async () => {
      const tokens = await getTokenFromCookies();
      setToken(tokens);
    };
    gettoken();
  }, []);
  useEffect(() => {
    GetCourseProgress()
      .then((res) => {
        setCourseProgress(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);


  return (
    <div className="container w-full" style={{ padding: "0 90px" }}>
      <div className="min-h-screen bg-gray-100">
        <div className="relative w-full h-64">
          <Image
            src={Anh1}
            alt="Header"
            className="w-full h-full object-cover rounded-b-2xl"
          />
        </div>
        <div className="container mx-auto p-4 flex justify-center">
          <div className="relative flex flex-col items-center bg-white p-4 rounded-lg shadow mt-2 ">
            <div className="absolute -top-[120px]  ">
              <Text className="w-32 h-32 bg-slate-500 text-white flex items-center justify-center rounded-full text-3xl font-bold ">
                Vũ
              </Text>
            </div>
            <div className=" text-center ">
              <Text className="text-lg font-bold">{user.name}</Text>
            </div>
          </div>
        </div>

        <div className="mt-1 p-5 flex justify-between w-full">
          <div className="w-[300px] mr-3">
            <CardComponentBlog>
              <Text className="cactus-classical-serif-md text-[16px]  mb-3">
                {t("Profile.Introduce")}
              </Text>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <Text className="ml-1">
                  {t("Profile.TimeJoin")} 2 năm trước
                </Text>
              </p>
            </CardComponentBlog>

            <CardComponentBlog>
              <Text className="cactus-classical-serif-md text-[16px]  mb-3">
                {t("Profile.Recent")}
              </Text>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <Text className="ml-1">{t("Profile.DescRecent")}</Text>
              </p>
            </CardComponentBlog>
          </div>
          <div className="flex-1">
            <CardComponentBlog>
              <h2 className="cactus-classical-serif-md text-[16px] mb-3 ">
                {t("Profile.Course")}
              </h2>
              {token && user.status === true ? (
                <>
                  <div className="overflow-y-auto flex-grow">
                    {courseProgress.length > 0 &&
                      courseProgress
                        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                        .map((item) => (
                          <CardHistory key={item._id} data={item} />
                        ))}
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </CardComponentBlog>
          </div>
        </div>
      </div>
    </div>
  );
}
