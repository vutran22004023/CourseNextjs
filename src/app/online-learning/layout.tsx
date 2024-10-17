import SidebarOnline from '@/components/Sidebar/sidebarOnilne';
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:flex w-full">
    <div className="bg-background font-sans antialiased w-full flex gap-4 mt-5">
      <div className="w-[8%] h-[calc(100v-200px)]">
        <SidebarOnline/>
      </div>
      <div className='w-[90%] mt-5 overflow-y-auto'>{children}</div>
    </div>
    </div>
  );
}
