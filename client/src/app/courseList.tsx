"use client";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDebounce } from "@/hooks/index";
import { useQuery } from "@tanstack/react-query";
import { GetAllCourses } from "@/apis/course";
import CardComponent from "@/components/Card/Card";
import LoadingCard from "@/components/Loading/LoadingCard";
import Link from "next/link";
import { Course, DataAllCourses } from "@/types"; // Import type definitions
import { getTokenFromCookies } from "@/utils/auth";
import ModalPay from "./modalPay";
import Text from "@/components/Text/text";

const token = getTokenFromCookies();
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

  const handleIsModal = (course: Course) => {
    setIsOpenModal(true);
    setSelectedCourse(course);
  };
  useEffect(() => {
    if (isOpenModal === false) {
      setSelectedCourse(null);
    }
  }, [isOpenModal]);
  return (
    <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-3 mt-3 md:gap-4">
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-none w-full md:w-auto">
              <LoadingCard />
            </div>
          ))
        : courses.map((course) => (
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

  const { data: dataAllCourses, isLoading: isLoadingAllCourses } = useQuery({
    queryKey: ["course", searchDebounced],
    queryFn: () => getAllCourses(searchDebounced),
  });

  const dataCourseFree =
    dataAllCourses?.data.filter((course) => course.price === "free") || [];

  const dataCoursePaid =
    dataAllCourses?.data.filter((course) => course.price === "paid") || [];

  return (
    <main>
      <div className="mb-5">
        <Text type="subtitle" className="text-[25px]">
          Khóa học Pro
        </Text>
        <CourseList
          courses={dataCoursePaid}
          isLoading={isLoadingAllCourses}
          user={user}
        />
      </div>

      <div className="">
        <Text type="subtitle" className="text-[25px]">
          Khóa học free
        </Text>
        <CourseList
          courses={dataCourseFree}
          isLoading={isLoadingAllCourses}
          user={user}
        />
      </div>
    </main>
  );
};

export default PageClient;
