'use client';
import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from '@/components/ui/use-toast';
import ButtonComponent from '@/components/Button/Button';
import {success, error} from '@/components/Message/Message';
import {useMutationHook} from '@/hooks';
import {UpdateBlogs} from '@/apis/blog'; // API request
import slugify from 'slugify';
import {getTokenFromCookies} from '@/utils/auth';

interface UpdateProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
}

// Schema validation using Zod
const blogFormSchema = z.object({
    author: z.string().min(2, 'Tác giả phải có ít nhất 2 kí tự').max(30, 'Tác giả không thể dài hơn 30 kí tự'),
    title: z.string().min(2, 'Tiêu đề phải có ít nhất 2 kí tự').max(100, 'Tiêu đề không thể dài hơn 100 kí tự'),
    slug: z.string().optional(),
    content: z.string().min(10, 'Nội dung bài viết phải có ít nhất 10 kí tự'),
    date: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const generateSlug = (str: string) => {
    return slugify(str, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@]/g,
    });
};

const UpdateBlog: React.FC<UpdateProps> = ({data, isOpen, onClose}) => {
    const token = getTokenFromCookies();

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            ...data,
        },
        mode: 'onChange',
    });

    const mutationUpdate = useMutationHook(async (dataForm: any) => {
        const res = await UpdateBlog(data._id, dataForm);
        return res;
    });

    const {data: dataUpdateBlog} = mutationUpdate;

    // useEffect(() => {
    //     if (dataUpdateBlog?.status === 200) {
    //         success(`${dataUpdateBlog?.message}`);
    //         onClose();
    //     } else if (dataUpdateBlog?.status === 'ERR') {
    //         error(`${dataUpdateBlog?.message}`);
    //     }
    // }, [dataUpdateBlog]);

    const onSubmit = (formData: BlogFormValues) => {
        formData.slug = generateSlug(formData.title);
        mutationUpdate.mutate(formData);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-[#fff] pr-[20px] w-[600px]">
                <SheetHeader className="mb-3">
                    <SheetTitle>
                        <div>Chỉnh sửa bài viết</div>
                    </SheetTitle>
                </SheetHeader>
                <div className="max-h-[580px] overflow-y-auto">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label>Tác giả</Label>
                                <Input placeholder="Nhập tên tác giả" {...form.register('author')} />
                                <p className="text-red-600">{form.formState.errors.author?.message}</p>
                            </div>

                            <div>
                                <Label>Tiêu đề</Label>
                                <Input placeholder="Nhập tiêu đề bài viết" {...form.register('title')} />
                                <p className="text-red-600">{form.formState.errors.title?.message}</p>
                            </div>

                            <div>
                                <Label>Slug</Label>
                                <Input
                                    placeholder="Nhập slug (tự động tạo từ tiêu đề nếu để trống)" {...form.register('slug')} />
                            </div>

                            <div>
                                <Label>Nội dung bài viết</Label>
                                <Input placeholder="Nhập nội dung bài viết" {...form.register('content')} />
                                <p className="text-red-600">{form.formState.errors.content?.message}</p>
                            </div>

                            <div>
                                <Label>Ngày đăng và thời gian đọc</Label>
                                <Input
                                    placeholder="Nhập ngày đăng và thời gian đọc (Ví dụ: '5 ngày trước - 3 phút đọc')" {...form.register('date')} />
                            </div>

                            <ButtonComponent type="courseHeader">Cập nhật bài viết</ButtonComponent>
                        </form>
                    </FormProvider>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <ButtonComponent type="courseHeader">Đóng</ButtonComponent>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default UpdateBlog;
