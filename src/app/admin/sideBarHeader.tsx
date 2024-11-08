"use client"
import React from "react";
import SidebarAdminComponent from "@/components/Sidebar/sidebarAdmin";
import '@/../i18n';
export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="gap-5 flex">
          <div className="w-[10%]"><SidebarAdminComponent className="hidden md:block gap-2 h-[80vh] fixed"/></div>
          <div className="w-[88%] mt-3 mb-3 p-5 shadow-lg rounded-lg">
              <div>{children}</div>
          </div>
      </div>
  );
}

