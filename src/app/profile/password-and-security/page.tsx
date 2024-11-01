"use client";
import {ArrowBigRight, Eye, EyeOff} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ResetPassUser} from "@/apis/auth"
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ButtonComponment from "@/components/Button/Button";
import ButtonComponent from "@/components/Button/Button";
import Text from "@/components/Text/text";
import React, {useEffect, useState} from "react";
import {error, success} from "@/components/Message/Message";
import {ResetPassProps} from "@/types";
import {useMutationHook} from "@/hooks";
import IsLoadingComponment from "@/components/Loading/Loading";

export default function PasswordAndSecurity() {
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [password, setPassword] = useState<ResetPassProps>({
        password: "",
        confirmPassword: "",
    });
    const [isError, setIsError] = useState(false);
    const [isErrPass, setIsErrPass] = useState(false);
    const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "password") {
            const strength = checkPasswordStrength(value);
            setPasswordStrength(strength);
        }

        const updatedPassword = {
            ...password,
            [name]: value,
        };
        // Kiểm tra xem có trường nào rỗng không
        const hasEmptyField = Object.values(updatedPassword).some(
            (field) => field === ""
        );

        // Nếu có trường rỗng, đặt isError thành true, ngược lại đặt thành false
        setPassword(updatedPassword);
        setIsError(hasEmptyField);
    };

    useEffect(() => {
        if (!isError) {
            const isPasswordMatch = password.password === password.confirmPassword;
            setIsErrPass(!isPasswordMatch);
        }
    }, [password]);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!showConfirmPassword);
    };
    const checkPasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };
    const getStrengthColor = (strength: number): string => {
        if (strength === 1) return "red";
        if (strength === 2) return "orange";
        if (strength === 3) return "green";
        return "gray";
    };
    const mutationPassword = useMutationHook(async (passwordData: ResetPassProps) => {
        try {
            const res = await ResetPassUser(passwordData);
            return res;
        }catch (e) {
            console.log(e);
        }
    });
    const {data: dataPassword, isPending: isLoadingdataPassword} =
        mutationPassword;
    console.log("Phản hồi từ ResetPass:", dataPassword);

    useEffect(() => {
        if ((dataPassword as { status?: number })?.status === 200) {
            success("Đã đổi mật khẩu thành công");
            setPassword({
                password: "",
                confirmPassword: "",
            });
        } else if ((dataPassword as { status?: string })?.status === "ERR") {
            error("Đổi mật khẩu thất bại");
        }
    }, [dataPassword]);
    const handleconfirmPassword = () => {
        console.log("handleconfirmPassword được gọi");
        mutationPassword.mutate(password);
    };

    return (
        <div className="containerw-full" style={{padding: "0 90px"}}>
            <div className="flex justify-center font-semibold mb-5"><Text className="text-[25px] ">Mật khẩu và bảo
                mật</Text></div>

            <div>
                <Text className="text-[20px] mb-5">Đăng nhập & khôi phục</Text>
                <p className="mb-10 text-[14px]">Quản lý mật khẩu và xác minh 2 bước</p>
            </div>

            <div className="w-full bg-slate-300" style={{borderRadius: "20px"}}>
                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                            style={{borderRadius: "20px 20px 0 0"}}
                        >
                            <div>
                                <Text className="cactus-classical-serif-md">Đổi mật khẩu</Text>
                                <Text className="">Chưa đổi mật khẩu</Text>
                            </div>
                            <div>
                                <ArrowBigRight className="w-[50px] h-[50px]"/>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>Cập nhật mật khẩu </DialogTitle>
                            <DialogDescription>
                                Thay đổi mật khẩu của bạn
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 relative items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    New password
                                </Label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    className="col-span-3 w-[200px] md:w-[250px] h-[38px] bg-white"
                                    style={{borderRadius: "20px", padding: "10px"}}
                                    placeholder="Password"
                                    value={password.password}
                                    onChange={handleOnChangePassword}
                                    name="password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute h-[50px] inset-y-0 right-[45px] top-[-5px] opacity-40 pr-3 flex items-center"
                                    style={{padding: "0 10px"}}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 relative">
                                <Label htmlFor="username" className="text-right">
                                    Confirm password
                                </Label>
                                <Input
                                    name="confirmPassword"
                                    value={password.confirmPassword}
                                    onChange={handleOnChangePassword}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="col-span-3 w-[200px] md:w-[250px] h-[38px] bg-white"
                                    style={{borderRadius: "20px", padding: "10px"}}
                                    placeholder="Password authentication"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 h-[50px] right-[45px] top-[-5px] opacity-40 pr-3 flex items-center"
                                    style={{padding: "0 10px"}}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            <div className="relative w-[200px] md:w-[375.4px] mt-2">
                                <div className="flex items-center">
                                    <div
                                        style={{
                                            height: "5px",
                                            flex: 1,
                                            backgroundColor: getStrengthColor(passwordStrength),
                                        }}
                                    ></div>
                                </div>
                                <div className="text-right text-sm mt-1">
                                    {passwordStrength === 0 && "Weak password"}
                                    {passwordStrength === 1 && "Weak password"}
                                    {passwordStrength === 2 && "Average Password"}
                                    {passwordStrength === 3 && "Strong password"}
                                </div>
                                {!isError && !isErrPass ? (
                                    <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                                        <div className="text-[red]">
                                            Password and confirm password do not match
                                        </div>
                                    </div>
                                ) : null}

                                {isError && (
                                    <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                                        <div className="text-[red]">
                                            Please enter your password, confirm password
                                        </div>
                                        <div className="text-[red]">
                                            {passwordStrength === 0
                                                ? "Password must be at least 6 characters, contain at least one uppercase letter, and end with a special character."
                                                : passwordStrength === 1
                                                    ? "Password must contain at least one uppercase letter and end with a special character."
                                                    : passwordStrength === 2
                                                        ? "Password must end with a special character."
                                                        : passwordStrength === 3
                                                            ? ""
                                                            : ""}
                                        </div>
                                    </div>
                                )}
                                {}

                                {dataPassword &&
                                    (dataPassword as { status?: number }).status === 200 && (
                                        <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                                            <div className="text-[#37d249]">
                                                {(dataPassword as { message?: string })?.message}
                                            </div>
                                        </div>
                                    )}
                                {dataPassword &&
                                    (dataPassword as { status?: string }).status === "ERR" && (
                                        <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                                            <div className="text-[red]">
                                                {(dataPassword as { message?: string })?.message}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <DialogFooter>
                            <ButtonComponent
                                type="login"
                                className={`p-2 m-0 cursor-pointer flex justify-center  `}
                                disabled={isError || !isErrPass}
                                onClick={handleconfirmPassword}
                            >
                                <div className="font-bold">
                                    <IsLoadingComponment IsLoading={isLoadingdataPassword}>
                                        Save change
                                    </IsLoadingComponment>
                                </div>
                            </ButtonComponent>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <hr/>
                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
                            style={{borderRadius: "0 0 20px 20px"}}
                        >
                            <div>
                                <div className="cactus-classical-serif-md">Xác minh 2 bước</div>
                                <div className="">Đang tắt</div>
                            </div>
                            <div>
                                <ArrowBigRight className="w-[50px] h-[50px]"/>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-50">
                        <DialogHeader>
                            <DialogTitle>Chập nhập tên của bạn </DialogTitle>
                            <DialogDescription>
                                Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và
                                bài viết của bạn
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <ButtonComponment className="" style={{}}>
                                Save changes
                            </ButtonComponment>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
