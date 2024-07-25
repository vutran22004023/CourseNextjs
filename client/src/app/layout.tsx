'use client';
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import ClientProviders from '@/components/ClientProviders';
import { cn } from "@/lib/utils"
import HeaderLayout from '@/components/Layouts/HeaderLayout';
import SidebarComponent from '@/components/Sidebar/sidebar';
import { usePageConfigHome } from '@/hooks/usePageConfig';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageConfig = {
    showHeader: ['/'], // Hiển thị Header cho trang gốc
    showSidebar: ['/', '/courses'], // Hiển thị Sidebar cho các trang được chỉ định
    hideSidebar: ['/blog/blog-detail'], // Ẩn Sidebar cho các trang được chỉ định
  };
  const { activePage, showHeader, showSidebar } = usePageConfigHome(pageConfig);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        <ClientProviders>
      {showHeader && <HeaderLayout />}
      <div className="block md:flex w-full">
        {showSidebar  && (
          <>
            <SidebarComponent
              className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]"
              activePage={activePage}
            />
            <div className="block md:flex-1 w-full mt-[50px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
            <div className="container mt-8 w-full">
              {children}
              </div>
            </div>
          </>
        )}
        {!showSidebar && (
          <div className="block w-full mt-[50px] h-[calc(100vh-50px)] overflow-y-auto">
            {children}
          </div>
        )}
      </div>
    </ClientProviders>
      </body>
    </html>
  );
}
