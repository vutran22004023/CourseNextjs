"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import ButtonComponent from "@/components/Button/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GetInformationPage,
  UpdateInformationPage,
} from "@/apis/informationPage";
import { useQuery } from "@tanstack/react-query";
import { useMutationHook } from "@/hooks";
import { success, error } from "@/components/Message/Message";
import React, {useEffect, useState} from "react";
import {ImageUpload} from "@/components/UpLoadImg/ImageUpload";
import Image from 'next/image';
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";
// Schema for validation
const informationPageSchema = z.object({
  name: z
    .string({
      required_error: "Vui lòng nhập tên trang",
    })
    .min(2, {
      message: "Tên trang phải ít nhất 2 ký tự",
    })
    .max(30, {
      message: "Tên trang phải tối đa 30 ký tự",
    }),
  logo: z.instanceof(File).optional(),
  logoSmall: z.instanceof(File).optional(),
  description: z.string().max(300).optional(),
  paths: z
    .array(
      z.object({
        name: z.string().trim().optional(),
        route: z
          .string()
          .trim()
          .min(1, { message: "Vui lòng nhập đường dẫn." }),
        description: z.string().trim().optional(),
      })
    )
    .min(1, { message: "Vui lòng thêm ít nhất một đường dẫn." }),
});

// Type inference
type InformationPageValues = z.infer<typeof informationPageSchema>;

const fetchInformationPage = async () => {
  try {
    const res = await GetInformationPage();
    return res;
  } catch (e) {
    console.log(e);
  }
};

export function InformationPageForm() {
  const {
    uploadedFiles,
    uploadFile,
    setUploadedFiles,
    deleteFileFromFirebase,
  } = useFirebaseStorage();
  const [logo, setLogo]= useState<string | null>(null);
  const [logoSmall, setLogoSmall]= useState<string | null>(null);
  const { data: dataInformation, isPending: isLoadingInformation } = useQuery({
    queryKey: ["getInformation"],
    queryFn: fetchInformationPage,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: 10000,
  });
  const mutationUpdatePage = useMutationHook(async (data) => {
    try {
      const res = await UpdateInformationPage(data);
      return res;
    } catch (e) {
      console.log(e);
    }
  });
  const form = useForm<InformationPageValues>({
    resolver: zodResolver(informationPageSchema),
    defaultValues: {
      ...dataInformation,
      paths: dataInformation?.paths.map((path: any) => ({
        ...path,
        logo: dataInformation?.logo,
        logoSmall: dataInformation?.logoSmall,
      })),
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (dataInformation?.logo) {
      setLogo(dataInformation?.logo);
    }
    if (dataInformation?.logoSmall) {
      setLogoSmall(dataInformation?.logoSmall);
    }
    form.reset({
      ...dataInformation,
      paths: dataInformation?.paths.map((path: any) => ({
        ...path,
        logo: dataInformation?.logo,
        logoSmall: dataInformation?.logoSmall,
      })),
    });
  }, [dataInformation, form]);

  const { fields, append, remove } = useFieldArray({
    name: "paths",
    control: form.control,
  });

  async function onSubmit(data: InformationPageValues) {
    if (data) {
      if (data?.logo) {
        const url = await uploadFile(data.logo, "logo");
        data.logo = url;
      }
      if (data?.logoSmall) {
        const url = await uploadFile(data?.logoSmall, "logo");
        data.logoSmall = url;
      }
      await mutationUpdatePage.mutate(data, {
        onSuccess: () => {
          deleteFileFromFirebase(dataInformation?.logo);
          deleteFileFromFirebase(dataInformation?.logoSmall);
          success("Cập nhập thành công");
          setUploadedFiles([]);
        },
        onError: () => {
          error("Cập nhập không thành công");
          const deletePromises = uploadedFiles.map((fileUrl) =>
              deleteFileFromFirebase(fileUrl)
          );
          Promise.all(deletePromises)
              .then(() => {
                console.log("All uploaded files deleted successfully.");
                setUploadedFiles([]);
              })
              .catch((err) => console.error("Error while deleting files:", err));
        }
      });
    }
  }

  const handleLogoUpload = (file: File) => {
    form.setValue("logo", file);
    setLogo(URL.createObjectURL(file));
  };

  const handleLogoSmallUpload = (file: File) => {
    form.setValue("logoSmall", file);
    setLogoSmall(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên trang</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên trang" {...field} />
                </FormControl>
                <FormDescription>Tên trang từ 2-30 ký tự</FormDescription>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả thông tin trang"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Mô tả tối đa 300 ký tự</FormDescription>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Thêm ảnh logo</FormLabel>
            <ImageUpload onImageUpload={handleLogoUpload}/>
          </FormItem>
          {logo && (
              <Image
                  src={logo}
                  alt="Preview"
                  width={200}
                  height={200}
              />
          )}
          <FormItem>
            <FormLabel>Thêm ảnh logo nhỏ</FormLabel>
            <ImageUpload onImageUpload={handleLogoSmallUpload}/>
          </FormItem>
          {logoSmall && (
              <Image
                  src={logoSmall}
                  alt="Preview13212"
                  width={200}
                  height={200}
              />
          )}
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="mt-5">
                <FormField
                  control={form.control}
                  name={`paths.${index}.route`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-1">
                        <div>
                          <FormLabel>Đường dẫn {index + 1}</FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Nhập đường dẫn cho trang.
                          </FormDescription>
                        </div>
                        <ButtonComponent
                          type="courseHeader"
                          className="p-2 w-[100px] flex justify-center"
                          onClick={() => remove(index)}
                        >
                          Xóa
                        </ButtonComponent>
                      </div>
                      <FormControl>
                        <Input {...field} placeholder="Nhập đường dẫn" />
                      </FormControl>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`paths.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên Page {index + 1}</FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Nhập tên page cho trang.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} placeholder="Nhập đường dẫn" />
                      </FormControl>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`paths.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả đường dẫn {index + 1}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Nhập mô tả cho đường dẫn"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <ButtonComponent
              type="courseHeader"
              className="p-3 w-[200px] flex justify-center"
              onClick={() => append({ route: "", description: "" })}
            >
              Thêm đường dẫn
            </ButtonComponent>
          </div>
          <ButtonComponent
            type="courseHeader"
            className="flex p-3 justify-center"
            onClick={form.handleSubmit(onSubmit)}
          >
            Cập nhật
          </ButtonComponent>
        </form>
      </Form>
    </div>
  );
}
