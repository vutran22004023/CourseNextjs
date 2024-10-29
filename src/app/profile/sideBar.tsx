import React from "react";
import SidebarUserComponent from "@/components/Sidebar/sidebarUser";

export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarUserComponent className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]" />
      <div className="flex-1 mt-[50px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
        <div className="container w-full">{children}</div>
      </div>
    </div>
  );
}
