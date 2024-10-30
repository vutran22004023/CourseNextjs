"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store, persistor, AppDispatch, RootState } from "@/redux/store";
import queryClient from "@/lib/react-query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { initializeUser } from "@/utils/auth";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";
import { GetInformationPage } from "@/apis/informationPage";
import {useAtoms} from '@/hooks/useAtom'

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const checkAuth = async () => {
      initializeUser(dispatch); // Make sure you call the function
    };
    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
};

const ClientProviders: React.FC<{ children: React.ReactNode, token: string }> = ({
  children, token
}) => {
  const {setToken,setPages} = useAtoms();
  const pathname = usePathname();
  const [informationPage, setInformationPage] = useState<any>();
  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const res = await GetInformationPage();
        setInformationPage(res);
      } catch (e) {
        console.log(e);
      }
    };
    setToken(token)
    fetchInformation();
  }, []);
  useEffect(() => {
    if (pathname && informationPage) {
      setPages({logo: informationPage.logo, logoSmall: informationPage.logoSmall});
      const pathInfo = informationPage.paths.find(
        (path: any) => path.route === pathname
      );
      if (pathInfo) {
        document.title = `${pathInfo.name} | ${informationPage.name}`;
        const metaDescription = document.querySelector(
          "meta[name='description']"
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", pathInfo.description);
        } else {
          const newMetaDescription = document.createElement("meta");
          newMetaDescription.name = "description";
          newMetaDescription.content = pathInfo.description;
          document.head.appendChild(newMetaDescription);
        }
      } else {
        document.title = informationPage.name;
        const metaDescription = document.querySelector(
          "meta[name='description']"
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", "Mô tả không tìm thấy.");
        }
      }
    }
  }, [pathname, informationPage]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} position="top-right" /> */}
          </AuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default ClientProviders;
