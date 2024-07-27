'use client'
import React from 'react'
import HeaderLayout from '@/components/Layouts/HeaderLayout';
import SidebarComponent from '@/components/Sidebar/sidebar';
import { usePathname } from 'next/navigation';

export default function sidebarHeader({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const pageConfig = {
        showHeader: ['/'], // Hiển thị Header cho trang gốc
        showSidebar: ['/'], // Hiển thị Sidebar cho các trang được chỉ định
        hideHeader: ['/course-login'],
        hideSidebar: ['/blog/blog-detail','/admin','/profile','/course-login','/course-not-login' ], // Ẩn Sidebar cho các trang được chỉ định
      };
      const pathname = usePathname();

    const activePage = pathname === '/'
        ? 'listenNow'
        : pathname.includes('/learning-paths')
        ? 'browse'
        : pathname.includes('/blog')
        ? 'radio'
        : '';

// Kiểm tra nếu đường dẫn có tham số
const isPathWithParams = pathname.includes('/[param]') || pathname.split('/').length > 2;

// Điều kiện hiện header
const showHeader = pageConfig.showHeader.some(page => pathname.startsWith(page)) && !pageConfig.hideHeader.some(page => pathname.startsWith(page));

// Điều kiện hiện sidebar
const showSidebar = !pageConfig.hideSidebar.some(page => pathname.startsWith(page)) &&
  pageConfig.showSidebar.some(page => pathname.startsWith(page)) &&
  !isPathWithParams;

  return (
    <>
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
    </>
  )
}
