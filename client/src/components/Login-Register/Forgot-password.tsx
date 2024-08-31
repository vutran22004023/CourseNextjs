import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "@/components/Button/Button";
import { useMutationHook } from "@/hooks";
import { ForgotPassword } from "@/apis/auth";
import { EmailProps } from "@/types/index";
import { success, error, warning } from "@/components/Message/Message";

interface ForPassword {
  status?: any;
  message?: string;
}
export default function Forgotpassword() {
  const [email, setemail] = useState("");

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
      success("Đã gửi form để xác nhận email");
    } else if ((dataForPassword as ForPassword)?.status === "ERR") {
      error("Đặt lại mật khẩu thất bại");
    }
  }, [dataForPassword]);
  const handleButtonForPassword = () => {
    mutationForPassword.mutate({ email });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="text-left  grid gap-2">
        <Label htmlFor="name" className="">
          Email
        </Label>
        <Input
          value={email}
          name="email"
          onChange={hanleOchangeEmail}
          className="col-span-3 w-[400px] "
          style={{ borderRadius: "10px", padding: "20px" }}
          placeholder="Nhập email"
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
          className=" p-5 m-0 mb-4"
          style={{ border: "1px solid #9c9c9c" }}
          onClick={handleButtonForPassword}
          disabled={email?.length ? false : true}
        >
          <div className="cactus-classical-serif-md">Đặt lại mật khẩu</div>
        </ButtonComponent>
      </div>
    </div>
  );
}
