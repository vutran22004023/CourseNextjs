"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  User,
  BookOpenText,
  Album,
  NotebookPen,
  SquareUser,
  KeySquare,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function SidebarUser({ className }: SidebarProps) {
  const pathname = usePathname();
  const navigation = [
    {
      name: "Trang cá nhân",
      href: "/profile",
      icon: User,
      current: pathname === "/profile",
    },
    {
      name: "Viết Blog",
      href: "/profile/posts-blog",
      icon: NotebookPen,
      current: pathname === "/profile/posts-blo",
    },
    {
      name: "Bài viết của tôi",
      href: "/blog",
      icon: Album,
      current: pathname === "/blog",
    },
    {
      name: "Bài viết đã lưu",
      href: "/blog",
      icon: BookOpenText,
      current: pathname === "/blog",
    },
    {
      name: "Thông tin người dùng",
      href: "/profile/information-user",
      icon: SquareUser,
      current: pathname === "/profile/information-user",
    },
    {
      name: "Mật khẩu và bảo mật",
      href: "/profile/password-and-security",
      icon: KeySquare,
      current: pathname === "/profile/password-and-security",
    },
  ];


  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-3">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item, index) => (
              <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full hover:bg-[#ff5a00] hover:text-white mb-3 rounded-2xl h-[70px] flex flex-col justify-center items-center text-center",
                item.current &&
                  "bg-[#ff5a00] text-white shadow-xl border-2 border-[#00000061]]"
              )}
            >
              <div className="flex justify-center items-center w-full mb-1">
                <item.icon width={20} height={20} className="mr-1" />
              </div>
              <span>{item.name}</span>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
