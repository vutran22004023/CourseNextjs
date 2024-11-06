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
import { useMutationHook } from "@/hooks";
import { success, error } from "@/components/Message/Message";
import { IfetchTable } from "@/types";
import { ImageUpload, FileUpload,VideoUpload } from "@/components/UpLoadImg/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import slugify from "slugify";
import Text from "@/components/Text/text";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";

interface IProp {
  chapter: any;
  chapterIndex: any;
  control: any;
  removeChapter: any;
  form: any;
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

// Define the question schema for the quiz in Zod
const questionSchema = z.object({
  title: z.string().min(1, "Câu hỏi không có tiêu đề"),
  options: z
    .array(
      z.object({
        label: z.string().min(1, "Chưa có nhãn cho đáp án"),
        text: z.string().min(1, "Chưa có nội dung cho đáp án"),
      })
    )
    .refine(
      (options) => {
        const labels = options.map((option) => option.label);
        return new Set(labels).size === labels.length;
      },
      { message: "Các nhãn đáp án phải là duy nhất" }
    ),
  correctAnswer: z.string().optional(),
});

// Schema validation using Zod
const videoSchema = z.object({
  childname: z.string().min(1, "Vui lòng nhập tên video"),
  video: z.string().url("Vui lòng nhập URL hợp lệ").optional(),
  slug: z.string().optional(),
  videoType: z.enum(["video", "exercise","videofile"]),
  file: z.instanceof(File).optional(),
  videoFile: z.instanceof(File).optional(),
  quiz: z.array(questionSchema).optional(),
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
  const {
    uploadedFiles,
    uploadFile,
    setUploadedFiles,
    deleteFileFromFirebase,
  } = useFirebaseStorage();
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
      const url = await uploadFile(data.image, "files");
      data.image = url;
    }
    if (data?.chapters) {
      for (const chapter of data.chapters) {
        if (chapter.videos && chapter.videos.length > 0) {
          for (const video of chapter.videos) {
            if (video.file) {
              const url = await uploadFile(video.file, "homeworkFile");
              video.file = url;
            }
            if(video.videoFile){
              const url = await uploadFile(video.videoFile, "video");
              video.videoFile = url;
            }
          }
        }
      }
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
      setUploadedFiles([]);
      fetchTableData?.refetch();
      form.reset();
    } else if (dataCreate?.status === "ERR") {
      error(`${dataCreate?.message}`);
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

  useEffect(() => {
    if (chapterFields.length === 0) {
      // Tạo sẵn 1 hoặc nhiều input video khi component được render lần đầu
      appendChapter({ namechapter: "", videos: [] });
    }
  }, []);

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
                    form={form}
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
  form,
}: IProp) {
  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    name: `chapters.${chapterIndex}.videos`,
    control,
  });
  const [selectValue, setSelectValue] = useState<string>("false");
  useEffect(() => {
    if (videoFields.length === 0) {
      // Tạo sẵn 1 hoặc nhiều input video khi component được render lần đầu
      appendVideo({ childname: "", videoType: "video" });
    }
  }, []);
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
              name={`chapters.${chapterIndex}.videos.${videoIndex}.videoType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại nội dung</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thể loại" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#ececec]">
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="exercise">Bài tập</SelectItem>
                        <SelectItem value="videofile">Truyền file video</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch(
              `chapters.${chapterIndex}.videos.${videoIndex}.videoType`
            ) === "video" ? (
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
            ) : form.watch(
                `chapters.${chapterIndex}.videos.${videoIndex}.videoType`
            ) === "videofile" ? (
                <FormField
                    control={control}
                    name={`chapters.${chapterIndex}.videos.${videoIndex}.videoFile`}
                    render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <FormLabel>File video</FormLabel>
                          <VideoUpload
                              onVideoUpload={(file) => {
                                onChange(file);
                              }}
                          />
                          <FormMessage className="text-[red]" />
                        </FormItem>
                    )}
                />
                ) : (
              <>
                <FormItem>
                  <FormLabel>Loại thể loại</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => setSelectValue(value)}
                      value={String(selectValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thể loại" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#ececec]">
                        <SelectItem value="false">File</SelectItem>
                        <SelectItem value="true">Trắc nghiệm</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
                {selectValue === "false" ? (
                  <FormField
                    control={control}
                    name={`chapters.${chapterIndex}.videos.${videoIndex}.file`}
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Tệp bài tập</FormLabel>
                        <FileUpload
                          onFileUpload={(file) => {
                            onChange(file);
                          }}
                        />
                        <FormMessage className="text-[red]" />
                      </FormItem>
                    )}
                  />
                ) : (
                  form.watch(
                    `chapters.${chapterIndex}.videos.${videoIndex}.videoType`
                  ) === "exercise" && (
                    <div>
                      <FormLabel>Bài tập trắc nghiệm</FormLabel>
                      <QuizField
                        chapterIndex={chapterIndex}
                        videoIndex={videoIndex}
                        control={control}
                      />
                    </div>
                  )
                )}
              </>
            )}
          </div>
        ))}
      </FormItem>
      <ButtonComponent
        type="courseHeader"
        className="w-[150px] p-2 justify-center flex"
        onClick={() => appendVideo({ childname: "", videoType: "video" })}
      >
        Thêm video
      </ButtonComponent>
    </div>
  );
}

type QuestionField = {
  title: string;
  id: string;
  options: any; // Replace 'any' with a more specific type if possible
  correctAnswer: any;
};

function QuizField({ chapterIndex, videoIndex, control }: any) {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    name: `chapters.${chapterIndex}.videos.${videoIndex}.quiz`,
    control,
  });

  useEffect(() => {
    if (questionFields.length === 0) {
      appendQuestion({ title: "", options: [], correctAnswer: "" });
    }
  }, []);

  return (
    <div className="pl-4 mt-4">
      {questionFields.map((question, questionIndex) => (
        <div key={questionIndex} className="mt-4 p-4 border rounded-md">
          <div className="flex justify-between items-center">
            <div>Câu hỏi {questionIndex + 1}</div>
            <ButtonComponent
              type="courseHeader"
              className="w-[150px] p-2 justify-center flex"
              onClick={() => removeQuestion(questionIndex)}
            >
              Xóa câu hỏi
            </ButtonComponent>
          </div>
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề câu hỏi</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề câu hỏi" {...field} />
                </FormControl>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />

          {/* Options for each question */}
          <QuestionOptionsField
            chapterIndex={chapterIndex}
            videoIndex={videoIndex}
            questionIndex={questionIndex}
            control={control}
            onOptionsChange={(updatedOptions: QuestionField) => {
              // Update the options in questionFields
              questionFields[questionIndex].options = updatedOptions;
            }}
          />

          {/* Correct answer selection */}
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.correctAnswer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đáp án đúng</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đáp án đúng" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#ececec]">
                      {questionFields[questionIndex]?.options?.map(
                        (option: any, optionIndex: any) => (
                          <SelectItem key={optionIndex} value={option.label}>
                            {option.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
        </div>
      ))}
      <ButtonComponent
        type="courseHeader"
        className="w-[150px] p-2 justify-center flex mt-2"
        onClick={() =>
          appendQuestion({ title: "", options: [], correctAnswer: "" })
        }
      >
        Thêm câu hỏi
      </ButtonComponent>
    </div>
  );
}

// QuestionOptionsField component to handle the options for each question
function QuestionOptionsField({
  chapterIndex,
  videoIndex,
  questionIndex,
  control,
  onOptionsChange,
}: any) {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.options`,
    control,
  });

  const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

  const handleAppendOption = () => {
    appendOption({ label: getOptionLabel(optionFields.length), text: "" });
    onOptionsChange([
      ...optionFields,
      { label: getOptionLabel(optionFields.length), text: "" },
    ]);
  };

  const handleRemoveOption = (optionIndex: number) => {
    removeOption(optionIndex);
    onOptionsChange(
      optionFields.filter((_: any, idx: any) => idx !== optionIndex)
    );
  };

  return (
    <div className="pl-4 mt-2">
      {optionFields.map((option: any, optionIndex) => (
        <div key={option.id} className="flex items-center mt-2">
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.options.${optionIndex}.label`}
            render={({ field }) => (
              <FormItem className="mr-2">
                <FormLabel>Nhãn đáp án</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập nhãn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.options.${optionIndex}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung đáp án</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập nội dung đáp án" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <ButtonComponent
            type="courseHeader"
            className="ml-2 p-2"
            onClick={() => handleRemoveOption(optionIndex)}
          >
            Xóa đáp án
          </ButtonComponent>
        </div>
      ))}
      <ButtonComponent
        type="courseHeader"
        className="w-[150px] p-2 justify-center flex mt-2"
        onClick={handleAppendOption}
      >
        Thêm đáp án
      </ButtonComponent>
    </div>
  );
}
