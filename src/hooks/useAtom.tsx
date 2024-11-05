// useSharedData.js
import { atom, useAtom } from 'jotai';

interface IdCourse {
    courseId: any;
    videoID: any;
    nameVideo: any;
}
interface Page {
    logo: string;
    logoSmall: string;
}

const dataIdCourse = atom<IdCourse>({
    courseId: null,
    videoID: null,
    nameVideo: null
  });
const page = atom<Page>({
    logo: "",
    logoSmall: ""
});
const tokenAtom = atom<string | null>(null);

const runAtom = atom<boolean | false>(false);

const roomAtom = atom<any[]>([]);


export const useAtoms = () => {
  const [courseDetail, setCourseDetail] = useAtom(dataIdCourse);
  const [token, setToken] = useAtom(tokenAtom);
  const [pages, setPages] = useAtom(page);
  const [run, setRun] = useAtom(runAtom);
  const [room, setRoom] = useAtom(roomAtom)
  return {
    courseDetail,
    setCourseDetail,
      token,
      setToken,
      pages,
      setPages,
      run,
      setRun,
      room,
      setRoom
  };
};
