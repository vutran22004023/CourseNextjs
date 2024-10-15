"use client";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useSWR from "swr";
export const useMutationHook = <TData = unknown, TVariables = unknown>(
  fnCallBack: (variables: TVariables) => Promise<TData>
) => {
  return useMutation({
    mutationFn: fnCallBack,
    onError: (error) => {
      console.error("Mutation error", error);
    },
  });
};

export const useCombinedData = (
  queryKey: string,
  fetcher: () => Promise<any>,
  options?: UseQueryOptions
) => {
  // Sử dụng SWR để fetch dữ liệu
  const { data: dataFromSWR, error: swrError } = useSWR(queryKey, fetcher);

  // Sử dụng TanStack Query để quản lý cache và state
  const {
    data: dataFromQuery,
    error: queryError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: fetcher,
    initialData: dataFromSWR,
    enabled: !!dataFromSWR, // Chỉ chạy query nếu dataFromSWR có dữ liệu
    ...options,
  });

  // Xử lý lỗi nếu có từ SWR hoặc TanStack Query
  const error = swrError || queryError;

  return { data: dataFromQuery, error, isLoading, refetch };
};

export const useDebounce = (value: any, delay: any) => {
  const [valueDebounce, setValueDebounce] = useState();
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, [delay]);
    return () => {
      clearTimeout(handle);
    };
  }, [value]);
  return valueDebounce;
};
