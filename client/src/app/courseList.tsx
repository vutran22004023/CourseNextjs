// components/PageClient.tsx
'use client';

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDebounce } from '@/hooks/index';
import { useQuery } from '@tanstack/react-query';
import { GetAllCourses } from '@/apis/course';
import CardComponent from '@/components/Card/Card';
import LoadingCard from '@/components/Loading/LoadingCard';
import Link from 'next/link';
import { Course, DataAllCourses } from '@/types'; // Import type definitions
import {getTokenFromCookies} from '@/utils/auth'

const token = getTokenFromCookies()
const getAllCourses = async (search: string): Promise<DataAllCourses> => {
  const res = await GetAllCourses(search);
  return res;
};

const CourseList: FC<{ courses: Course[]; isLoading: boolean; user: any }> = ({ courses, isLoading, user }) => (
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
            <Link href={`/course-login/${course.slug}`}>
              <CardComponent course={course} />
            </Link>
          ) : (
            <Link href={`/course-not-login/${course.slug}`}>
              <CardComponent course={course} />
            </Link>
          )}
        </div>
      ))}
  </div>
);

const PageClient: FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const search = useSelector((state: RootState) => state.searchs);
  const searchDebounced = useDebounce(search.search, 500);

  const { data: dataAllCourses, isLoading: isLoadingAllCourses } = useQuery({
    queryKey: ["course", searchDebounced],
    queryFn: () => getAllCourses(searchDebounced),
  });

  const dataCourseFree = dataAllCourses?.data.filter(
    (course) => course.price === 'free'
  ) || [];

  const dataCoursePaid = dataAllCourses?.data.filter(
    (course) => course.price === 'paid'
  ) || [];

  return (
    <main>
      <div className="mb-5">
        <div className="cactus-classical-serif-md text-[25px]">Khóa học Pro</div>
        <CourseList courses={dataCoursePaid} isLoading={isLoadingAllCourses} user={user} />
      </div>

      <div className="">
        <div className="cactus-classical-serif-md text-[25px]">Khóa học free</div>
        <CourseList courses={dataCourseFree} isLoading={isLoadingAllCourses} user={user} />
      </div>
    </main>
  );
};

export default PageClient;
