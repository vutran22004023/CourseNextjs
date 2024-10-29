"use client";
import SidebarOnline from "@/components/Sidebar/sidebarOnilne";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn có tham số (param)
  const hasParam = pathname.split("/").length > 2;

  // Nếu có param, ẩn Navbar
  if (hasParam) {
    return <div className="w-full mt-5 px-5">{children}</div>;
  }

  return (
    <div className="flex gap-2">
      <div className="w-[8%] h-[calc(90.5vh)]">
        <SidebarOnline />
      </div>
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
