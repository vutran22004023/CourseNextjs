import React, { useState } from "react";
import WordPost from "@/components/WordPost/wordPost";
import ButtonComponment from "@/components/Button/Button";
import { CreateNote } from "@/apis/usercourse";
import { useMutationHook } from "@/hooks";
import { success } from "@/components/Message/Message";
import { Input } from "@/components/ui/input";
interface Props {
  setIsModalOpenEdit: (value: boolean) => void;
  timeVideo: string;
  dataCourseDetail: any;
  dataVideo: any;
  navbarRight: boolean;
}

export default function createNote({
  timeVideo,
  dataVideo,
  dataCourseDetail,
  setIsModalOpenEdit,
  navbarRight,
}: Props) {
  const [valueTitle, setValueTitle] = useState<string>("");
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
          title: valueTitle,
          time: timeVideo,
          content: valueWord,
        },
      },
      {
        onSuccess: (data) => {
          success("Note created successfully");
          setValueWord("");
          setIsModalOpenEdit(false);
        },
      }
    );
  };
  return (
    <div
      className={`fixed bottom-0 left-0 bg-[#f4f4f4] right-0 z-10 border-b py-5 px-2 w-full h-auto ${
        navbarRight ? "md:w-[69.5%]" : "md:w-full"
      } md:w-[69.5%] md:h-[290px] border-t border-black`}
    >
      <div className="md:h-[200px] overflow-y-auto">
        <input
          value={valueTitle}
          name="valueTitle"
          onChange={(e) => setValueTitle(e.target.value)}
          className="border-none w-full focus:outline-none border-0 mb-2 p-3 rounded-lg"
          placeholder="Nhập tiêu đề"
        />
        <div className="p-5 bg-[#fff] border  border-black rounded-xl h-[200px] overflow-y-auto">
          <WordPost setValueWord={setValueWord} />
        </div>
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
            disabled={
              valueTitle.length > 0 && valueWord.length > 0 ? false : true
            }
          >
            Tạo ghi chú
          </ButtonComponment>
        </div>
      </div>
    </div>
  );
}
