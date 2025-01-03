"use client";
import React, { useEffect, useState } from "react";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
import Footer from "@/components/Layouts/Footer";
import usePageConfig from "@/hooks/usePageConfig";
import LoadingPage from "../components/Loading/LoadingPage";
import { usePathname } from "next/navigation";
import { appWithTranslation } from "next-i18next";
import '@/../i18n';
function SidebarHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hideHeader, hideFooter } = usePageConfig();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const noLoadingPaths = ["/admin", "/profile", "/online-learning"];

  useEffect(() => {
    if (noLoadingPaths.some((path) => pathname.startsWith(path))) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      {!hideHeader && (
          <div className="mb-[80px]">
            <div className="fixed top-0 left-0 right-0 w-full z-10">
              <HeaderLayout/>
            </div>
          </div>
      )}
      <div className={hideHeader ? "" : ""}>{children}</div>
      {!hideFooter && (
          <div className="mt-5">
          <Footer />
        </div>
      )}
    </>
  );
}

export default appWithTranslation(SidebarHeader);
