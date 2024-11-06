import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "@/components/Button/Button";
import LoginComponent from "./Login";
import { useMutationHook } from "@/hooks";
import { ForgotPassword } from "@/apis/auth";
import { EmailProps } from "@/types";
import { success, error, warning } from "@/components/Message/Message";
import {useTranslation} from "react-i18next";

interface ForPassword {
  status?: any;
  message?: string;
}

export default function Forgotpassword() {
  const [email, setemail] = useState("");
  const {t} = useTranslation('common');
  const hanleOchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const mutationForPassword = useMutationHook(async (email: EmailProps) => {
    const res = await ForgotPassword(email);
    return res;
  });

  const { data: dataForPassword, isPending: __isLoadingForPass } =
    mutationForPassword;

  useEffect(() => {
    if ((dataForPassword as ForPassword)?.status === 200) {
      success(t('status.successForgotPass'));
    } else if ((dataForPassword as ForPassword)?.status === "ERR") {
      error(t('status.errorForgotPass'));
    }
  }, [dataForPassword]);
  const handleButtonForPassword = () => {
    mutationForPassword.mutate({ email });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="text-left  grid gap-2">
        <Label htmlFor="email" className="text-[15px]">
          Email
        </Label>
        <Input
          value={email}
          name="email"
          onChange={hanleOchangeEmail}
          className="col-span-3 w-[320px] md:w-[400px] h-[38px] bg-white"
          style={{ borderRadius: "20px", padding: "10px" }}
          placeholder="Enter email"
        />
      </div>

      <div className="w-full">
        {(dataForPassword as ForPassword)?.status === "ERR" && (
          <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
            <div className="text-[red]">
              {(dataForPassword as ForPassword)?.message}
            </div>
          </div>
        )}
        {(dataForPassword as ForPassword)?.status === 200 && (
          <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
            <div className="text-[#32b030]">
              {(dataForPassword as ForPassword)?.message}
            </div>
          </div>
        )}
        <ButtonComponent
          type="login"
          className="p-2 m-0 "
          style={{ border: "1px solid #9c9c9c" }}
          onClick={handleButtonForPassword}
          disabled={email?.length ? false : true}
        >
          <div className="font-bold">Reset password</div>
        </ButtonComponent>
      </div>
    </div>
  );
}
