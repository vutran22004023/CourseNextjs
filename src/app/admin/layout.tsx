import SidebarAdmin from "./sideBarHeader";
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarAdmin>{children}</SidebarAdmin>;
}
