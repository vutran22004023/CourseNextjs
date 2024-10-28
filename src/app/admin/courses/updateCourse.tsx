"use client";
import React, {useState, useEffect} from "react";
import {Input} from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ButtonComponent from "@/components/Button/Button";
import {z} from "zod";
import {
    Form,
    FormControl,
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
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdateCourses} from "@/apis/course";
import {useMutationHook} from "@/hooks";
import {success, error} from "@/components/Message/Message";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {imageDb} from "@/firebase/config";
import {v4} from "uuid";
import {FileUpload, ImageUpload} from "@/components/UpLoadImg/ImageUpload";
import slugify from "slugify";
import {GetDetailCourses} from "@/apis/course";
import {Course} from "@/types/course";

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
    form: any;
}

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
            {message: "Các nhãn đáp án phải là duy nhất"}
        ),
    correctAnswer: z.string().optional(),
});

// Schema validation using Zod
const videoSchema = z.object({
    childname: z.string().min(1, "Vui lòng nhập tên video"),
    video: z
        .string()
        .url("Vui lòng nhập URL hợp lệ")
        .optional()
        .refine((val: any, ctx: any) => {
            // Require video URL if videoType is "video"
            if (ctx?.parent?.videoType === "video") {
                return !!val;
            }
            return true; // Don't validate if videoType is not "video"
        }, "Chưa có đường dẫn video"),
    slug: z.string().optional(),
    videoType: z.enum(["video", "exercise"]),
    file: z.instanceof(File).optional(),
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
        image: z.string().url("Please enter a valid image URL").optional(),
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

const fetchData = async (slug: string) => {
    try {
        const res = await GetDetailCourses(slug);
        return res?.data;
    } catch (e) {
        console.log(e);
    }
};

const UpdateCourse: React.FC<UpdateProps> = ({data, isOpen, onClose}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dataDetailCourse, setDataDetailCourse] = useState<Course>();
    useEffect(() => {
        if (isOpen) {
            const fetchCourseDetails = async () => {
                try {
                    const dataDetail: Course = await fetchData(data?.slug);
                    if (dataDetail) {
                        setDataDetailCourse(dataDetail);
                    }
                } catch (error) {
                    console.error("Failed to fetch course details:", error);
                }
            };
            fetchCourseDetails();
        }
    }, [isOpen, data?.slug]);
    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            ...dataDetailCourse,
            image: dataDetailCourse?.image || null,
            chapters: dataDetailCourse?.chapters ? data.chapters : [],
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (dataDetailCourse?.image) {
            setImagePreview(dataDetailCourse?.image);
        }
        form.reset({
            ...dataDetailCourse,
            image: dataDetailCourse?.image || null,
            chapters: dataDetailCourse?.chapters ? dataDetailCourse?.chapters : [],
        });
    }, [dataDetailCourse, form]);

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

        if (dataForm?.chapters) {
            for (const chapter of dataForm.chapters) {
                if (chapter.videos && chapter.videos.length > 0) {
                    for (const video of chapter.videos) {
                        if (video.file) {
                            const fileRef = ref(imageDb, `homeworkFile/${v4()}`);
                            const snapshot = await uploadBytes(fileRef, video.file);
                            const url = await getDownloadURL(snapshot.ref);
                            video.file = url; // Cập nhật video.file thành URL
                        }
                    }
                }
            }
        } else if (!dataForm?.chapters) {
            for (const chapter of data.chapters) {
                if (chapter.videos && chapter.videos.length > 0) {
                    for (const video of chapter.videos) {
                        video.file = data.file;
                    }
                }
            }
        }
        const res = await UpdateCourses(data._id, dataForm);
        return res;
    });

    const {data: dataUpdateCourses} = mutationUpdate;

    useEffect(() => {
        if (dataUpdateCourses?.status === 200) {
            success(`${dataUpdateCourses?.message}`);
            onClose();
        } else if (dataUpdateCourses?.status === "ERR") {
            error(`${dataUpdateCourses?.message}`);
        }
    }, [dataUpdateCourses]);

    const onSubmit = (formData: CourseFormValues) => {
        formData.slug = generateSlug(formData.name);
        formData.chapters = formData.chapters.map((chapter) => ({
            ...chapter,
            slug: generateSlug(chapter.namechapter),
            videos: chapter.videos.map((video) => ({
                ...video,
                slug: generateSlug(video.childname),
            })),
        }));
        mutationUpdate.mutate(formData);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild></SheetTrigger>
            <SheetContent className="bg-[#fff] pr-[20px] w-[600px]">
                <SheetHeader className="mb-3">
                    <SheetTitle>
                        <div>Chỉnh sửa khóa học</div>
                    </SheetTitle>
                </SheetHeader>
                <div className="max-h-[580px] overflow-y-auto">
                    <Form {...form}>
                        <form className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tên khóa học</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên khóa học" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[red]"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Giá khóa học</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn giá khóa học"/>
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#ececec]">
                                                    <SelectItem value="free">Free</SelectItem>
                                                    <SelectItem value="paid">Paid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-[red]"/>
                                    </FormItem>
                                )}
                            />
                            {form.watch("price") === "paid" && (
                                <FormField
                                    control={form.control}
                                    name="priceAmount"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Số tiền</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập số tiền" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[red]"/>
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="video"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Đường dẫn video giới thiệu</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập URL video giới thiệu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[red]"/>
                                    </FormItem>
                                )}
                            />
                            <ImageUpload onImageUpload={handleImageUpload}/>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormMessage className="text-[red]"/>
                                    </FormItem>
                                )}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 h-[200px]"
                                    style={{maxWidth: "100%"}}
                                />
                            )}
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
                            <ButtonComponent
                                type="courseHeader"
                                className="w-[150px] p-2 justify-center flex"
                                onClick={() => appendChapter({namechapter: "", videos: []})}
                            >
                                Thêm chương
                            </ButtonComponent>
                        </form>
                    </Form>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <ButtonComponent
                            type="courseHeader"
                            className="p-2"
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
            appendVideo({childname: "", videoType: "video"});
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
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Tên chương</FormLabel>
                        <FormControl>
                            <Input placeholder="Nhập tên chương" {...field} />
                        </FormControl>
                        <FormMessage className="text-[red]"/>
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tên video</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên video" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[red]"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`chapters.${chapterIndex}.videos.${videoIndex}.videoType`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Loại nội dung</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn thể loại"/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#ececec]">
                                                <SelectItem value="video">Video</SelectItem>
                                                <SelectItem value="exercise">Bài tập</SelectItem>
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
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>URL video</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập URL video" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[red]"/>
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
                                                <SelectValue placeholder="Chọn thể loại"/>
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
                                        render={({field: {onChange, value}}) => (
                                            <FormItem>
                                                <FormLabel>Tệp bài tập</FormLabel>
                                                <FileUpload
                                                    onFileUpload={(file) => {
                                                        onChange(file);
                                                    }}
                                                />
                                                <FormMessage className="text-[red]"/>
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
                onClick={() => appendVideo({childname: "", videoType: "video"})}
            >
                Thêm video
            </ButtonComponent>
        </div>
    );
}

