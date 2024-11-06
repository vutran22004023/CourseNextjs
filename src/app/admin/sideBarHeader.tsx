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
          <div className="w-[8%]"><SidebarAdminComponent className="hidden md:block gap-2 h-[80vh] fixed"/></div>
          <div className="flex-1">
              <div className="w-full mt-3">{children}</div>
          </div>
      </div>
  );
}

