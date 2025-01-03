import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "@/components/Button/Button";
import { Eye, EyeOff } from "lucide-react";
import { useMutationHook } from "@/hooks";
import { Register } from "@/apis/auth";
import { Registers } from "@/types";
import IsLoadingComponment from "@/components/Loading/Loading";
import { success, error, warning } from "@/components/Message/Message";
import {useTranslation} from "react-i18next";

export default function RegisterComponment() {
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [register, setRegister] = useState<Registers>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [isErrPass, setIsErrPass] = useState(false);
  const [isErrEmail, setIsErrEmail] = useState(false);
  const {t} = useTranslation('common');

  const handleOnChangeregister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }

    const updatedRegister = {
      ...register,
      [name]: value,
    };
    // Kiểm tra xem có trường nào rỗng không
    const hasEmptyField = Object.values(updatedRegister).some(
      (field) => field === ""
    );

    // Nếu có trường rỗng, đặt isError thành true, ngược lại đặt thành false
    setRegister(updatedRegister);
    setIsError(hasEmptyField);
  };

  useEffect(() => {
    if (!isError) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isEmailValid =
        register?.email?.trim() !== "" &&
        mailformat.test(register?.email || "");
      const isPasswordMatch = register.password === register.confirmPassword;
      setIsErrEmail(isEmailValid);
      setIsErrPass(isPasswordMatch);
    }
  }, [register]);

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

  const mutationRegister = useMutationHook(async (registerData: Registers) => {
    const res = await Register(registerData);
    return res;
  });

  const { data: dataRegister, isPending: isLoadingdataRegister } =
    mutationRegister;

  useEffect(() => {
    if ((dataRegister as { status?: number })?.status === 200) {
      success(t('successRegister'));
      setRegister({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else if ((dataRegister as { status?: string })?.status === "ERR") {
      error(t('errorRegister'));
    }
  }, [dataRegister]);
  const handleconfirmRegister = () => {
    mutationRegister.mutate(register);
  };

  return (
    <div className="grid gap-1 py-4 overflow-y-auto ">
      <div className="text-left  grid gap-2">
        <Label htmlFor="name" className="text-[15px]">
          {t('name')}
        </Label>
        <Input
          name="name"
          value={register.name}
          onChange={handleOnChangeregister}
          className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
          style={{ borderRadius: "20px", padding: "10px" }}
          placeholder="Enter your name"
        />
      </div>
      <div className="text-left grid gap-2">
        <Label htmlFor="email" className="text-[15px]">
          Email
        </Label>
        <Input
          name="email"
          value={register.email}
          onChange={handleOnChangeregister}
          className="col-span-3 w-[320px] md:w-[400px] mb-[8px] h-[38px] bg-white"
          style={{ borderRadius: "20px", padding: "10px" }}
          placeholder="Enter your email"
        />
      </div>
      <div className="text-left grid gap-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
            style={{ borderRadius: "20px", padding: "10px" }}
            placeholder="Password"
            value={register.password}
            onChange={handleOnChangeregister}
            name="password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-[1px] opacity-40 pr-3 flex items-center"
            style={{ padding: "0 10px" }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="relative">
          <Input
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleOnChangeregister}
            type={showConfirmPassword ? "text" : "password"}
            className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
            style={{ borderRadius: "20px", padding: "10px" }}
            placeholder="Password authentication"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-[1px] opacity-40 pr-3 flex items-center"
            style={{ padding: "0 10px" }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="relative w-[320px] md:w-[400px] mt-2">
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
            {passwordStrength === 0 && t('weakPassword')}
            {passwordStrength === 1 && t('weakPassword')}
            {passwordStrength === 2 && t('averagePassword')}
            {passwordStrength === 3 && t('strongPassword')}
          </div>
          {!isError && !isErrPass ? (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">
                {t('passwordMismatchNotification')}
              </div>
            </div>
          ) : null}

          {!isError && !isErrEmail ? (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">{t('emailFormatIsIncorrect')}</div>
            </div>
          ) : null}

          {isError && (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">
                {t('FillInTheInformationInTheNotification')}
              </div>
              <div className="text-[red]">
                {passwordStrength === 0
                  ? t('passwordErrorMessage')
                  : passwordStrength === 1
                  ? t('passwordErrorMessage1')
                  : passwordStrength === 2
                  ? t('passwordErrorMessage2')
                  : passwordStrength === 3
                  ? ""
                  : ""}
              </div>
            </div>
          )}
          {}

          {dataRegister &&
            (dataRegister as { status?: number }).status === 200 && (
              <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                <div className="text-[#37d249]">
                  {(dataRegister as { message?: string })?.message}
                </div>
              </div>
            )}
          {dataRegister &&
            (dataRegister as { status?: string }).status === "ERR" && (
              <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                <div className="text-[red]">
                  {(dataRegister as { message?: string })?.message}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="w-full">
        <ButtonComponent
          type="login"
          className={`p-2 m-0 `}
          disabled={!isError && isErrPass && isErrEmail ? false : true}
          onClick={handleconfirmRegister}
        >
          <div className="font-bold">
            <IsLoadingComponment IsLoading={isLoadingdataRegister}>
              {t('signUpNow')}
            </IsLoadingComponment>
          </div>
        </ButtonComponent>
      </div>
    </div>
  );
}
