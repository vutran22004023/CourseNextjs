"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const usePageConfig = () => {
  const pageConfig = useMemo(() => ({
    hideFooter: ["/course-login", "/online-learning/[param]", "/admin"],
    hideHeader: ["/course-login", "/online-learning/[param]"],
  }), []);

  const pathname = usePathname();

  // Check if the path contains parameters
  const isPathWithParams = useMemo(() => {
    return pathname.includes("/[param]") || pathname.split("/").length > 2;
  }, [pathname]);

  // Condition to hide the header
  const hideHeader = useMemo(() => {
    return (
      pageConfig.hideHeader.some((page) => pathname.startsWith(page)) ||
      isPathWithParams
    );
  }, [pathname, pageConfig.hideHeader, isPathWithParams]);

  // Condition to hide the footer
  const hideFooter = useMemo(() => {
    return (
      pageConfig.hideFooter.some((page) => pathname.startsWith(page)) ||
      isPathWithParams
    );
  }, [pathname, pageConfig.hideFooter, isPathWithParams]);

  return { hideHeader, hideFooter };
};

export default usePageConfig;
