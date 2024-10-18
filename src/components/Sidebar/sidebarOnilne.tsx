"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BookOpenText, Building2, History, School } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export default function SidebarOnline({ className }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Học Online",
      href: "/online-learning",
      icon: Building2,
      current: pathname === "/online-learning",
    },
    {
      name: "Bài kiểm tra",
      href: "/online-learning/test",
      icon: BookOpenText,
      current: pathname === "/online-learning/test",
    },
    {
      name: "Lịch sử",
      href: "/online-learning/history",
      icon: History,
      current: pathname === "/online-learning/history",
    },
    {
      name: "Lớp",
      href: "/online-learning/class",
      icon: School,
      current: pathname === "/online-learning/class",
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
                  "w-full hover:bg-[#ff5a00] hover:text-white mb-3 rounded-2xl h-[70px] flex flex-col justify-center items-center text-center",
                  item.current && "bg-[#ff5a00] text-white shadow-xl border-2 border-[#00000061]]"
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
