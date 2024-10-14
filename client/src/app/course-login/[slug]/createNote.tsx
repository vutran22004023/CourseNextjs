import React, { useState } from "react";
import WordPost from "@/components/WordPost/wordPost";
import ButtonComponment from "@/components/Button/Button";
import { CreateNote } from "@/apis/usercourse";
import { useMutationHook } from "@/hooks";
import { success } from "@/components/Message/Message";
interface Props {
  setIsModalOpenEdit: (value: boolean) => void;
  timeVideo: string;
  dataCourseDetail: any;
  dataVideo: any;
}

export default function createNote({
  timeVideo,
  dataVideo,
  dataCourseDetail,
  setIsModalOpenEdit,
}: Props) {
  const [valueWord, setValueWord] = useState<string>("");
  const mutationCreateNote = useMutationHook(async (data) => {
    try {
      const res = await CreateNote(data);
      return res;
    } catch (err) {
      console.error(err);
    }
  });

  const handleCreateNote = () => {
    mutationCreateNote.mutate(
      {
        courseId: dataCourseDetail._id,
        videoId: dataVideo?._id,
        notes: {
          time: timeVideo,
          content: valueWord,
        },
      },
      {
        onSuccess: (data) => {
          success("Note created successfully");
          setValueWord('');
          setIsModalOpenEdit(false);
        },
      }
    );
  };
  return (
    <div className="fixed bottom-0 left-0 bg-[#f4f4f4] right-0 z-10 border-b p-5 w-full h-auto md:w-[69.5%] md:h-[290px] border-t border-black">
      <div className="p-5 bg-[#fff] border  border-black rounded-xl h-[200px]">
        <WordPost setValueWord={setValueWord} />
      </div>
      <div className="flex justify-between">
        <div></div>
        <div className="flex mt-5">
          <ButtonComponment
            className="ml-2 py-1 h-[35px] w-[150px] flex justify-center items-center cursor-pointer"
            onClick={() => setIsModalOpenEdit(false)}
            type="notesheet"
          >
            Hủy bỏ
          </ButtonComponment>
          <ButtonComponment
            onClick={handleCreateNote}
            className="ml-2 py-1 h-[35px] w-[150px] flex justify-center items-center cursor-pointer"
            type="notesheet"
          >
            Tạo ghi chú
          </ButtonComponment>
        </div>
      </div>
    </div>
  );
}
