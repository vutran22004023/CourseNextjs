"use client";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Crown } from "lucide-react";
import { useDebounce } from "@/hooks";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetAllCourses, GetDetailCoursesNotLogin } from "@/apis/course";
import { GetAllBlogs } from "@/apis/blog";
import CardComponent from "@/components/Card/Card";
import LoadingCard from "@/components/Loading/LoadingCard";
import Link from "next/link";
import { Course, DataAllCourses, Blog } from "@/types"; // Import type definitions
import { getTokenFromCookies } from "@/utils/auth";
import ModalPay from "./modalPay";
import Text from "@/components/Text/text";
import { useRouter } from "next/navigation";
import { CheckPaidCourse } from "@/apis/pay";
import { useTranslation } from "react-i18next";

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

const BlogList: FC<{ user: any }> = ({ user }) => {
  const { t } = useTranslation("common");
  const [token, setToken] = useState<string>("");
  const [blogs, setBlogs] = useState<any>([]);
  console.log(blogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await GetAllBlogs(""); // Fetch blogs with empty search
        console.log("Fetched blogs data:", data); // Debug: Log the response
        setBlogs(data.data);
      } catch (error) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-2 mb-3 md:gap-4  ">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-none w-full md:w-auto">
              <LoadingCard />
            </div>
          ))
        : blogs.map((blog: any) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              className=" w-full mb-3 rounded-xl border-[2px] relative flex-none md:w-auto"
            >
              <div className="bg-black rounded-t-xl">
                <Image
                  src={blog.image}
                  width={600}
                  height={300}
                  alt="blogimg"
                  className="w-full h-[190px] mr-[20px] rounded-xl object-fill"
                />
              </div>
              <div className="p-2">
                <p className="font-medium text-[16px] truncate mb-1">{blog.title}</p>
                <div className="flex items-center ">
                  <Image
                    src={blog.image}
                    width={600}
                    height={300}
                    alt="logouser"
                    className="w-[40px] h-[40px] mr-[10px] rounded-full"
                  />
                  <div>
                    <p>{blog.author}</p>
                    <p className="leading-4 opacity-60">{blog.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

const PageClient: FC = () => {
  const { t } = useTranslation("common");
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
          {t("CourseList.Title")}
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
        <div className="mt-3 rounded-xl border-2 shadow-xl p-3">
          <Text type="defaultSemiBold">{t("CourseList.Foundation")}</Text>
          <CourseList
            courses={dataCoursePaid}
            isLoading={isLoadingAllCourses}
            user={user}
          />
        </div>
      </div>

      <div className="">
        <Text type="subtitle" className="w-[170px] mb-7">
          {t("CourseList.Title2")}
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
        <div className="mt-3 rounded-xl border-2 shadow-xl p-3">
          <Text type="defaultSemiBold">{t("CourseList.Foundation")}</Text>
          <CourseList
            courses={dataCourseFree}
            isLoading={isLoadingAllCourses}
            user={user}
          />
        </div>
      </div>
      <div className="mt-8">
        <Text type="subtitle" className="w-[200px] relative gap-2 mb-7">
          {t("pagesBlog.Post")}
        </Text>
        <div className="mt-3 rounded-xl border-2 shadow-xl p-3">
          <BlogList user={user} />
        </div>
      </div>
    </main>
  );
};

export default PageClient;
