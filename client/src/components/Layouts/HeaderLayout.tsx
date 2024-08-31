"use client";
import Link from "next/link";
import {
  BellRing,
  LogOut,
  Settings,
  User,
  BookOpenText,
  Album,
  NotebookPen,
  Lock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LoginComponent from "../Login-Register/Login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { resetUser } from "@/redux/Slides/userSide";
import { useEffect, useState } from "react";
import { Search } from "@/redux/Slides/searchSide";
import { useRouter } from "next/navigation";
import { LoginOut } from "@/apis/auth";
import { getTokenFromCookies } from "@/utils/auth";
import CardHistory from "@/components/Card/CardHistory";
import Text from "../Text/text";
export default function HeaderLayout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [search, setSearch] = useState("");
  const token = getTokenFromCookies();
  const navigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    dispatch(Search({ search }));
  }, [search]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_Token");
      localStorage.removeItem("refresh_Token");
      document.cookie =
        "access_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refresh_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      await LoginOut();
      dispatch(resetUser());
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-black right-0 z-10 border-b text-white p-3 flex justify-between items-center">
      <img className="h-[30px] pl-2" src="logo.png" alt=""/>
      <div className="flex items-center w-[500px] px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow ml-4 text-gray-700 focus:text-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px 10px",
            border: "1px solid #000",
            borderRadius: "10px",
          }}
        />
      </div>
      <div className="flex gap-4 items-center mr-4">
        {token && user.status === true ? (
          <>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Text className="cursor-pointer text-black">
                  Khóa học của tôi
                </Text>
              </HoverCardTrigger>
              <HoverCardContent className="w-100 mt-2 mr-20 text-black bg-[#f0efef] rounded">
                <div className=" w-[350px] h-[300px]">
                  <div className="flex justify-between w-full">
                    <Text className="text-sm font-semibold">
                      Khóa học của tôi
                    </Text>
                    <Text className="text-sm font-semibold">Xem tất cả</Text>
                  </div>
                  <div className="w-full mt-2">
                    <CardHistory />
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="cursor-pointer">
                  <BellRing className="text-black" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-100 mt-2 mr-10 text-black bg-[#f0efef] rounded p-2">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by @vercel.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer mr-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-4 mr-7 p-2 bg-[#f0efef] rounded">
                <DropdownMenuLabel>Xin chào, {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">
                        Trang cá nhân
                      </span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/profile/posts-blog">
                    <DropdownMenuItem className="cursor-pointer">
                      <NotebookPen className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">Viết Blog</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">
                    <Album className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">
                      Bài viết của tôi
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <BookOpenText className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">
                      Bài viết đã lưu
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user.isAdmin === true && (
                  <Link href="/admin">
                    <DropdownMenuItem className="cursor-pointer">
                      <Lock className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">
                        Thông tin trang web
                      </span>
                    </DropdownMenuItem>
                  </Link>
                )}
                <Link href="/profile/information-user">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">Cài đặt</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="hover:text-[#a1a1a1]">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <LoginComponent />
        )}
      </div>
    </div>
  );
}
