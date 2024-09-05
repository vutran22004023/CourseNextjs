"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Home, LibraryBig, BookOpenText } from "lucide-react";

interface SidebarProps {
  className?: string;
  activePage: string;
}

export default function Sidebar({ className, activePage }: SidebarProps) {
  const [navigation, setNavigation] = useState([
    {
      name: "Trang chủ",
      href: "/",
      icon: Home,
      current: activePage === "listenNow",
    },
    {
      name: "Lộ trình",
      href: "/learning-paths",
      icon: LibraryBig,
      current: activePage === "browse",
    },
    {
      name: "Bài viết",
      href: "/blog",
      icon: BookOpenText,
      current: activePage === "radio",
    },
  ]);

  const handleItemClick = (index: any) => {
    const updatedNavigation = navigation.map((item, i) => {
      if (i === index) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavigation(updatedNavigation);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-1">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleItemClick(index)}
              >
                <Button
                  variant={item.current ? "default" : "secondary"}
                  className={cn(
                    "w-full justify-start mb-1 rounded transition-all duration-300",
                    item.current
                ? "bg-[#FF5A00] text-white border-none"
                      : "bg-[#e8ebed] text-[#3d3d3d] border-b-2 border-[#FF5A00]",
                    "hover:shadow-[0_4px_12px_rgba(255,90,0,0.6)] hover:translate-y-[-2px] hover:bg-[#d7753f]"
                  )}
                >
                  <item.icon width={20} height={20} className="mr-1" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
