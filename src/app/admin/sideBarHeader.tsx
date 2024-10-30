import React from "react";
import SidebarAdminComponent from "@/components/Sidebar/sidebarAdmin";

export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gap-5 flex">
      <SidebarAdminComponent className="mt-3 hidden md:flex md:flex-col gap-2 z-10 h-[calc(100vh)] top-[50px]" />
      <div className="flex-1 ml-5 h-[calc(100vh-100px)]">
        <div className="w-full mt-3 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
