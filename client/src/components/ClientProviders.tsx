"use client";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store, persistor, AppDispatch, RootState } from "@/redux/store";
import queryClient from "@/lib/react-query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { initializeUser } from "@/utils/auth";
import { PersistGate } from "redux-persist/integration/react";

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

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
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

export default ClientProviders;
