import axios, { AxiosResponse } from "axios";
import axiosInstance from "./index";
//begin api thanh toán PayOs
export const CreateLinkPayOs = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/create-payment-link`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const ReceiveHook = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/receive-hook`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const InfomationsPayment = async (id: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/pay/get-payment-infomations/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const CancelPaymentLink = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/pay/cancel-payment-link/:idorder`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
export const ConfirmWebhookPayos = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/confirm-webhook-payos`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
//end api thanh toán PayOs

//begin api thanh toán ZaloPay
export const PaymentZalopay = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/payment-zalopay`,data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const CallbackZalo = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/callback-zalo`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const StatusZalopay = async (id: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/order-status-zalopay/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const TransactionRefund = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/transaction-refund`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const RefundStatus = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/transaction-refund-status`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
// end api thanh toán ZaloPay

export const InformationCourse = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/information-course`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const PostInformationCourse = async (data: any) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `/api/pay/post-information-course`, data
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const UpdateInformation = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/pay/update-information-course/:id`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};

export const DeleteInformation = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/api/pay/delete-information-course/:id`
    );
    return response.data;
  } catch {
    throw new Error("Error create courses");
  }
};
