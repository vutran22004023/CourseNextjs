import Navbar from "./navbar";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <div className="block md:flex w-full">
        <div className="bg-background font-sans antialiased w-full flex gap-4 mt-5 h-full">
          <Navbar>{children}</Navbar>
        </div>
      </div>
    </AppRouterCacheProvider>
  );
}
