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
const tokenAtom = atom<string | null>(null);

export const useAtoms = () => {
  const [courseDetail, setCourseDetail] = useAtom(dataIdCourse);
  const [token, setToken] = useAtom(tokenAtom);
  return {
    courseDetail,
    setCourseDetail,
      token,
      setToken
  };
};
