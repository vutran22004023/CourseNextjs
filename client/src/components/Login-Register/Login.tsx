'use client'
import React, { useState, useEffect, useRef  } from "react";
import { User, ArrowBigLeft,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/Modal/Modal";
import ButtonComponent from "@/components/Button/Button";
import ForgotPassComponent from "@/components/Login-Register/Forgot-password";
import iconfb from "@/assets/Images/icon_fb.png";
import icongg from "@/assets/Images/icon_google.png";
import icongit from "@/assets/Images/icon_git.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Register from "@/components/Login-Register/Register";
import { Eye, EyeOff } from "lucide-react";
import { useMutationHook } from "@/hooks";
import {  Login } from "@/apis/auth";
import { LoginProps } from "@/types";
import {
  success,
  error,
  warning,
} from "@/components/Message/Message";
import { useRouter } from 'next/navigation';
import IsLoadingComponment from "@/components/Loading/Loading";
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/Slides/userSide";
type DataLogin = {
  status?: any;
  access_Token?: string;
  message?: string,
  id?: string;
};
export default function LoginComponent(style : any) {
  const router  = useRouter();
  const dispatch = useDispatch();
  const [isModalInputLogin, setIsModalInputLogin] = useState(true);
  const [isModalForgotPass, setIsModalForgotPass] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [login, setlogin] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const navigate = (path: string) => {
    router.push(path);
  };
  const handleOnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedLogin = {
      ...login,
      [name]: value,
    };

    const hasEmptyField = Object.values(updatedLogin).some(
      (field) => field === ""
    );

    setlogin(updatedLogin);
    setIsError(hasEmptyField);
  };

  const mutationLogin = useMutationHook(async (datalogin: LoginProps) => {
    const res = await Login(datalogin);
    return res;
  });

  const { data: datalogin, isPending: isLoaidngComponment } = mutationLogin;

  useEffect(() => {
    if ((datalogin as DataLogin)?.status === 200) {
      success("Bạn đã đăng nhập thành công");
      navigate("/");
      setlogin({
        email: "",
        password: "",
      });
      dispatch(updateUser({_id: (datalogin as DataLogin).id, access_Token:(datalogin as DataLogin).access_Token}))
      window.location.reload();
    } else if ((datalogin as DataLogin)?.status === "ERR") {
      error("Đăng nhập thất bại");
    }
  }, [datalogin]);

  const handleOnClickLogin = () => {
    mutationLogin.mutate(login);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleIsModalInputLogin = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(false);
    setIsModalRegister(false);
  };

  const handleCloseisModalLogin = () => {
    setIsModalInputLogin(true);
    setIsModalForgotPass(false);
    setIsModalRegister(false);
  };

  const handleIsModalOpenForPass = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(true);
    setIsModalRegister(false);
  };

  const handleIsModalOpenRegister = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(false);
    setIsModalRegister(true);
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.target === emailRef.current) {
        passwordRef.current?.focus();
      } else if (e.target === passwordRef.current) {
        if(login?.password?.length && login?.email?.length) {
          handleOnClickLogin();
        }
      }
    }
  };

  return (
    <ModalComponent
      triggerContent={
        <Button
        className="bg-gray-300 text-black hover:bg-gray-400 "
        style={{ borderRadius: "20px", ...style, }}
        >
          Đăng nhập / Đăng ký
        </Button>
      }
      contentHeader={
        <>
          <div className="flex justify-center items-center w-full h-full ">
            <div className="text-center">
              <div className="cactus-classical-serif-md text-[25px]">
                Header
              </div>
              <div className="cactus-classical-serif-md text-[25px] ">
                Đăng nhập vào F8
              </div>
            </div>
          </div>
        </>
      }
      contentBody={
        <div className="flex justify-center items-center w-full h-full p-4">
          <div className="text-center">
            {/* Login Modal */}
            <div
              style={{
                display:
                  isModalInputLogin && !isModalForgotPass && !isModalRegister
                    ? "block"
                    : "none",
              }}
            >
              <ButtonComponent
                className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                style={{ border: "1px solid #9c9c9c" }}
                onClick={handleIsModalInputLogin}
              >
                <div className="flex">
                  <User className="right-20 w-[30px] h-[20px] relative" />
                  <div className="cactus-classical-serif-md">
                    Đăng nhập email
                  </div>
                </div>
              </ButtonComponent>
              <ButtonComponent
                className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                style={{ border: "1px solid #9c9c9c" }}
              >
                <div className="flex">
                  <Image
                    src={icongg}
                    alt="icon"
                    className="mr-2 w-[30px] h-[30px] relative right-[70px]"
                  />
                  <div className="cactus-classical-serif-md">
                    Đăng nhập với Google
                  </div>
                </div>
              </ButtonComponent>
              <ButtonComponent
                className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                style={{ border: "1px solid #9c9c9c" }}
              >
                <div className="flex">
                  <Image
                    src={iconfb}
                    alt="icon"
                    className="mr-2 w-[20px] h-[20px] relative right-[60px]"
                  />
                  <div className="cactus-classical-serif-md">
                    Đăng nhập với Facebook
                  </div>
                </div>
              </ButtonComponent>
              <ButtonComponent
                className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                style={{ border: "1px solid #9c9c9c" }}
              >
                <div className="flex">
                  <Image
                    src={icongit}
                    alt="icon"
                    className="mr-2 w-[20px] h-[20px] relative right-[70px]"
                  />
                  <div className="cactus-classical-serif-md">
                    Đăng nhập với Github
                  </div>
                </div>
              </ButtonComponent>
            </div>
            {/* Email Login Form */}
            <div
              style={{
                display:
                  !isModalInputLogin && !isModalForgotPass && !isModalRegister
                    ? "block"
                    : "none",
              }}
            >
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <div className="grid gap-4 py-4">
                <div className="text-left grid gap-2">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    ref={emailRef}
                    name="email"
                    value={login.email}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChangeLogin}
                    className="col-span-3 w-[400px] "
                    style={{ borderRadius: "10px", padding: "20px" }}
                    placeholder="Nhập email"
                  />
                </div>
                <div className="relative w-[400px]">
                  <Input
                    ref={passwordRef}
                    name="password"
                    value={login.password}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChangeLogin}
                    type={showPassword ? "text" : "password"}
                    className="col-span-3 w-full"
                    style={{ borderRadius: "10px", padding: "20px" }}
                    placeholder="Mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{ padding: "0 10px" }}
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </button>
                </div>
                <div className="w-full">
                  {isError && (
                    <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                      <div className="text-[red]">
                        Vui lòng nhập email, mật khẩu
                      </div>
                    </div>
                  )}
                  {(datalogin as DataLogin)?.status === "ERR" && (
                    <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                      <div className="text-[red]">
                        {(datalogin as DataLogin)?.message}
                      </div>
                    </div>
                  )}
                  {(datalogin as DataLogin)?.status === 200 && (
                    <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                      <div className="text-[#32b030]">
                        {(datalogin as DataLogin)?.message}
                      </div>
                    </div>
                  )}
                  <ButtonComponent
                    type='submit'
                    onKeyDown={handleKeyDown}
                    className="p-5 m-0 mb-4"
                    style={{ border: "1px solid #9c9c9c" }}
                    disabled={
                      login?.password?.length && login?.email?.length ? false : true
                    }
                    onClick={handleOnClickLogin}
                  >
                    {isLoaidngComponment ? (
                      <IsLoadingComponment IsLoading={isLoaidngComponment}>
                        ''
                      </IsLoadingComponment>
                    ) : (
                      <div className="cactus-classical-serif-md">Đăng nhập</div>
                    )}
                  </ButtonComponent>
                </div>
              </div>
            </div>
            {/* Forgot Password */}
            <div style={{ display: isModalForgotPass ? "block" : "none" }}>
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <ForgotPassComponent />
            </div>
            {/* Register */}
            <div style={{ display: isModalRegister ? "block" : "none" }}>
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <Register />
            </div>
          </div>
        </div>
      }
      contentFooter={
        <div className="flex justify-center items-center w-full h-full ">
          <div className="text-center">
            <div className="text-[14px] mb-1">
              Bạn chưa có tài khoản?{" "}
              <span>
                <a
                  onClick={handleIsModalOpenRegister}
                  className="text-black hover:text-[#535353]"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Đăng ký
                </a>
              </span>
            </div>
            <div
              className="text-[14px] mb-1"
              style={{ display: isModalForgotPass ? "none" : "block" }}
            >
              <a
                className="text-black hover:text-[#535353]"
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={handleIsModalOpenForPass}
              >
                Quên mật khẩu
              </a>
            </div>
            <div className="text-[10px] ">
              Việc bạn tiếp tục sử dụng trang web nay đồng nghĩa bạn đã đồng ý
              với điều khoản sử dụng của chúng tôi
            </div>
          </div>
        </div>
      }
    />
  );
}
