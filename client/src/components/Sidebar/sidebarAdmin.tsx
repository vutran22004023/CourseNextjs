import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {Link} from 'react-router-dom'
import { Home,LibraryBig, BookOpenText, LayoutDashboard ,SquareLibrary, Users   } from 'lucide-react';
interface SidebarProps {
  className?: string;
  activePage: string;
}
export default function SidebarAdmin({ className, activePage }: SidebarProps) {
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/admin/dash-board",icon:LayoutDashboard, current: activePage === "dashboard" },
    { name: "Thông tin pages", href: "/admin/information-page",icon:SquareLibrary, current: activePage === "information" },
    { name: "Khóa học", href: "/admin/courses",icon:BookOpenText, current: activePage === "courses" },
    { name: "Người dùng", href: "/admin/users",icon:Users, current: activePage === "users" },
  ]);

  const handleItemClick = (index : any) => {
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
  <div className="space-y-4 py-4">
    <div className="px-3 py-2">
      <div className="space-y-1">
        {navigation.map((item, index) => (
          <Link 
          key={item.name}
          to={item.href}
          onClick={() => handleItemClick(index)}
          >
          <Button
            variant={item.current ? "default" : "secondary"}
            className={cn(
              "w-full justify-start hover:bg-[#a1a1a1] mb-3 rounded",
              item.current && "bg-[#777777] text-white"
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
