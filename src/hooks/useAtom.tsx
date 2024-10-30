// useSharedData.js
import { atom, useAtom } from 'jotai';

interface IdCourse {
    courseId: any;
    videoID: any;
}
interface Page {
    logo: string;
    logoSmall: string;
}

const dataIdCourse = atom<IdCourse>({
    courseId: null,
    videoID: null
  });
const page = atom<Page>({
    logo: "",
    logoSmall: ""
});
const tokenAtom = atom<string | null>(null);

export const useAtoms = () => {
  const [courseDetail, setCourseDetail] = useAtom(dataIdCourse);
  const [token, setToken] = useAtom(tokenAtom);
  const [pages, setPages] = useAtom(page);
  return {
    courseDetail,
    setCourseDetail,
      token,
      setToken,
      pages,
      setPages
  };
};
