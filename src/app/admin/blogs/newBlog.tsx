"use client";
import React, { useState, useEffect } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CreateBlogs } from "@/apis/blog";
import { useMutationHook } from "@/hooks";
import { success, error } from "@/components/Message/Message";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getTokenFromCookies } from "@/utils/auth";
import {useTranslation} from "react-i18next";

export default function CreateBlog({ fetchTableData }: any) {
    const {t} = useTranslation('common');
    const blogFormSchema = z.object({
        title: z
            .string()
            .min(2,t('blogFormSchema.titleMin'))
            .max(100, t('blogFormSchema.titleMax')),
        content: z.string().min(10, t('content')),
    });

    type BlogFormValues = z.infer<typeof blogFormSchema>;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    mode: "onChange",
  });

  const mutateCreate = useMutationHook(async (data: any) => {
    const res = await CreateBlogs(data);
    return res;
  });

  const { data: dataCreate } = mutateCreate;

  useEffect(() => {
    if (dataCreate?.status === 200) {
      success(`${dataCreate?.message}`);
      setIsModalOpen(false);
      fetchTableData.refetch();
      form.reset();
    } else if (dataCreate?.status === "ERR") {
      error(`${dataCreate?.message}`);
    }
  }, [dataCreate]);

  const onSubmit = (data: BlogFormValues) => {
    mutateCreate.mutate({
      ...data,
      author: user?.name || "Anonymous",
      date: new Date().toISOString(),
    });
  };

  return (
    <ModalComponent
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      triggerContent={
        <Button
          className="bg-[black] p-5 text-[#fff] hover:bg-[#6c6a6a]"
          style={{ borderRadius: "10px" }}
        >
            {t('AddBlog')}
        </Button>
      }
      contentHeader={<div>{t('AddBlog')}</div>}
      contentBody={
        <div className="p-2 max-h-[500px] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('FormAddBlog.titleBlog')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('FormAddBlog.placeholderTitleBlog')} {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('FormAddBlog.ContentBlog')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('FormAddBlog.placeholderContentBlog')} {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      }
      contentFooter={
        <div className="flex justify-end p-4">
          <Button
            type="submit"
            className="w-[150px]"
            onClick={form.handleSubmit(onSubmit)}
          >
              {t('AddBlog')}
          </Button>
        </div>
      }
    />
  );
}
