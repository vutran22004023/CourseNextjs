// src/components/Layout.tsx

import SidebarComponment from "../Sidebar/sidebar";
import HeaderLayout from "./HeaderLayout";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  isHeaderVisible: boolean;
  isSidebarVisible: boolean;
  activePage: string;
}

const Layout = ({
  children,
  isHeaderVisible,
  isSidebarVisible,
  activePage,
}: LayoutProps) => {
  return (
    <>
      {isHeaderVisible && <HeaderLayout />}
      <div className="block md:flex w-full">
        {isSidebarVisible && (
          <>
            <SidebarComponment
              className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]"
              activePage={activePage}
            />
            <div className="block md:flex-1 w-full mt-[50px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
              {children}
            </div>
          </>
        )}
        {!isSidebarVisible && (
          <div className="block w-full mt-[50px] h-[calc(100vh-50px)] overflow-y-auto">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
