import Navbar from "./navbar";
import React from "react";
import NarBar from './navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[70px]">
      <NarBar>{children}</NarBar>
    </div>
  );
}
