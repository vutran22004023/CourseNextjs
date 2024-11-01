"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Text from '@/components/Text/text'
import {useEffect, useState} from "react";
import {useMutationHook} from "@/hooks";
import {CheckQuizAnswers} from '@/apis/usercourse';
import {success, error} from '@/components/Message/Message';
import { Check, X  } from 'lucide-react';
interface Props {
    dataVideo: any;
    mergedChapters: any;
    dataCourseDetail: any;
    mutationUpdateCourse: any;
    userId: any;
}

// Define schema to store quiz question _id and selected option _id
const FormSchema = z.object({
    quizAnswers: z.array(
        z.object({
            id: z.string(),       // Quiz question's _id
            answer: z.string(),   // Selected option's _id
        })
    ),
})
type QuizFormValues = z.infer<typeof FormSchema>;
const Quiz = ({ dataVideo,mergedChapters,dataCourseDetail,mutationUpdateCourse,userId }: Props) => {
    const [results, setResults] = useState<any[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            quizAnswers: dataVideo?.quiz?.map((quiz: any) => ({
                id: quiz?._id,
                answer: "",
            })),
        },
    })

    useEffect(() => {
        form.reset({
            quizAnswers: dataVideo?.quiz?.map((quiz: any) => ({
                id: quiz._id,
                answer: "",
            })) || [],
        });
    }, [dataVideo, form]);

    const mutationCheckQuiz = useMutationHook(async (data) => {
        try {
            const res = await CheckQuizAnswers(data);
            return res;
        }catch (e) {
            console.log(e);
        }
    })

    function onSubmit(data: QuizFormValues) {
        mutationCheckQuiz.mutate({
            courseId: dataCourseDetail?._id,
            chapterId: mergedChapters[0]?._id,
            videoId: dataVideo?._id,
            quizAnswers: data?.quizAnswers
        }, {
            onSuccess: (data) => {
                setResults(data.results);
                if(data?.status === "success") {
                    success(data?.message);
                    mutationUpdateCourse.mutate({
                        userId: userId,
                        courseId: dataCourseDetail?._id,
                        videoId: dataVideo?._id,
                    });
                }else {
                    error(data?.message);
                }
            }
        })
    }


    return (
        <div className="items-center w-full">
            <Text type="header">{dataVideo?.childname}</Text>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {dataVideo?.quiz?.map((quiz: any, index: number) => (
                        <FormField
                            key={quiz._id}
                            control={form.control}
                            name={`quizAnswers.${index}.answer`}
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        <div className="flex gap-2">
                                            <div>{quiz?.title}</div>
                                            {results?.map((result) => {
                                                if (result.id === quiz._id) {
                                                    return result.correct ? (
                                                        <Check key={result.id} size={24} color="green"/>
                                                    ) : (
                                                        <X key={result.id} size={24} color="red" />
                                                    );
                                                }
                                                return null; // Return null if no match found
                                            })}
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}  // Ensure binding to field.value
                                            className="flex flex-col space-y-1"
                                        >
                                            {quiz?.options?.map((option: any) => (
                                                <FormItem
                                                    key={option?._id}
                                                    className="flex items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={option?.label}
                                                            checked={field.value === option?.label}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {option?.text}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Quiz;
