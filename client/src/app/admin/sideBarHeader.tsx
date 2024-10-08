'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SidebarAdminComponent from '@/components/Sidebar/sidebarAdmin';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
export default function SidebarAdmin({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  if(!user.isAdmin || !user.status) return router.push('/');
  const pathname = usePathname();
  const activePage = pathname === '/admin'
      ? 'dashboard'
      : pathname.includes('/admin/information-page')
      ? 'information'
      : pathname.includes('/admin/courses')
      ? 'courses'
      : pathname.includes('/admin/blogs')
      ? 'blogs'
      : pathname.includes('/admin/users')
      ? 'users'
      : '';

  return (
    <div className="flex">
      <SidebarAdminComponent
        className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]"
        activePage={activePage}
      />
      <div className="flex-1 mt-[30px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
        <div className="container w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
