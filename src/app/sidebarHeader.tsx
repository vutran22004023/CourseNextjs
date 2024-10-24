"use client";
import React, { useEffect, useState } from "react";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
import Footer from "@/components/Layouts/Footer";
import usePageConfig from "@/hooks/usePageConfig";
import ClientProviders from "@/components/ClientProviders";
import LoadingPage from "../components/Loading/LoadingPage";
import { usePathname } from "next/navigation";

export default function SidebarHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hideHeader, hideFooter } = usePageConfig();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <ClientProviders>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            {!hideHeader && <HeaderLayout />}
            <div className={hideHeader ? "" : "mt-10"}>{children}</div>
            {!hideFooter && (
              <div className="mt-5">
                <Footer />
              </div>
            )}
          </>
        )}
      </ClientProviders>
    </>
  );
}
