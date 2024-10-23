"use client";
import React, { useState, useEffect, useRef } from "react";
import { User, ArrowBigLeft, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/Modal/Modal";
import ButtonComponent from "@/components/Button/Button";
import ForgotPassComponent from "@/components/Login-Register/Forgot-password";
import iconfb from "@/assets/Images/icon_fb.png";
import icongg from "@/assets/Images/icon_google.png";
import orangebg from "@/assets/Images/Rectangle 24.png";
import lamp from "@/assets/Images/Light 3.png";
import brand from "@/assets/Images/brain2.png";
import icongit from "@/assets/Images/icon_git.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Register from "@/components/Login-Register/Register";
import { Eye, EyeOff } from "lucide-react";
import { useMutationHook } from "@/hooks";
import { Login, LoginGoogle } from "@/apis/auth";
import { LoginProps } from "@/types";
import { success, error, warning } from "@/components/Message/Message";
import { useRouter } from "next/navigation";
import IsLoadingComponment from "@/components/Loading/Loading";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/Slides/userSide";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
type DataLogin = {
  status?: any;
  access_Token?: string;
  message?: string;
  id?: string;
};
export default function LoginComponent(style: any) {
  const router = useRouter();
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
      dispatch(
        updateUser({
          _id: (datalogin as DataLogin).id,
          access_Token: (datalogin as DataLogin).access_Token,
        })
      );
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
        if (login?.password?.length && login?.email?.length) {
          handleOnClickLogin();
        }
      }
    }
  };

  const [userGoogle, setUserGoogle] = useState<any>();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    setUserGoogle(res);
  };

  useEffect(() => {
    const loginUserWithGoogle = async () => {
      const res = await LoginGoogle({
        displayName: userGoogle?.user?.displayName,
        email: userGoogle?.user?.email,
        photoURL: userGoogle?.user?.photoURL,
      });
      if (res) {
        if ((res as DataLogin)?.status === 200) {
          success("Bạn đã đăng nhập thành công");
          navigate("/");
          navigate("/");
          dispatch(
            updateUser({
              _id: (res as DataLogin).id,
              access_Token: (res as DataLogin).access_Token,
            })
          );
          window.location.reload();
        }
      }
    };
    loginUserWithGoogle();
  }, [userGoogle]);

  return (
    <ModalComponent
      triggerContent={
        <Button
          className="bg-[#FF5A00] text-[#fff] hover:bg-[#FF5A00] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_12px_rgba(255,255,255,0.6)]"
          style={{ borderRadius: "20px", ...style }}
        >
          Đăng nhập / Đăng ký
        </Button>
      }
      contentHeader={
        <>
          <div className="flex justify-center items-center w-full h-full">
            <Image
              src={orangebg}
              className="w-[454px] h-[170px] md:h-[159px] absolute top-0 z-0"
              alt=""
            />
            <Image
              src={lamp}
              className="w-[40px] absolute top-0 right-[40px] z-10"
              alt=""
            />
            <Image
              src={lamp}
              className="w-[25px] md:w-[20px] absolute top-0 right-[120px] md:right-[150px] z-10"
              alt=""
            />
            <Image
              src={lamp}
              className="w-[25px] md:w-[20px] absolute top-0 left-[120px] md:left-[150px] z-10"
              alt=""
            />
            <Image
              src={lamp}
              className="w-[45px] absolute top-0 left-[40px] z-10"
              alt=""
            />
            <div className="text-center z-20">
              <div className="font-bold text-[25px] mb-[20px] flex justify-center">
                <Image src={brand} className="w-[120px] z-10" alt="" />
              </div>
              <div className="pt-[15px] md:pt-0 font-semibold text-[20px] text-black">
                Login Courseniver
              </div>
            </div>
          </div>
        </>
      }
      contentBody={
        <div className="flex justify-center items-center h-full px-4">
          <div className="text-center flex justify-center items-center">
            {/* Login Modal */}
            <div
              style={{
                display:
                  isModalInputLogin && !isModalForgotPass && !isModalRegister
                    ? "block"
                    : "none",
              }}
            >
              <div className="grid gap-4 py-4 justify-center">
                <div className="text-left ">
                  <Label htmlFor="email" className="text-[15px]">
                    Email
                  </Label>
                  <Input
                    ref={emailRef}
                    name="email"
                    value={login.email}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChangeLogin}
                    className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
                    style={{ borderRadius: "20px", padding: "10px" }}
                    placeholder="Enter email"
                  />
                </div>
                <div className="text-left relative mb-[20px]">
                  <Label htmlFor="password" className="text-[15px]">
                    Password
                  </Label>
                  <Input
                    ref={passwordRef}
                    name="password"
                    value={login.password}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChangeLogin}
                    type={showPassword ? "text" : "password"}
                    className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
                    style={{ borderRadius: "20px", padding: "10px" }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-[2px] opacity-40 pr-3 flex items-center"
                    style={{ padding: "0 10px" }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <div
                    className="text-[12px] w-full pr-2 mb-1 text-right"
                    style={{ display: isModalForgotPass ? "none" : "block" }}
                  >
                    <a
                      className="text-black hover:text-[#535353]"
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={handleIsModalOpenForPass}
                    >
                      forgot password
                    </a>
                  </div>
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
                    type="login"
                    onKeyDown={handleKeyDown}
                    className="p-2 m-0 "
                    style={{ border: "1px solid #9c9c9c" }}
                    disabled={
                      login?.password?.length && login?.email?.length
                        ? false
                        : true
                    }
                    onClick={handleOnClickLogin}
                  >
                    {isLoaidngComponment ? (
                      <IsLoadingComponment IsLoading={isLoaidngComponment}>
                        ''
                      </IsLoadingComponment>
                    ) : (
                      <div className="font-bold">Login</div>
                    )}
                  </ButtonComponent>
                  <div className="text-[13px] mb-1">
                    Don’t have an account?{" "}
                    <span>
                      <a
                        onClick={handleIsModalOpenRegister}
                        className="text-black hover:text-[#535353]"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Sign up
                      </a>
                    </span>
                  </div>
                </div>
              </div>
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
                <div className="flex text-[#FF5A00]">
                  <ArrowBigLeft />{" "}
                  <div className="ml-3 font-bold">Quay lại</div>
                </div>
              </div>
            </div>
            {/* Forgot Password */}
            <div style={{ display: isModalForgotPass ? "block" : "none" }}>
              <div
                className="fixed bottom-[100px] right-[30px] text-black hover:text-[#535353] text-[13px] mb-1"
                onClick={handleCloseisModalLogin}
              >
                <div
                  className=""
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  <div className="">Back to Login</div>
                </div>
              </div>
              <ForgotPassComponent />
            </div>
            {/* Register */}
            <div style={{ display: isModalRegister ? "block" : "none" }}>
              <div
                className="fixed bottom-[100px] right-[30px] text-black hover:text-[#535353] text-[13px] mb-1"
                onClick={handleCloseisModalLogin}
              >
                <div
                  className=""
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  <div className="">Back to Login</div>
                </div>
              </div>
              <Register />
            </div>
          </div>
        </div>
      }
      contentFooter={
        <div className=" w-full h-[70px]">
          <div className="flex items-center justify-center w-full px-[16px] h-[20px]">
            <div className="border-t border-black flex-grow"></div>
            <span className="mx-4 text-gray-500">or login with</span>
            <div className="border-t border-black flex-grow"></div>
          </div>
          <div className="flex justify-center mt-3 gap-2">
            <ButtonComponent
              type="iconlogin"
              className="hover:translate-y-[-3px] transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center">
                <Image
                  src={icongit}
                  alt="icon"
                  className="w-[25px] h-[25px] rounded-full"
                />
              </div>
            </ButtonComponent>
            <ButtonComponent
              type="iconlogin"
              className="hover:translate-y-[-3px] transition-transform duration-300 cursor-pointer"
              onClick={handleLoginWithGoogle}
            >
              <div className="flex items-center">
                <Image
                  src={icongg}
                  alt="icon"
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
            </ButtonComponent>
            <ButtonComponent
              type="iconlogin"
              className="hover:translate-y-[-3px] transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center">
                <Image
                  src={iconfb}
                  alt="icon"
                  className="w-[25px] h-[25px] rounded-full"
                />
              </div>
            </ButtonComponent>
          </div>
        </div>
      }
    />
  );
}
