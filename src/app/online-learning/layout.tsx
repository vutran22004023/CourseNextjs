import SidebarOnline from '@/components/Sidebar/sidebarOnilne';
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:flex w-full">
    <div className="bg-background font-sans antialiased w-full flex gap-4 mt-5 h-full">
      <div className="w-[8%] h-[calc(90.5vh)]">
        <SidebarOnline/>
      </div>
      <div className='w-[90%]'>{children}</div>
    </div>
    </div>
  );
}
