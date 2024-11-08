import React from "react";
import SidebarUserComponent from "@/components/Sidebar/sidebarUser";

export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 w-full">
        <div className="w-[12%]">
            <SidebarUserComponent className="mt-3 hidden md:flex md:flex-col gap-2 z-10 fixed top-[70px] " />
        </div>
      <div className="flex-1 mt-[50px]">
        <div className="container w-full">{children}</div>
      </div>
    </div>
  );
}
