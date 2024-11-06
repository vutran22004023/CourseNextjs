"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import ButtonComponent from "@/components/Button/Button";
import { ResetPassProps } from "@/types";
import { useMutationHook } from "@/hooks";
import { ResetPass } from "@/apis/auth";
import { success, error, warning } from "@/components/Message/Message";
import Text from "@/components/Text/text";
import {useTranslation} from "react-i18next";

interface dataResetPassProps {
  status?: any;
  message?: string;
}
export default function FormResetPass() {
  const {t} = useTranslation('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokens = searchParams.get("token");
  const name = searchParams.get("name");
  if (!tokens || !name) return router.push("/");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [countdown, setCountdown] = useState(5);
  const [resetPass, setResetPass] = useState<ResetPassProps>({
    password: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    setResetPass({
      ...resetPass,
      token: tokens || "",
    });
  }, [tokens]);
  const [isError, setIsError] = useState(false);
  const [isErrPassword, setIsErrPassword] = useState(false);

  const handleOnChangeResetPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
    const updateresetPass = {
      ...resetPass,
      [name]: value,
    };
    const hasEmptyField = Object.values(updateresetPass).some(
      (field) => field === ""
    );

    setResetPass(updateresetPass);

    setIsError(hasEmptyField);
  };

  useEffect(() => {
    if (!isError) {
      const isPasswordMatch = resetPass.password === resetPass.confirmPassword;
      setIsErrPassword(isPasswordMatch);
      if (resetPass.password === resetPass.confirmPassword) {
        setIsErrPassword(true);
      } else if (resetPass.password !== resetPass.confirmPassword) {
        setIsErrPassword(false);
      }
    }
  }, [resetPass]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const mutationResetPass = useMutationHook(async (data: ResetPassProps) => {
    const res = await ResetPass(data);
    return res;
  });

  const { data: dataResetPass, isPending: __isLoadingResetPass } =
    mutationResetPass;

  useEffect(() => {
    if ((dataResetPass as dataResetPassProps)?.status === 200) {
      success("Bạn đã đặt mật khẩu thành công");
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        router.push("/");
        window.location.reload();
      }, 5000);
      return () => clearInterval(interval);
    } else if ((dataResetPass as dataResetPassProps)?.status === "ERR") {
      error("Đổi mật khẩu thất bại");
    }
  }, [dataResetPass]);
  const handleconfirmResetPass = () => {
    mutationResetPass.mutate(resetPass);
  };

  return (
    <div className="container mt-20 w-full flex justify-center items-center text-center">
      <div
        className="border-dotted w-[600px]  bg-[#fbfbfb] border-2 p-7"
        style={{ borderRadius: "20px" }}
      >
        <Text className="cactus-classical-serif-md text-[25px] mb-3">
          {t('ResetPassword.Reset')}
        </Text>
        <Text className="cactus-classical-serif-md text-[15px] mb-2">
          {t('ResetPassword.Hello')}, {name}
        </Text>
        <Text className="text-[12px]">
          {t('ResetPassword.Pls')}
        </Text>
        <div className="mt-7">
          <div className=" grid gap-2 ml-4">
            <Label htmlFor="password" className="mb-1 text-left">
              {t('ResetPassword.NewPass')}
            </Label>
            <div className="relative w-[500px]">
              <Input
                type={showPassword ? "text" : "password"}
                className="col-span-3 w-full"
                style={{ borderRadius: "10px", padding: "20px" }}
                placeholder="Mật khẩu mới"
                value={resetPass.password}
                onChange={handleOnChangeResetPass}
                name="password"
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
            <Label htmlFor="confirmPassword" className="mb-1 text-left">
              {t('ResetPassword.ConfirmPass')}
            </Label>
            <div className="relative w-[500px]">
              <Input
                name="confirmPassword"
                value={resetPass.confirmPassword}
                onChange={handleOnChangeResetPass}
                type={showConfirmPassword ? "text" : "password"}
                className="col-span-3 w-full"
                style={{ borderRadius: "10px", padding: "20px" }}
                placeholder="Xác nhận mật khẩu mới"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                style={{ padding: "0 10px" }}
              >
                {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <div className="relative w-[500px] mt-2">
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
                {passwordStrength === 0 && "Mật khẩu yếu"}
                {passwordStrength === 1 && "Mật khẩu yếu"}
                {passwordStrength === 2 && "Mật khẩu trung bình"}
                {passwordStrength === 3 && "Mật khẩu mạnh"}
              </div>
              <div className="bg-[#eaeaea] rounded-sm  text-[10px]">
                <div className="text-[red] p-1 text-left">
                  {passwordStrength === 0
                    ? "Mật khẩu phải có ít nhất 6 kí tự, chứa ít nhất một chữ cái in hoa và kết thúc bằng một kí tự đặc biệt."
                    : passwordStrength === 1
                    ? "Mật khẩu phải chứa ít nhất một chữ cái in hoa và kết thúc bằng một kí tự đặc biệt."
                    : passwordStrength === 2
                    ? "Mật khẩu phải kết thúc bằng một kí tự đặc biệt."
                    : passwordStrength === 3
                    ? ""
                    : ""}
                </div>
                {!isError && !isErrPassword && (
                  <Text className="text-[red] p-1 text-left">
                    {t('ResetPassword.Check')}
                  </Text>
                )}

                {(dataResetPass as dataResetPassProps)?.status === "ERR" && (
                  <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                    <div className="text-[red]">
                      {(dataResetPass as dataResetPassProps)?.message}
                    </div>
                  </div>
                )}
                {(dataResetPass as dataResetPassProps)?.status === 200 && (
                  <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                    <div className="text-[#32b030]">
                      {(dataResetPass as dataResetPassProps)?.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full mt-2">
                <ButtonComponent
                  className={`p-5 m-0 mb-4 `}
                  style={{
                    border: "1px solid #9c9c9c",
                  }}
                  disabled={
                    !isError && passwordStrength === 3 && isErrPassword
                      ? false
                      : true
                  }
                  onClick={handleconfirmResetPass}
                >
                  <div className="cactus-classical-serif-md">
                    {/* <IsLoadingComponment IsLoading={isLoadingdataRegister}>
              Đăng ký ngay
            </IsLoadingComponment> */}
                    {t('ResetPassword.Reset')}
                  </div>
                </ButtonComponent>
              </div>

              {(dataResetPass as dataResetPassProps)?.status === 200 && (
                <Text className="mt-2">
                  {t('ResetPassword.Alert')} {countdown}s
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
