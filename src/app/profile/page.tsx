'use client'    
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import CardComponentBlog from "@/components/Card/CardBlog";
import Text from "@/components/Text/text";
import { Users } from "lucide-react";
import Image from "next/image";
import {useTranslation} from "react-i18next";

export default function PersonalPage() {
  const {t} = useTranslation('common');
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
              <Text className="text-lg font-bold">Lê Vũ</Text>
            </div>
          </div>
        </div>

        <div className="mt-1 p-5 flex justify-between w-full">
          <div className="w-[300px] mr-3">
            <CardComponentBlog>
              <Text className="cactus-classical-serif-md text-[16px]  mb-3">
                {t('Profile.Introduce')}
              </Text>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <Text className="ml-1">
                  {t('Profile.TimeJoin')} 2 năm trước
                </Text>
              </p>
            </CardComponentBlog>

            <CardComponentBlog>
              <Text className="cactus-classical-serif-md text-[16px]  mb-3">
                {t('Profile.Recent')}
              </Text>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <Text className="ml-1">{t('Profile.DescRecent')}</Text>
              </p>
            </CardComponentBlog>
          </div>
          <div className="flex-1">
            <CardComponentBlog>
              <h2 className="cactus-classical-serif-md text-[16px] mb-3 ">
                {t('Profile.Course')}
              </h2>
              <div className="flex justify-between ">
                <div>
                  <Image
                    src={Anh1}
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "10px" }}
                    alt="Anh"
                  />
                </div>
                <div className="w-150px ml-2">
                  <Text>Node & ExpressJS</Text>
                  <Text>
                    Học Back-end với Node & ExpressJS framework, hiểu các khái
                    niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                  </Text>
                </div>
              </div>
              <hr style={{ margin: "10px 0" }} />
              <div className="flex justify-between ">
                <div>
                  <Image
                    src={Anh1}
                    className="w-[200px] h-[100px] "
                    style={{ borderRadius: "10px" }}
                    alt="anh"
                  />
                </div>
                <div className="w-150px ml-2">
                  <Text>Node & ExpressJS</Text>
                  <Text>
                    Học Back-end với Node & ExpressJS framework, hiểu các khái
                    niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                  </Text>
                </div>
              </div>

              <hr style={{ margin: "10px 0" }} />
              <div className="flex justify-between ">
                <div>
                  <Image
                    src={Anh1}
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "10px" }}
                    alt="anh"
                  />
                </div>
                <div className="w-150px ml-2">
                  <Text>Node & ExpressJS</Text>
                  <Text>
                    Học Back-end với Node & ExpressJS framework, hiểu các khái
                    niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                  </Text>
                </div>
              </div>

              <hr style={{ margin: "10px 0" }} />
              <div className="flex justify-between ">
                <div>
                  <Image
                    src={Anh1}
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "10px" }}
                    alt="anh"
                  />
                </div>
                <div className="w-150px ml-2">
                  <Text>Node & ExpressJS</Text>
                  <Text>
                    Học Back-end với Node & ExpressJS framework, hiểu các khái
                    niệm khi làm Back-end và xây dựng RESTful API cho trang web.
                  </Text>
                </div>
              </div>
            </CardComponentBlog>
          </div>
        </div>
      </div>
    </div>
  );
}
