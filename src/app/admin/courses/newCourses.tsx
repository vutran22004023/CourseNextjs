"use client";
import React, { useState, useEffect } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { CreateCourses } from "@/apis/course";
import { useMutationHook } from "@/hooks/index";
import { success, error } from "@/components/Message/Message";
import { IfetchTable } from "@/types/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "@/firebase/config";
import { v4 } from "uuid";
import { ImageUpload, FileUpload } from "@/components/UpLoadImg/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import slugify from "slugify";
import Text from "@/components/Text/text";

interface IProp {
  chapter: any;
  chapterIndex: any;
  control: any;
  removeChapter: any;
}

// Function to generate slug
const generateSlug = (str: string) => {
  // Chuyển đổi các ký tự tiếng Việt sang không dấu
  const normalizedStr = slugify(str, {
    lower: true,
    locale: "vi",
    remove: /[*+~.()'"!:@]/g,
  });

  // Thay thế các ký tự không phải là a-z0-9 bằng dấu gạch ngang
  return normalizedStr.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Schema validation using Zod
const videoSchema = z.object({
  childname: z.string().min(1, "Vui lòng nhập tên video"),
  video: z.string().url("Vui lòng nhập URL hợp lệ"),
  slug: z.string().optional(),
});

const chapterSchema = z.object({
  namechapter: z.string().min(1, "Vui lòng nhập tên chương"),
  videos: z.array(videoSchema),
  slug: z.string().optional(),
});

const courseFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tên khóa học phải ít nhất 2 kí tự")
      .max(30, "Tên khóa học phải tối đa 30 kí tự"),
    price: z.enum(["free", "paid"]),
    priceAmount: z.string().optional(),
    video: z.string().url("Vui lòng nhập URL hợp lệ").optional(),
    image: z.instanceof(File).optional(),
    chapters: z.array(chapterSchema),
    slug: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.price === "paid") {
        return !!data.priceAmount;
      }
      return true;
    },
    {
      message: "Vui lòng nhập số tiền cho khóa học trả phí",
      path: ["priceAmount"],
    }
  );

type CourseFormValues = z.infer<typeof courseFormSchema>;

export default function NewCourses({ fetchTableData }: IfetchTable) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    mode: "onChange",
  });

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    name: "chapters",
    control: form.control,
  });

  const handleImageUpload = (file: File) => {
    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const mutateCreate = useMutationHook(async (data: any) => {
    if (data.image) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const snapshot = await uploadBytes(imgRef, data.image);
      const url = await getDownloadURL(snapshot.ref);
      data.image = url; // replace the File object with the URL string
    }
    const res = await CreateCourses(data);
    return res;
  });

  const { data: dataCreate } = mutateCreate;
  useEffect(() => {
    if (dataCreate?.status === 200) {
      success(`${dataCreate?.message}`);
      setImagePreview(null);
      setIsModalOpen(false);
      fetchTableData.refetch();
      form.reset();
    } else if (dataCreate?.status === "ERR") {
      error(`${dataCreate?.message}`);
    }
  }, [dataCreate]);

  const onSubmit = (data: CourseFormValues) => {
    // Generate slugs before submitting
    data.slug = generateSlug(data.name);
    data.chapters = data.chapters.map((chapter) => ({
      ...chapter,
      slug: generateSlug(chapter.namechapter),
      videos: chapter.videos.map((video) => ({
        ...video,
        slug: generateSlug(video.childname),
      })),
    }));
    mutateCreate.mutate(data);
  };

  useEffect(() => {
    if (form.watch("price") === "free") {
      form.setValue("priceAmount", "");
    }
  }, [form.watch("price")]);

  return (
    <ModalComponent
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      style="md:max-w-[800px]"
      triggerContent={
        <ButtonComponent
          type="courseHeader"
          className=" p-3 text-[#fff] hover:bg-[#6c6a6a]"
          style={{ borderRadius: "10px" }}
        >
          Thêm khóa học
        </ButtonComponent>
      }
      contentHeader={
        <>
          <Text type="defaultSemiBold">Thêm khóa học mới</Text>
        </>
      }
      contentBody={
        <div className="p-2 max-h-[500px] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khóa học</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khóa học" {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá khóa học</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giá khóa học" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ececec]">
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {form.watch("price") === "paid" && (
                <FormField
                  control={form.control}
                  name="priceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tiền</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số tiền" {...field} />
                      </FormControl>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đường dẫn video giới thiệu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập URL video giới thiệu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thêm ảnh khóa học</FormLabel>
                    <ImageUpload onImageUpload={handleImageUpload} />
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                </div>
              )}
              <FormItem>
                <FormLabel>Thêm chương khóa học</FormLabel>
                {chapterFields.map((chapter, chapterIndex) => (
                  <ChapterField
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                    control={form.control}
                    removeChapter={removeChapter}
                  />
                ))}
              </FormItem>
              <ButtonComponent
                type="courseHeader"
                className="w-[150px] p-2 justify-center flex"
                onClick={() => appendChapter({ namechapter: "", videos: [] })}
              >
                Thêm chương
              </ButtonComponent>
            </form>
          </Form>
        </div>
      }
      contentFooter={
        <>
          <div className="flex justify-end p-4">
            <ButtonComponent
              type="courseHeader"
              className="w-[150px] p-2 justify-center flex"
              onClick={form.handleSubmit(onSubmit)}
            >
              Thêm khóa học
            </ButtonComponent>
          </div>
        </>
      }
    />
  );
}

function ChapterField({
  chapter,
  chapterIndex,
  control,
  removeChapter,
}: IProp) {
  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    name: `chapters.${chapterIndex}.videos`,
    control,
  });

  return (
    <div key={chapter.id} className="p-4 border rounded-md mb-4">
      <div className="flex justify-between items-center">
        <div>Chương {chapterIndex + 1}</div>
        <ButtonComponent
          type="courseHeader"
          className="w-[150px] p-2 justify-center flex"
          onClick={() => removeChapter(chapterIndex)}
        >
          Xóa chương
        </ButtonComponent>
      </div>
      <FormField
        control={control}
        name={`chapters.${chapterIndex}.namechapter`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên chương</FormLabel>
            <FormControl>
              <Input placeholder="Nhập tên chương" {...field} />
            </FormControl>
            <FormMessage className="text-[red]" />
          </FormItem>
        )}
      />
      <FormItem>
        <FormLabel>Thêm video khóa học</FormLabel>
        {videoFields.map((video, videoIndex) => (
          <div key={video.id} className="pl-4 mt-4 border-l-2">
            <div className="flex justify-between items-center">
              <div>Video {videoIndex + 1}</div>
              <ButtonComponent
                type="courseHeader"
                className="w-[150px] p-2 justify-center flex"
                onClick={() => removeVideo(videoIndex)}
              >
                Xóa video
              </ButtonComponent>
            </div>
            <FormField
              control={control}
              name={`chapters.${chapterIndex}.videos.${videoIndex}.childname`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên video</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên video" {...field} />
                  </FormControl>
                  <FormMessage className="text-[red]" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`chapters.${chapterIndex}.videos.${videoIndex}.video`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL video</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập URL video" {...field} />
                  </FormControl>
                  <FormMessage className="text-[red]" />
                </FormItem>
              )}
            />
          </div>
        ))}
      </FormItem>
      <ButtonComponent
        type="courseHeader"
        className="w-[150px] p-2 justify-center flex"
        onClick={() => appendVideo({ childname: "", video: "" })}
      >
        Thêm video
      </ButtonComponent>
    </div>
  );
}
