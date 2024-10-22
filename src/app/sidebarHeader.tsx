"use client";
import React from "react";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
import { usePathname } from "next/navigation";
import Footer from "@/components/Layouts/Footer";

export default function sidebarHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageConfig = {
    hideFooter: ["/course-login", "/online-learning/[param]"],
    hideHeader: ["/course-login", "/online-learning/[param]"],
  };
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn có tham số
  const isPathWithParams =
    pathname.includes("/[param]") || pathname.split("/").length > 2;

  // Điều kiện ẩn header
  const hideHeader =
    pageConfig.hideHeader.some((page) => pathname.startsWith(page)) ||
    isPathWithParams;

  // Điều kiện ẩn footer
  const hideFooter =
    pageConfig.hideFooter.some((page) => pathname.startsWith(page)) ||
    isPathWithParams;

  return (
    <>
      <div>
        {!hideHeader && <HeaderLayout />}
        {!hideHeader ? (
          <div className="mt-10">{children}</div>
        ): (
          <div>{children}</div>
        ) }
        {!hideFooter && (
          <div className="mt-5">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
