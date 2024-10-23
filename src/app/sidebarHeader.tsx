"use client";
import React from "react";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
import Footer from "@/components/Layouts/Footer";
import usePageConfig from "@/hooks/usePageConfig";
import ClientProviders from "@/components/ClientProviders";
export default function sidebarHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hideHeader, hideFooter } = usePageConfig();

  return (
    <>
      <ClientProviders>
        {!hideHeader && <HeaderLayout />}
        <div className={hideHeader ? "" : "mt-10"}>{children}</div>
        {!hideFooter && (
          <div className="mt-5">
            <Footer />
          </div>
        )}
      </ClientProviders>
    </>
  );
}
