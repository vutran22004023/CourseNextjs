import React from "react";
import SidebarAdminComponent from "@/components/Sidebar/sidebarAdmin";

export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gap-5 flex">
      <SidebarAdminComponent className="mt-3 hidden md:flex md:flex-col gap-2 z-10 h-[calc(100vh)]top-[50px]" />
      <div className="flex-1 mt-[40px] ml-5 h-[calc(100vh-50px)] overflow-y-auto">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
