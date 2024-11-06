"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { BookOpenText, Building2, History, School } from "lucide-react";
import { usePathname } from "next/navigation";
import {useTranslation} from "react-i18next";

interface SidebarProps {
  className?: string;
}

export default function SidebarOnline({ className }: SidebarProps) {
  const pathname = usePathname();
  const {t} = useTranslation('common');
  const navigation = [
    {
      name: t('onlineLearning'),
      href: "/online-learning",
      icon: Building2,
      current: pathname === "/online-learning",
    },
    {
      name: t('Test'),
      href: "/online-learning/test",
      icon: BookOpenText,
      current: pathname === "/online-learning/test",
    },
    {
      name: t('History'),
      href: "/online-learning/history",
      icon: History,
      current: pathname === "/online-learning/history",
    },
    {
      name: t('Class'),
      href: "/online-learning/class",
      icon: School,
      current: pathname === "/online-learning/class",
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