function QuizField({chapterIndex, videoIndex, control}: any) {
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
            appendQuestion({title: "", options: [], correctAnswer: ""});
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
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Tiêu đề câu hỏi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tiêu đề câu hỏi" {...field} />
                                </FormControl>
                                <FormMessage className="text-[red]"/>
                            </FormItem>
                        )}
                    />

                    {/* Options for each question */}
                    <QuestionOptionsField
                        chapterIndex={chapterIndex}
                        videoIndex={videoIndex}
                        questionIndex={questionIndex}
                        control={control}
                        onOptionsChange={(updatedOptions: any) => {
                            // Update the options in questionFields
                            questionFields[questionIndex].options = updatedOptions;
                        }}
                    />

                    {/* Correct answer selection */}
                    <FormField
                        control={control}
                        name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.correctAnswer`}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Đáp án đúng</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn đáp án đúng"/>
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#ececec]">
                                            {questionFields[questionIndex].options.map(
                                                (option: any, optionIndex: any) => (
                                                    <SelectItem key={optionIndex} value={option.label}>
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-[red]"/>
                            </FormItem>
                        )}
                    />
                </div>
            ))}
            <ButtonComponent
                type="courseHeader"
                className="w-[150px] p-2 justify-center flex mt-2"
                onClick={() =>
                    appendQuestion({title: "", options: [], correctAnswer: ""})
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
        appendOption({label: getOptionLabel(optionFields.length), text: ""});
        onOptionsChange([
            ...optionFields,
            {label: getOptionLabel(optionFields.length), text: ""},
        ]);
    };

    const handleRemoveOption = (optionIndex: number) => {
        removeOption(optionIndex);
        onOptionsChange(optionFields.filter((_, idx) => idx !== optionIndex));
    };

    return (
        <div className="pl-4 mt-2">
            {optionFields.map((option, optionIndex) => (
                <div key={option.id} className="flex items-center mt-2">
                    <FormField
                        control={control}
                        name={`chapters.${chapterIndex}.videos.${videoIndex}.quiz.${questionIndex}.options.${optionIndex}.label`}
                        render={({field}) => (
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
                        render={({field}) => (
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

export default UpdateCourse;
