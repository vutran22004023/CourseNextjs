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
  AlignLeft
} from "lucide-react";
import {useTranslation} from "react-i18next";
import Text from '@/components/Text/text'
interface SidebarProps {
  className?: string;
}

export default function SidebarUser({ className }: SidebarProps) {
  const pathname = usePathname();
  const {t} = useTranslation('common');
  const navigation = [
    {
      name: t('menu.personalPage'),
      href: "/profile",
      icon: User,
      current: pathname === "/profile",
    },
    {
      name: t('menu.blogWriting'),
      href: "/profile/posts-blog",
      icon: NotebookPen,
      current: pathname === "/profile/posts-blog",
    },
    {
      name: t('menu.myArticle'),
      href: "/blog",
      icon: Album,
      current: pathname === "/blog",
    },
    {
      name: t('menu.savedArticles'),
      href: "/blog",
      icon: BookOpenText,
      current: pathname === "/blog",
    },
    {
      name: t('menu.userInformation'),
      href: "/profile/information-user",
      icon: SquareUser,
      current: pathname === "/profile/information-user",
    },
    {
      name: t('menu.PasswordsAndSecurity'),
      href: "/profile/password-and-security",
      icon: KeySquare,
      current: pathname === "/profile/password-and-security",
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
                <item.icon width={20} height={20} className="mr-1" />
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
