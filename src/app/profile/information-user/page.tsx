"use client";
import {ArrowBigRight} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ButtonComponment from "@/components/Button/Button";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import Text from "@/components/Text/text";
import {UpdateUser} from "@/apis/user";
import {useMutationHook} from "@/hooks";
import {useEffect, useState} from "react";
import {success} from "@/components/Message/Message";
import {useTranslation} from "react-i18next";

export default function InformationUser() {
    const {t} = useTranslation('common');
    const user = useSelector((state: RootState) => state.user);
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        avatar: "",
        role: "",
    });
    console.log("dữ liệu user", userData);
    useEffect(() => {
        if (user) {
            setUserData({
                name: user?.name,
                password: user?.password,
                email: user?.email,
                avatar: user?.avatar,
                role: user.role,
            });
        }
    }, [user]);
    const mutationUpdateUser = useMutationHook(async (data) => {
        try {
            const res = await UpdateUser(user?.id, data);
            return res?.data;
        } catch (err) {
            console.log(err);
        }
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleUpdateUser = () => {
        mutationUpdateUser.mutate(userData, {
            onSuccess(data, variables, context) {
                success("Cập nhập thành công");
                location.reload();
            },
        });
    };

    return (
        <div className="container w-full">
            <Text type="subtitle">{t('Profile.User.Title')}</Text>
            <div className="mt-3">
                <Text type="defaultSemiBold">
                    {t('Profile.User.Basic')}
                </Text>
                <Text className="mb-10 text-[14px]">
                    {t('Profile.User.Description')}
                </Text>
            </div>

            <div className="w-full bg-slate-300" style={{borderRadius: "20px"}}>
                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                            style={{borderRadius: "20px 20px 0 0"}}
                        >
                            <div>
                                <div className="cactus-classical-serif-md">Email</div>
                                <div className="">{user.email || "Chưa cập nhật"}</div>
                            </div>

                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>{t('Profile.User.UpdateEmail')}</DialogTitle>
                            <DialogDescription>
                             {t('Profile.User.DescEmail')}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={userData.email || "Chưa cập nhật"}
                                    className="col-span-3"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <ButtonComponment
                                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                                onClick={handleUpdateUser}
                            >
                                {t('Profile.User.Update')}
                            </ButtonComponment>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <hr/>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
                            <div>
                                <div className="cactus-classical-serif-md">{t('Profile.User.UserName')}</div>
                                <div className="">{user.name || "Chưa cập nhật"}</div>
                            </div>

                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>{t('Profile.User.UpdateName')}</DialogTitle>
                            <DialogDescription>
                              {t('Profile.User.DescName')}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={userData.name || "Chưa cập nhật"}
                                    className="col-span-3"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <ButtonComponment
                                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                                onClick={handleUpdateUser}
                            >
                                {t('Profile.User.Update')}
                            </ButtonComponment>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <hr/>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
                            <div>
                                <div className="cactus-classical-serif-md">{t('Profile.User.Role')}</div>
                                <div className="">{user.role || "Chưa cập nhật"}</div>
                            </div>

                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>{t('Profile.User.UpdateRole')}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Role
                                </Label>
                                <Input
                                    id="role"
                                    value={userData.role || "Chưa cập nhật"}
                                    className="col-span-3"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <ButtonComponment
                                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                                onClick={handleUpdateUser}
                            >
                                {t('Profile.User.Update')}
                            </ButtonComponment>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <hr/>
                <div
                    className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                    style={{borderRadius: "0 0 20px 20px"}}
                >
                    <div>
                        <div className="cactus-classical-serif-md">{t('Profile.User.Image')}</div>
                        <div className="">
                            <Avatar>
                                <AvatarImage
                                    src={user.avatar || "https://github.com/shadcn.png"}
                                    alt={user.name || "User Avatar"}
                                />
                                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Text className="text-[20px] mt-9">{t('Profile.User.Social')}</Text>
                <Text className="mb-10 text-[14px]">
                 {t('Profile.User.DescSocial')}
                </Text>
            </div>

            <div className="w-full bg-slate-300 mb-[50px]" style={{borderRadius: "20px"}}>
                <div
                    className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                    style={{borderRadius: "20px 20px 0 0"}}
                >
                    <div>
                        <Text className="cactus-classical-serif-md">GitHub</Text>
                        <Text className="">{t('Profile.User.NotUpdate')}</Text>
                    </div>
                </div>
                <hr/>
                <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
                    <div>
                        <Text className="cactus-classical-serif-md">Tên người dùng</Text>
                        <Text className="">{t('Profile.User.NotUpdate')}</Text>
                    </div>
                </div>
                <hr/>
                <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
                    <div>
                        <Text className="cactus-classical-serif-md">Giới thiệu</Text>
                        <Text className="">{t('Profile.User.NotUpdate')}</Text>
                    </div>
                </div>
                <hr/>
                <div
                    className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                    style={{borderRadius: "0 0 20px 20px"}}
                >
                    <div>
                        <div className="cactus-classical-serif-md">{t('Profile.User.Image')}</div>
                        <div className="">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
