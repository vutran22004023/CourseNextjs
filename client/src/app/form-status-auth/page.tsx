"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonComponent from "@/components/Button/Button";
import { StatusAuthProps } from "@/types";
import { useMutationHook } from "@/hooks";
import { StatusAuth } from "@/apis/auth";
import { success, error, warning } from "@/components/Message/Message";
import Text from "@/components/Text/text";

interface dataStatusAuthProps {
  status?: any;
  message?: string;
}
export default function FormStatusAuth() {
  const [status, setStatus] = useState({
    status: true,
    token: "",
  });
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokens = searchParams.get("token");
  const name = searchParams.get("user");

  if (!tokens || !name) return router.push("/");
  useEffect(() => {
    setStatus({
      ...status,
      token: tokens || "",
    });
  }, [tokens]);
  const mutationStatusAuth = useMutationHook(async (data: StatusAuthProps) => {
    const res = await StatusAuth(data);
    return res;
  });

  const { data: dataStatusAuth, isPending: __isLoading } = mutationStatusAuth;

  useEffect(() => {
    if ((dataStatusAuth as dataStatusAuthProps)?.status === 200) {
      success("Kích hoạt tài khoản thành công");
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        router.push("/");
        window.location.reload();
      }, 5000);
      return () => clearInterval(interval);
    } else if ((dataStatusAuth as dataStatusAuthProps)?.status === "ERR") {
      error("Kích hoạt tài khoản thất bại.");
    }
  }, [dataStatusAuth]);

  const handlButonConfirmAuth = () => {
    mutationStatusAuth.mutate(status);
  };

  return (
    <div className="container mt-20 w-full flex justify-center items-center text-center">
      <div
        className="border-dotted w-[600px]  bg-[#fbfbfb] border-2 p-7"
        style={{ borderRadius: "20px" }}
      >
        <Text type="mediumTitle" className="mb-3">
          Xác nhận tài khoản
        </Text>
        <Text className="cactus-classical-serif-md text-[15px] mb-2">
          Xin chào, {name}
        </Text>
        <Text className="text-[12px]">
          Hiện tại bạn đã đăng ký thành công, nhưng còn 1 bước xác thực người
          dùng bạn hãy ấn vào button bên dưới để kích hoạt tài khoản
        </Text>
        <div className="mt-7">
          <ButtonComponent
            className={`p-5 m-0 mb-4 `}
            style={{
              border: "1px solid #9c9c9c",
            }}
            onClick={handlButonConfirmAuth}
          >
            <div className="cactus-classical-serif-md">
              {/* <IsLoadingComponment IsLoading={isLoadingdataRegister}>
              Đăng ký ngay
            </IsLoadingComponment> */}
              Kích hoạt tài khoản
            </div>
          </ButtonComponent>
        </div>
        {(dataStatusAuth as dataStatusAuthProps)?.status === 200 && (
          <Text className="mt-2">
            Bạn sẽ được chuyển hướng sau {countdown} giây
          </Text>
        )}
      </div>
    </div>
  );
}
