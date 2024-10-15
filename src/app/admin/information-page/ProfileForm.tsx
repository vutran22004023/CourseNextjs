"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import ButtonComponment from "@/components/Button/Button";
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
import { toast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  namepage: z
    .string({
      required_error: "Vui lòng nhập name page",
    })
    .min(2, {
      message: "Tên trang web phải ít nhất 2 kí tự",
    })
    .max(30, {
      message: "Tên trang web phải tối đa nhất 30 kí tự",
    }),
  description: z.string().max(300).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="namepage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên trang web</FormLabel>
              <FormControl>
                <Input placeholder="Nhập username" {...field} />
              </FormControl>
              <FormDescription>Tên trang web từ 2-30 kí tự</FormDescription>
              <FormMessage className="text-[red]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả thông tin trang web"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Mô tả trang web từ 4-300 kí tự</FormDescription>
              <FormMessage className="text-[red]" />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-[red]" />
                </FormItem>
              )}
            />
          ))}
          <ButtonComponment
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-[100px]"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </ButtonComponment>
        </div>
        <ButtonComponment type="submit" className="w-[100px] p-">
          Cập nhập
        </ButtonComponment>
      </form>
    </Form>
  );
}
