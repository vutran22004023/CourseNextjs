import Navbar from "./navbar";
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:flex w-full">
    <div className="bg-background font-sans antialiased w-full flex gap-4 mt-5 h-full">
      <Navbar>{children}</Navbar>
    </div>
    </div>
  );
}
