"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { Button as ButtonUi } from "@/components/ui/button";
import Text from "@/components/Text/text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import { Input } from "@/components/ui/input";
import Selector from "@/components/SelectSearch";
import { SearchUser } from "@/apis/user";
import { useMutationHook } from "@/hooks";
import { useDebounce } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CreateRoomApi } from "@/apis/videoSDK";
import { success } from "@/components/Message/Message";

const { RangePicker } = DatePicker;

const RoomFormSchema = z.object({
  title: z
    .string()
    .min(2, "Tên khóa học phải ít nhất 2 kí tự")
    .max(30, "Tên khóa học phải tối đa 30 kí tự"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  userIdZoom: z.string(),
  permissions: z.array(z.string()),
});
type RoomFormValues = z.infer<typeof RoomFormSchema>;

export default function CreateRoom() {
  const user = useSelector((state: RootState) => state.user);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openSelectSearch, setOpenSelectSearch] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState([]);
  const [selectedSearchId, setSelectedSearchId] = useState([]);
  const [AllUserSearch, setAllUserSearch] = useState(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const searchDebounced = useDebounce(inputSearch || "", 500);
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(RoomFormSchema),
    mode: "onChange",
  });

  const handleDateChange = (dates: any) => {
    if (dates) {
      const [start, end] = dates;
      form.setValue("startTime", start.toISOString());
      form.setValue("endTime", end.toISOString());
    } else {
      form.setValue("startTime", "");
      form.setValue("endTime", "");
    }
  };

  const mutationAllUsers = useMutationHook(async (data: string) => {
    try {
      const res = await SearchUser(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationCreateRoom = useMutationHook(async (data: any) => {
    try {
      const res = await CreateRoomApi(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (openSelectSearch || searchDebounced) {
      mutationAllUsers.mutate(searchDebounced || "", {
        onSuccess: (data) => {
          setAllUserSearch(data);
        },
      });
    }
  }, [openSelectSearch, searchDebounced]);

  useEffect(() => {
    form.setValue("permissions", selectedSearchId);
  }, [selectedSearchId, form]);

  useEffect(() => {
    form.setValue("userIdZoom", user?.id);
  }, [user]);

  const onSubmit = (data: RoomFormValues) => {
    // Xử lý dữ liệu form ở đây
    mutationCreateRoom.mutate(data, {
      onSuccess: (data) => {
        success("Tạo phòng học thành công");
        setOpenModalCreate(false);
        form.reset();
        setSelectedSearch([]);
        setSelectedSearchId([]);
        setInputSearch("");
        setAllUserSearch(null);
      },
    });
  };
  return (
    <>
      <Modal
        isOpen={openModalCreate}
        setIsOpen={setOpenModalCreate}
        triggerContent={
          <Button
            type="courseHeader"
            className="p-2 flex flex-row justify-center"
            onClick={() => setOpenModalCreate(true)}
          >
            Tạo lớp học
          </Button>
        }
        contentHeader={<Text type="subtitle">Thêm khóa học mới</Text>}
        contentBody={
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white mt-2"
                        placeholder="Nội dung"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />

              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Lọc ngày: </FormLabel>
                <RangePicker showTime onChange={handleDateChange} />
              </FormItem>
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Người tham gia: </FormLabel>
                <Selector
                  open={openSelectSearch}
                  setOpen={setOpenSelectSearch}
                  selected={selectedSearch}
                  setSelected={setSelectedSearch}
                  data={AllUserSearch}
                  setData={setAllUserSearch}
                  inputValue={inputSearch}
                  setInputValue={setInputSearch}
                  selectedSearchId={selectedSearchId}
                  setSelectedSearchId={setSelectedSearchId}
                />
              </FormItem>
            </form>
          </Form>
        }
        contentFooter={
          <ButtonUi type="submit" onClick={form.handleSubmit(onSubmit)}>
            Tạo khóa học
          </ButtonUi>
        }
      />
    </>
  );
}
