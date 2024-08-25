'use client'
import React, { useState, useCallback, useEffect  } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonComponent from "@/components/Button/Button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";
import { UpdateCourses } from "@/apis/course";
import { useMutationHook } from "@/hooks";
import {success, error} from '@/components/Message/Message'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '@/firebase/config';
import { v4 } from 'uuid';
import ImageUpload from '@/components/UpLoadImg/ImageUpload';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import slugify from 'slugify'
interface UpdateProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

interface IProp {
  chapter: any;
  chapterIndex: any;
  control: any;
  removeChapter: any;
}

const generateSlug = (str: string) => {
  // Chuyển đổi các ký tự tiếng Việt sang không dấu
  const normalizedStr = slugify(str, {
    lower: true,
    locale: 'vi',
    remove: /[*+~.()'"!:@]/g
  });

  // Thay thế các ký tự không phải là a-z0-9 bằng dấu gạch ngang
  return normalizedStr
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

const courseFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên khóa học phải ít nhất 2 kí tự")
    .max(30, "Tên khóa học phải tối đa 30 kí tự"),
  price: z.enum(["free", "paid"]),
  priceAmount: z.string().optional(),
  video: z.string().url("Vui lòng nhập URL hợp lệ").optional(),
  image: z.string().url("Please enter a valid image URL").optional(),
  chapters: z.array(chapterSchema),
  slug: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

const UpdateCourse: React.FC<UpdateProps> = ({ data, isOpen, onClose }) => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      ...data,
      image: data.image || null,
      chapters: data.chapters ? data.chapters : [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data.image) {
      setImagePreview(data.image);
    }
    // Reset form values whenever `data` changes
    form.reset({
      ...data,
      image: data.image || null,
      chapters: data.chapters ? data.chapters : [],
    });
  }, [data, form]);

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    name: "chapters",
    control: form.control,
  });

  const handleImageUpload = (file: File) => {
    form.setValue("image", URL.createObjectURL(file));
    setImagePreview(URL.createObjectURL(file));
  };

  const mutationUpdate = useMutationHook(async (dataForm: any) => {
    if (dataForm.image && dataForm.image instanceof File) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const snapshot = await uploadBytes(imgRef, dataForm.image);
      const url = await getDownloadURL(snapshot.ref);
      dataForm.image = url; // Thay thế đối tượng File bằng URL
    } else if (!dataForm.image && data.image) {
      dataForm.image = data.image; // Giữ URL hình ảnh cũ nếu không có hình ảnh mới
    }
    const res = await UpdateCourses(data._id, dataForm);
    return res;
  });

  const {data: dataUpdateCourses} = mutationUpdate

  useEffect(() => {
    if(dataUpdateCourses?.status === 200) {
      success(`${dataUpdateCourses?.message}`)
      onClose()
    }else if(dataUpdateCourses?.status === 'ERR') {
      error(`${dataUpdateCourses?.message}`)
    }
  },[dataUpdateCourses])

  const onSubmit = (formData: CourseFormValues) => {
    formData.slug = generateSlug(formData.name);
    formData.chapters = formData.chapters.map(chapter => ({
      ...chapter,
      slug: generateSlug(chapter.namechapter),
      videos: chapter.videos.map(video => ({
        ...video,
        slug: generateSlug(video.childname),
      })),
    }));
    mutationUpdate.mutate(formData)
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="bg-[#fff] pr-[20px] w-[600px]">
        <SheetHeader className="mb-3">
          <SheetTitle>
            <div>Chỉnh sửa khóa học </div>
          </SheetTitle>
        </SheetHeader>
        <div className="max-h-[580px] overflow-y-auto">
          <Form {...form} >
            <form className="space-y-4">
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
              <ImageUpload onImageUpload={handleImageUpload} />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 h-[200px]" style={{ maxWidth: "100%" }} />
              )}
              {chapterFields.map((chapter, chapterIndex) => (
                <ChapterField
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                  control={form.control}
                  removeChapter={removeChapter}
                />
              ))}
              <ButtonComponent
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-[100px]"
                onClick={() => appendChapter({ namechapter: "", videos: [] })}
              >
                Thêm chương
              </ButtonComponent>
            </form>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <ButtonComponent
              type="submit"
              onClick={form.handleSubmit(onSubmit)}

            >
              Chỉnh sửa
            </ButtonComponent>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

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
    <div className="pl-4 mt-4 border-l-2">
      <div className="flex justify-between items-center">
        <div>Chương {chapterIndex + 1}</div>
        <ButtonComponent
          type="button"
          variant="outline"
          size="sm"
          className="ml-2 w-[100px]"
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
      {videoFields.map((video, videoIndex) => (
        <div key={video.id} className="pl-4 mt-4 border-l-2">
          <div className="flex justify-between items-center">
            <div>Video {videoIndex + 1}</div>
            <ButtonComponent
              type="button"
              variant="outline"
              size="sm"
              className="ml-2 w-[100px]"
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
                <FormLabel>Tên video </FormLabel>
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
      <ButtonComponent
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-[100px]"
        onClick={() => appendVideo({ childname: "", video: "" })}
      >
        Thêm video
      </ButtonComponent>
    </div>
  );
}

export default UpdateCourse;
