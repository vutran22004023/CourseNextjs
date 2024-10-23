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
  SearchCheck,
  AlignJustify,
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
import { CourseProgress } from "@/types";
import { GetCourseProgress } from "@/apis/usercourse";
import logo from "@/assets/logo/brain 1.png";
import Image from "next/image";
export default function HeaderLayout() {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
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

  useEffect(() => {
    GetCourseProgress()
      .then((res) => {
        setCourseProgress(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 bg-white right-0 z-10 border-b border-[#cfcdcd] text-white p-3 flex justify-between items-center ">
      <div className="flex gap-3 items-center">
        <Link href="/">
          <Image
            width={150}
            height={60}
            className="h-[60px] w-[150px] pl-2"
            src={logo}
            alt="fsdfsdf"
            objectFit="cover"
          />
        </Link>
        <div className="hidden sm:flex gap-3">
          <Link href="/">
            <Text type="defaultSemiBold" className="nav-item">
              Khóa học
            </Text>
          </Link>
          <Link href="/">
            <Text type="defaultSemiBold" className="nav-item">
              Blog
            </Text>
          </Link>
          <Link href="/online-learning">
            <Text type="defaultSemiBold" className="nav-item">
              Học online
            </Text>
          </Link>
          <Link href="/">
            <Text type="defaultSemiBold" className="nav-item">
              Giải đấu
            </Text>
          </Link>
        </div>
      </div>

      <div className="sm:flex items-center mx-5 ms:mx-0 hidden sm:w-[500px] py-1 pl-3 pr-1 text-[#444] rounded-full border-2 border-[#E8E8E8] focus-within:border-black transition-colors duration-300">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow ml-2 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px 10px",
          }}
        />
        <div className="bg-[#FF5A00] rounded-full w-8 h-8 flex items-center justify-center">
          <SearchCheck className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex gap-4 items-center mr-4">
        {token && user.status === true ? (
          <>
            <div className="hidden sm:block">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-pointer text-black">
                    Khóa học của tôi
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-[30rem] h-[25rem] pt-1 flex flex-col mt-2 mr-20 text-black bg-[#f0efef] rounded">
                  <div className="p-2 flex justify-between">
                    <Text className="text-sm font-semibold text-center">
                      Khóa học của tôi
                    </Text>
                    <Text className="text-sm font-semibold text-center">
                      Xem tất cả
                    </Text>
                  </div>
                  <div className="overflow-y-auto flex-grow">
                    {courseProgress.length > 0 &&
                      courseProgress
                        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                        .map((item) => (
                          <CardHistory key={item._id} data={item} />
                        ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="hidden sm:block">
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
            </div>
            <div className="block sm:hidden">
              <AlignJustify className="mr-2 h-6 w-6 text-[#FF5A00]" />
            </div>
            <div className="hidden sm:block">
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
            </div>
          </>
        ) : (
          <LoginComponent />
        )}
      </div>
    </div>
  );
}
