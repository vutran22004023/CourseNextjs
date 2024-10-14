// useSharedData.js
import { atom, useAtom } from 'jotai';

interface IdCourse {
    courseId: any;
    videoID: any;
}

const dataIdCourse = atom<IdCourse>({
    courseId: null,
    videoID: null
  });

export const useAtoms = () => {
  const [courseDetail, setCourseDetail] = useAtom(dataIdCourse);

  return {
    courseDetail,
    setCourseDetail
  };
};
