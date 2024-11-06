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

interface Footer {
    contactInfo: any[],
    footer: any[],
    socialMediaLinks: any[]
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

const footerAtom = atom<Footer>({
    contactInfo: [],
    footer: [],
    socialMediaLinks: []
});


export const useAtoms = () => {
  const [courseDetail, setCourseDetail] = useAtom(dataIdCourse);
  const [token, setToken] = useAtom(tokenAtom);
  const [pages, setPages] = useAtom(page);
  const [run, setRun] = useAtom(runAtom);
  const [room, setRoom] = useAtom(roomAtom)
    const [footer, setFooter] = useAtom(footerAtom);
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
      setRoom,
      setFooter,
      footer
  };
};
