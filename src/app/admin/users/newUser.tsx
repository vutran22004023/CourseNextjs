"use client";
import { useState, useEffect } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonComponent from "@/components/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateUser } from "@/apis/user";
import { useMutationHook } from "@/hooks";
import { success, error } from "@/components/Message/Message";
import { IfetchTable } from "@/types";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "@/firebase/config";
import { v4 } from "uuid";
import { ImageUpload } from "@/components/UpLoadImg/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from 'next/image'
// Schema validation using Zod
const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên người dùng ít nhất 2 kí tự")
    .max(30, "Tên người dùng tối đa 30 kí tự"),
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
  isAdmin: z.boolean(),
  status: z.boolean(),
  avatar: z.instanceof(File).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

// Default values (optional)
const defaultValues: Partial<UserFormValues> = {
  isAdmin: false,
  status: false,
};

export default function NewUsers({ fetchTableData }: IfetchTable) {
  const user = useSelector((state: RootState) => state.user);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleImageUpload = (file: File) => {
    form.setValue("avatar", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const mutateCreate = useMutationHook(async (data: any) => {
    if (data.avatar) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const snapshot = await uploadBytes(imgRef, data.avatar);
      const url = await getDownloadURL(snapshot.ref);
      data.avatar = url; // replace the File object with the URL string
    }
    const res = await CreateUser(data);
    return res;
  });

  const { data: dataCreate } = mutateCreate;
  useEffect(() => {
    if (dataCreate?.status === 200) {
      success(`${dataCreate?.message}`);
      setImagePreview(null);
      setIsModalOpen(false);
      fetchTableData?.refetch();
      form.reset();
    } else if (dataCreate?.status === "ERR") {
      error(`${dataCreate?.message}`);
    }
  }, [dataCreate]);

  const onSubmit = (data: UserFormValues) => {
    mutateCreate.mutate(data);
  };

  return (
    <ModalComponent
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      triggerContent={
        <ButtonComponent
          type="courseHeader"
          className=" p-3 text-[#fff] hover:bg-[#6c6a6a]"
          style={{ borderRadius: "10px" }}
        >
          Thêm người dùng
        </ButtonComponent>
      }
      contentHeader={<div>Thêm người dùng mới</div>}
      contentBody={
        <div className="p-2 max-h-[500px] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người dùng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên người dùng" {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Nhập email" {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền của người dùng</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? "true" : "false"}
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quyền" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ececec]">
                          <SelectItem value="true">Quản trị viên</SelectItem>
                          <SelectItem value="false">Người dùng</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? "true" : "false"}
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ececec]">
                          <SelectItem value="true">Đã xác nhận</SelectItem>
                          <SelectItem value="false">Chưa xác nhận</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <ImageUpload onImageUpload={handleImageUpload} />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="mt-4">
                  <Image
                    src={imagePreview}
                    width='200'
                    height='200'
                    alt="Image Preview"
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                </div>
              )}
            </form>
          </Form>
        </div>
      }
      contentFooter={
        <>
          <div className="flex justify-end p-4">
            <ButtonComponent
              type="courseHeader"
              className=" p-3 text-[#fff] hover:bg-[#6c6a6a]"
              onClick={form.handleSubmit(onSubmit)}
            >
              Thêm người dùng
            </ButtonComponent>
          </div>
        </>
      }
    />
  );
}
