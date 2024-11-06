import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import ButtonComponent from '@/components/Button/Button';
import Text from '@/components/Text/text';
import {success, error} from '@/components/Message/Message';
// Schema Definitions
const ItemSchema = z.object({
    label: z.string().nonempty(),
    link: z.string().optional(),
});

const FooterItemSchema = z.object({
    title: z.string().nonempty(),
    items: z.array(ItemSchema),
});

const SocialMediaSchema = z.object({
    platform: z.string().nonempty(),
    url: z.string().nonempty(),
});

const ContactInfoSchema = z.object({
    phone: z.string().nonempty(),
    email: z.string().email(),
    address: z.string().nonempty(),
});

const InformationPageSchema = z.object({
    footer: z.array(FooterItemSchema),
    socialMediaLinks: z.array(SocialMediaSchema),
    contactInfo: ContactInfoSchema,
});

type InformationPageValues = z.infer<typeof InformationPageSchema>;

interface Props {
    dataInformation: any;
    mutationUpdatePage: any;
}

const FormProfileFooter = ({ dataInformation, mutationUpdatePage }: Props) => {
    const form = useForm<InformationPageValues>({
        resolver: zodResolver(InformationPageSchema),
        mode: "onChange",
    });
    const { control, handleSubmit } = form;
    const { fields: footerFields, append: appendFooter, remove: removeFooter } = useFieldArray({ control, name: 'footer' });
    const { fields: socialMediaFields, append: appendSocialMedia, remove: removeSocialMedia } = useFieldArray({ control, name: 'socialMediaLinks' });

    useEffect(() => {
        form.reset({
            footer: dataInformation?.footer ? [...dataInformation.footer] : [{ title: '', items: [] }],
            socialMediaLinks: dataInformation?.socialMediaLinks ? [...dataInformation.socialMediaLinks] : [{ platform: '', url: '' }],
            contactInfo: dataInformation?.contactInfo || { phone: '', email: '', address: '' },
        });
    }, [dataInformation, form]);

    const onSubmit = (data: InformationPageValues) => {
        mutationUpdatePage.mutate(data, {
            onSuccess: () => {
                success("Cập nhập thành công");
            },
            onError: () => {
                error("Cập nhập không thành công");
            }
        });
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Contact Info */}
                    {/* Contact Info Fields */}
                    <FormField
                        control={control}
                        name="contactInfo.phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="contactInfo.address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="contactInfo.email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Footer Paths */}
                    <div>
                        <Text type="defaultSemiBold">Footer Links</Text>
                        {footerFields.map((field, index) => (
                            <div key={field.id} className="mt-5">
                                {/* Footer Title Field */}
                                <FormField
                                    control={control}
                                    name={`footer.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between">
                                                <FormLabel>Footer Title</FormLabel>
                                                <ButtonComponent
                                                    type="courseHeader"
                                                    className="flex p-2 justify-center"
                                                    onClick={() => removeFooter(index)}
                                                >
                                                    Remove Footer Section
                                                </ButtonComponent>
                                            </div>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter footer title" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Nested Items for Footer */}
                                <FooterItems control={control} name={`footer.${index}.items`} />
                            </div>
                        ))}
                        <ButtonComponent
                            className="flex p-2 justify-center mt-4"
                            type="courseHeader"
                            onClick={() => appendFooter({ title: "", items: [] })}
                        >
                            Add Footer Link
                        </ButtonComponent>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <Text type="defaultSemiBold">Social Media Links</Text>
                        {socialMediaFields.map((field, index) => (
                            <div key={field.id} className="mt-5 flex gap-3">
                                {/* Social Media Fields */}
                                <FormField
                                    control={control}
                                    name={`socialMediaLinks.${index}.platform`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Platform</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter platform" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`socialMediaLinks.${index}.url`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter URL" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <ButtonComponent
                                    type="courseHeader"
                                    className="flex p-2 justify-center"
                                    onClick={() => removeSocialMedia(index)}
                                >
                                    Remove
                                </ButtonComponent>
                            </div>
                        ))}
                        <ButtonComponent
                            className="flex p-2 justify-center"
                            type="courseHeader"
                            onClick={() => appendSocialMedia({ platform: '', url: '' })}
                        >
                            Add Social Media Link
                        </ButtonComponent>
                    </div>

                    {/* Submit Button */}
                    <ButtonComponent onClick={handleSubmit(onSubmit)} type="courseHeader" className="flex p-3 justify-center">
                        Update
                    </ButtonComponent>
                </form>
            </Form>
        </div>
    );
};

// Extract nested items to avoid hook re-rendering issues
const FooterItems = ({ control, name }: { control: any; name: string }) => {
    const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
        control,
        name,
    });

    return (
        <div>
            <h4>Items</h4>
            {itemFields.map((item, itemIndex) => (
                <div key={item.id} className="flex items-center space-x-4 mt-2">
                    <FormField
                        control={control}
                        name={`${name}.${itemIndex}.label`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter label" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`${name}.${itemIndex}.link`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter link" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ButtonComponent
                        type="courseHeader"
                        className="p-2"
                        onClick={() => removeItem(itemIndex)}
                    >
                        Remove
                    </ButtonComponent>
                </div>
            ))}
            <ButtonComponent
                type="courseHeader"
                className="flex p-2 justify-center"
                onClick={() => appendItem({ label: '', link: '' })}
            >
                Add Item
            </ButtonComponent>
        </div>
    );
};

export default FormProfileFooter;
