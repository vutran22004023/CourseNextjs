"use client";
import React, { useEffect } from "react";
import Text from "@/components/Text/text";
import IconErPay from "@/assets/Images/credit-card.png";
import IconSuccPay from "@/assets/Images/payment-status.png";
import Image from "next/image";
import ButtonComponent from "@/components/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  StatusZalopay,
  PostInformationCourse,
  InfomationsPayment,
} from "@/apis/pay";
import { useMutationHook } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {useTranslation} from "react-i18next";

export default function page() {
  const {t} = useTranslation('common');
  const idCourse = useSelector((state: RootState) => state.idItemPay);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const cancel = searchParams.get("cancel");
  const orderCode = searchParams.get("orderCode");
  const apptransid = searchParams.get("apptransid");
  if (!status) return router.push("/");

  const handButtonClose = () => {
    router.push("/");
  };
  const mutationInfomationZalopay = useMutationHook(async (data: any) => {
    try {
      const { id } = data;
      const res = await StatusZalopay(id);
      return res;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationStatusPayOs = useMutationHook(async (data: any) => {
    try {
      const { id } = data;
      const res = await InfomationsPayment(id);
      return res;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationPostCourse = useMutationHook(async (data: any) => {
    try {
      const res = await PostInformationCourse(data);
      return res;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (orderCode && status === "PAID") {
      mutationStatusPayOs.mutate({ id: orderCode });
    }
  }, [orderCode]);

  useEffect(() => {
    if (apptransid && status === "1") {
      mutationInfomationZalopay.mutate({ id: apptransid });
    }
  }, [apptransid, status]);

  const { data: statusZaloPay, isPending: isLoaidngZaloPay } =
    mutationInfomationZalopay;
  const { data: statusPayOs, isPending: isLoadingPayOs } = mutationStatusPayOs;
  useEffect(() => {
    if (statusZaloPay?.returnmessage === "Giao dịch thành công" && idCourse) {
      mutationPostCourse.mutate({
        idUser: user?.id,
        courseId: idCourse?.id,
        paymentStatus: "completed",
        money: statusZaloPay?.amount,
      });
    }
  }, [statusZaloPay]);

  useEffect(() => {
    if (statusPayOs?.status === "PAID") {
      mutationPostCourse.mutate({
        idUser: user?.id,
        courseId: idCourse?.id,
        paymentStatus: "completed",
        money: statusPayOs?.amount,
      });
    }
  }, [statusPayOs]);
  return (
    <div className="w-full justify-center items-center mt-12 flex">
      {status === "CANCELLED" || status === "-49" ? (
        <div className="w-[60%] bg-slate-200 p-4 rounded-md text-center flex flex-col items-center">
          <Image
            src={IconErPay}
            alt="IconErr"
            width={100}
            height={100}
            className="mb-3"
          />
          <Text type="title" className="text-center mb-2">
            {t('Pay.PaymentFailed')}
          </Text>
          <Text type="default" className="text-center mb-2">
            {t('Pay.NotificationFailed')}
          </Text>
          <div
            className="flex justify-center gap-4 px-3 py-3"
            onClick={handButtonClose}
          >
            <ButtonComponent>{t('Pay.HomePage')}</ButtonComponent>
          </div>
        </div>
      ) : (
        <div className="w-[60%] bg-slate-200 p-4 rounded-md text-center flex flex-col items-center">
          <Image
            src={IconSuccPay}
            alt="IconErr"
            width={100}
            height={100}
            className="mb-3"
          />
          <Text type="title" className="text-center mb-2">
            {t('Pay.PaymentSuccessful')}
          </Text>
          <Text type="default" className="text-center mb-2">
            {t('Pay.NotificationSuccessful')}
          </Text>
          <div className="flex justify-center gap-4 ">
            <div className="px-3 py-3" onClick={handButtonClose}>
              <ButtonComponent>{t('Pay.HomePage')}</ButtonComponent>
            </div>
            <div className="px-3 py-3" onClick={handButtonClose}>
              <ButtonComponent>{t('Pay.myCourse')}</ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
