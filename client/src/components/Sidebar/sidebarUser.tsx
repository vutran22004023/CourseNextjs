import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { User, BookOpenText, Album, NotebookPen, SquareUser, KeySquare } from 'lucide-react';

interface SidebarProps {
  className?: string;
  activePage: string;
}

export default function SidebarUser({ className, activePage }: SidebarProps) {
  const [navigation, setNavigation] = useState([
    { name: "Trang cá nhân", href: "/personal-page", icon: User, current: activePage === "personalpage" },
    { name: "Viết Blog", href: "/posts-blog", icon: NotebookPen, current: activePage === "blogging" },
    { name: "Bài viết của tôi", href: "/blog", icon: Album, current: activePage === "myarticle" },
    { name: "Bài viết đã lưu", href: "/blog", icon: BookOpenText, current: activePage === "savedposts" },
    { name: "Thông tin người dùng", href: "/information-user", icon: SquareUser, current: activePage === "informationuser" },
    { name: "Mật khẩu và bảo mật", href: "/password-and-security", icon: KeySquare, current: activePage === "passwordandsecurity" },
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
