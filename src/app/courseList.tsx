"use client";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Crown } from "lucide-react";
import { useDebounce } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { GetAllCourses, GetDetailCoursesNotLogin } from "@/apis/course";
import CardComponent from "@/components/Card/Card";
import LoadingCard from "@/components/Loading/LoadingCard";
import Link from "next/link";
import { Course, DataAllCourses } from "@/types"; // Import type definitions
import { getTokenFromCookies } from "@/utils/auth";
import ModalPay from "./modalPay";
import Text from "@/components/Text/text";
import { useRouter } from "next/navigation";
import { CheckPaidCourse } from "@/apis/pay";

const getAllCourses = async (search: string): Promise<DataAllCourses> => {
  const res = await GetAllCourses(search);
  return res;
};

const CourseList: FC<{ courses: Course[]; isLoading: boolean; user: any }> = ({
  courses,
  isLoading,
  user,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const handleIsModal = (course: Course) => {
    CheckPaidCourse(course._id)
      .then(() => {
        router.push(`/course-login/${course.slug}`);
      })
      .catch(() => {
        GetDetailCoursesNotLogin(course.slug).then((res) => {
          setSelectedCourse(res.data);
          setIsOpenModal(true);
        });
      });
  };
  useEffect(() => {
    if (isOpenModal === false) {
      setSelectedCourse(null);
    }
  }, [isOpenModal]);
  useEffect(() => {
    const token = async () => {
      try {
        const tokens = await getTokenFromCookies();
        setToken(tokens as string);
      } catch (err) {
        console.log(err);
      }
    };
    token();
  }, []);

  return (
    <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-2 mb-3 pt-10 md:gap-4 overflow-x-auto ">
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-none w-full md:w-auto">
              <LoadingCard />
            </div>
          ))
        : courses.map((course: Course) => (
            <div key={course._id} className="flex-none w-full md:w-auto">
              {token && user?.status === true ? (
                <>
                  {course.price === "paid" ? (
                    <div
                      onClick={() => handleIsModal(course)}
                      className="cursor-pointer"
                    >
                      <CardComponent course={course} />
                    </div>
                  ) : (
                    <Link href={`/course-login/${course.slug}`}>
                      <CardComponent course={course} />
                    </Link>
                  )}
                </>
              ) : (
                <Link href={`/course-not-login/${course.slug}`}>
                  <CardComponent course={course} />
                </Link>
              )}
            </div>
          ))}
      {selectedCourse && (
        <ModalPay
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

const PageClient: FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const search = useSelector((state: RootState) => state.searchs);
  const searchDebounced = useDebounce(search.search, 500);
  const [activeTab, setActiveTab] = useState("Html/Css");
  const tabs = ["Html/Css", "Javascript", "Reactjs", "Database"];

  const { data: dataAllCourses, isLoading: isLoadingAllCourses } = useQuery({
    queryKey: ["course", searchDebounced],
    queryFn: () => getAllCourses(searchDebounced as any),
  });

  const dataCourseFree =
    dataAllCourses?.data.filter((course) => course.price === "free") || [];

  const dataCoursePaid =
    dataAllCourses?.data.filter((course) => course.price === "paid") || [];

  return (
    <main>
      <div className="mb-[60px]">
        <Text type="subtitle" className="w-[170px] relative gap-2 mb-7">
          Khóa học Pro
          <Crown className="absolute text-yellow-400 top-[-10px] right-[-5px]" />
        </Text>
        <div className="flex gap-4 mt-5">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center cursor-pointer"
            >
              <span
                className={`text-lg ${activeTab === tab ? "font-bold" : ""}`}
              >
                {tab}
              </span>
              {activeTab === tab && (
                <div className="h-1 bg-orange-500 w-full mt-1"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border-2 border-[#000] p-3">
          <Text type="defaultSemiBold">Nền tảng cơ bản cho phát triên web</Text>
          <div className="p-2 bg-[#FF5A00] w-[180px] rounded-xl border-2 border-[#000] mt-2">
            <Text type="defaultSemiBold" className="text-white">
              Khám phá HTML/Css
            </Text>
          </div>
          <CourseList
            courses={dataCoursePaid}
            isLoading={isLoadingAllCourses}
            user={user}
          />
        </div>
      </div>

      <div className="">
        <Text type="subtitle" className="w-[170px] mb-7">
          Khóa học free
        </Text>
        <div className="flex gap-4 mt-5">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center cursor-pointer"
            >
              <span
                className={`text-lg ${activeTab === tab ? "font-bold" : ""}`}
              >
                {tab}
              </span>
              {activeTab === tab && (
                <div className="h-1 bg-orange-500 w-full mt-1"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border-2 border-[#000] p-3">
          <Text type="defaultSemiBold">Nền tảng cơ bản cho phát triên web</Text>
          <div className="p-2 bg-[#FF5A00] w-[180px] rounded-xl border-2 border-[#000] mt-2">
            <Text type="defaultSemiBold" className="text-white">
              Khám phá HTML/Css
            </Text>
          </div>
          <CourseList
            courses={dataCourseFree}
            isLoading={isLoadingAllCourses}
            user={user}
          />
        </div>
      </div>
    </main>
  );
};

export default PageClient;
