'use client'
import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ButtonComponent from '@/components/Button/Button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useDropzone } from 'react-dropzone';
// import { toast } from '@/components/ui/use-toast';
import { GetAllUsers, } from '@/apis/user';
import { useCombinedData, useMutationHook } from '@/hooks';
import { success, error } from '@/components/Message/Message';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '@/firebase/config';
import { v4 } from 'uuid';
import ImageUpload from '@/components/UpLoadImg/ImageUpload';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {getTokenFromCookies} from '@/utils/auth'
interface UpdateProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

// Schema validation using Zod
const userFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên người dùng ít nhất 2 kí tự')
    .max(30, 'Tên người dùng tối đa 30 kí tự'),
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  password: z.string().optional(),
  isAdmin: z.boolean(),
  status: z.boolean(),
  avatar: z.instanceof(File).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UpdateUser: React.FC<UpdateProps> = ({ data, isOpen, onClose }) => {
  const user = useSelector((state: RootState) => state.user);
  const token =getTokenFromCookies()
  const getAllUsers = async () => {
    const res = await GetAllUsers(await token as string);
    return res;
  };

  const { refetch } = useCombinedData('dataAllUserss', getAllUsers);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      ...data,
      avatar: data.avatar ? data.avatar : undefined,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (data.avatar) {
      setImagePreview(data.avatar);
      data.avatar = undefined;
    }
    // Reset form values whenever `data` changes
    form.reset({
      ...data,
      avatar: data.avatar ? data.avatar : undefined,
    });
  }, [data, form]);

  const handleImageUpload = (file: File) => {
    form.setValue('avatar', file);
    setImagePreview(URL.createObjectURL(file));
  };

  const mutationUpdate = useMutationHook(async (dataForm: any) => {
    if (dataForm.avatar) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const snapshot = await uploadBytes(imgRef, dataForm.avatar);
      const url = await getDownloadURL(snapshot.ref);
      dataForm.avatar = url; // replace the File object with the URL string
    }
    const res = await UpdateUser(
      data._id,
      token as string,
      dataForm
    );
    return res;
  });

  const { data: dataUpdateUsers } = mutationUpdate;

  useEffect(() => {
    if (dataUpdateUsers?.status === 200) {
      success(`${dataUpdateUsers?.message}`);
      onClose();
      refetch();
    } else if (dataUpdateUsers?.status === 'ERR') {
      error(`${dataUpdateUsers?.message}`);
    }
  }, [dataUpdateUsers]);

  const onSubmit = (formData: UserFormValues) => {
    mutationUpdate.mutate(formData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className='bg-[#fff] pr-[20px] w-[600px]'>
        <SheetHeader className='mb-3'>
          <SheetTitle>
            <div>Chỉnh sửa người dùng </div>
          </SheetTitle>
        </SheetHeader>
        <div className='max-h-[580px] overflow-y-auto'>
          <Form {...form}>
            <form className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người dùng</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên người dùng' {...field} />
                    </FormControl>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Nhập email' {...field} />
                    </FormControl>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Nhập mật khẩu'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isAdmin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền của người dùng</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? 'true' : 'false'}
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn quyền' />
                        </SelectTrigger>
                        <SelectContent className='bg-[#ececec]'>
                          <SelectItem value='true'>Quản trị viên</SelectItem>
                          <SelectItem value='false'>Người dùng</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? 'true' : 'false'}
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='bg-[#ececec]'>
                          <SelectItem value='true'>Đã xác nhận</SelectItem>
                          <SelectItem value='false'>Chưa xác nhận</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              <ImageUpload onImageUpload={handleImageUpload} />
              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormMessage className='text-[red]' />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className='mt-4'>
                  <img
                    src={imagePreview}
                    alt='Image Preview'
                    className='w-[200px] h-[200px] object-cover rounded-lg'
                  />
                </div>
              )}
            </form>
          </Form>
          <SheetFooter>
            <SheetClose asChild>
              <ButtonComponent
                type='submit'
                onClick={form.handleSubmit(onSubmit)}
              >
                Chỉnh sửa
              </ButtonComponent>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateUser;
