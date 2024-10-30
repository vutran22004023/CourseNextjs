import React from "react";
import SidebarAdminComponent from "@/components/Sidebar/sidebarAdmin";

export default function SidebarAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="gap-5 flex">
          <SidebarAdminComponent className="hidden md:block gap-2 h-[80vh] fixed"/>
          <div className="flex-1">
              <div className="w-full mt-3">{children}</div>
          </div>
      </div>
  );
}

