"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const usePageConfig = () => {
  const pageConfig = useMemo(
      () => ({
        hideFooter: ["/course-login/[param]", "/online-learning/[param]", "/admin","/admin/[param]", "/profile/[param]", "/profile"],
        hideHeader: ["/course-login/[param]", "/online-learning/[param]"],
      }),
      []
  );

  const pathname = usePathname();

  // Function to match dynamic paths like [param]
  const matchesDynamicPath = (pattern) => {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = pathname.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length) return false;

    return patternParts.every((part, index) =>
        part.startsWith("[") && part.endsWith("]")
            ? true // Matches dynamic segment like [param]
            : part === pathParts[index]
    );
  };

  const hideHeader = useMemo(() => {
    return pageConfig.hideHeader.some((page) =>
        matchesDynamicPath(page)
    );
  }, [pathname, pageConfig.hideHeader]);

  const hideFooter = useMemo(() => {
    return pageConfig.hideFooter.some((page) =>
        matchesDynamicPath(page)
    );
  }, [pathname, pageConfig.hideFooter]);

  return { hideHeader, hideFooter };
};

export default usePageConfig;
