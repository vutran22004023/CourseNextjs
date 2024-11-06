"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BookOpenText,
  LayoutDashboard,
  SquareLibrary,
  Users,
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
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "w-full hover:bg-[#ff5a00] hover:text-white mb-3 rounded-2xl h-[70px] flex flex-col justify-center items-center text-center p-2",
                  item.current &&
                    "bg-[#ff5a00] text-white shadow-xl border-2 border-[#00000061]]"
                )}
              >
                <div className="flex justify-center items-center w-full mb-1">
                  <item.icon width={20} height={20} className="mr-1" />
                </div>
                <span className="text-[14px]">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
