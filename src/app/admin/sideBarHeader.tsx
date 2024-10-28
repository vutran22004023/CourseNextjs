import React from 'react';
import SidebarAdminComponent from '@/components/Sidebar/sidebarAdmin';
export default function SidebarAdmin({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5 mt-5">
      <SidebarAdminComponent
        className="mt-3 hidden md:flex md:flex-col gap-2 z-10 h-[calc(100vh)] fixed top-[50px]"
      />
      <div className="flex-1 mt-[40px] ml-5 h-[calc(100vh-50px)] overflow-y-auto">
        <div className="container w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
