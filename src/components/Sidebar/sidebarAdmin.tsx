"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BookOpenText,
  LayoutDashboard,
  SquareLibrary,
  Users,
  BookMarked
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {useTranslation} from "react-i18next";
interface SidebarProps {
  className?: string;
}
export default function SidebarAdminComponent({ className }: SidebarProps) {
  const {t} = useTranslation('common');
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  if (!user.isAdmin || !user.status) {
    router.push("/");
    return null;
  }
  const navigation = [
    {
      name: t('Dashboard'),
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: t('SiteInformation'),
      href: "/admin/information-page",
      icon: SquareLibrary,
      current: pathname === "/admin/information-page",
    },
    {
      name: t('Course'),
      href: "/admin/courses",
      icon: BookOpenText,
      current: pathname === "/admin/courses",
    },
    {
      name: t('User'),
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
    {
      name: t('headers.blog'),
      href: "/admin/blogs",
      icon: BookMarked,
      current: pathname === "/admin/blogs",
    },
  ];

  return (
      <div className={cn("pb-12", className)}>
        <div className="space-y-4 py-3">
          <div className="px-3 py-2">
            <div className={cn(
                "fixed z-40 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 p-3 rounded-lg",
            )}>

              {navigation.map((item, index) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                          "w-full rounded-lg hover:bg-orange-500 hover:text-white transition-colors p-2 duration-200 flex flex-col justify-center items-center text-center mb-2",
                          item.current
                              ? "bg-orange-500 text-white shadow-md"
                              : "text-gray-700"
                      )}
                  >
                    <div className="flex justify-center items-center w-full mb-1">
                      <item.icon width={20} height={20} className="mr-1"/>
                    </div>
                    <div className="text-sm">{item.name}</div>
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
