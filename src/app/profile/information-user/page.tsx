"use client";
import { ArrowBigRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponment from "@/components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Text from "@/components/Text/text";
import { UpdateUser } from "@/apis/user";
import { useMutationHook } from "@/hooks";
import { useEffect, useState } from "react";
import { success } from "@/components/Message/Message";

export default function InformationUser() {
  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    role: "",
  });
  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        role: user.role,
      });
    }
  }, [user]);
  const mutationUpdateUser = useMutationHook(async (data) => {
    try {
      const res = await UpdateUser(user?.id, data);
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUpdateUser = () => {
    mutationUpdateUser.mutate(userData, {
      onSuccess(data, variables, context) {
        success("Cập nhập thành công");
      },
    });
  };

  return (
    <div className="container w-full" style={{ padding: "0 90px" }}>
      <Text className="cactus-classical-serif-md text-[25px]">
        Thông tin cá nhân
      </Text>
      <Text className="mb-10 text-[14px]">Quản lý thông tin của bạn</Text>

      <div>
        <Text className="cactus-classical-serif-md text-[20px] mb-5">
          Thông tin cơ bản
        </Text>
        <Text className="mb-10 text-[14px]">
          Quản lý tên hiển thị, tên người dùng, desc và avatar của bạn
        </Text>
      </div>

      <div className="w-full bg-slate-300" style={{ borderRadius: "20px" }}>
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
              style={{ borderRadius: "20px 20px 0 0" }}
            >
              <div>
                <div className="cactus-classical-serif-md">Email</div>
                <div className="">{user.email || "Chưa cập nhật"}</div>
              </div>
              <div>
                <ArrowBigRight className="w-[50px] h-[50px]" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-50">
            <DialogHeader>
              <DialogTitle>Cập nhật tên của bạn</DialogTitle>
              <DialogDescription>
                Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và
                bài viết của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userData.email || "Chưa cập nhật"}
                  className="col-span-3"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <DialogFooter>
              <ButtonComponment
                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                onClick={handleUpdateUser}
              >
                Cập nhập
              </ButtonComponment>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <hr />
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
              <div>
                <div className="cactus-classical-serif-md">Tên người dùng</div>
                <div className="">{user.name || "Chưa cập nhật"}</div>
              </div>
              <div>
                <ArrowBigRight className="w-[50px] h-[50px]" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-50">
            <DialogHeader>
              <DialogTitle>Cập nhật tên của bạn</DialogTitle>
              <DialogDescription>
                Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và
                bài viết của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={userData.name || "Chưa cập nhật"}
                  className="col-span-3"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <DialogFooter>
              <ButtonComponment
                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                onClick={handleUpdateUser}
              >
                Cập nhập
              </ButtonComponment>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <hr />
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
              <div>
                <div className="cactus-classical-serif-md">Vai trò</div>
                <div className="">{user.role || "Chưa cập nhật"}</div>
              </div>
              <div>
                <ArrowBigRight className="w-[50px] h-[50px]" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-50">
            <DialogHeader>
              <DialogTitle>Cập nhật vai trò</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={userData.role || "Chưa cập nhật"}
                  className="col-span-3"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <DialogFooter>
              <ButtonComponment
                className="flex justify-center p-3 rounded-2xl bg-[#FF5A00] hover:bg-[#FF5A00]"
                onClick={handleUpdateUser}
              >
                Cập nhập
              </ButtonComponment>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <hr />
        <div
          className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
          style={{ borderRadius: "0 0 20px 20px" }}
        >
          <div>
            <div className="cactus-classical-serif-md">Ảnh đại diện</div>
            <div className="">
              <Avatar>
                <AvatarImage
                  src={user.avatar || "https://github.com/shadcn.png"}
                  alt={user.name || "User Avatar"}
                />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
      </div>

      <div>
        <Text className="text-[20px] mt-9">Thông tin mạng xã hội</Text>
        <Text className="mb-10 text-[14px]">
          Quản lý liên kết tới các trang mạng xã hội của bạn
        </Text>
      </div>

      <div className="w-full bg-slate-300" style={{ borderRadius: "20px" }}>
        <div
          className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
          style={{ borderRadius: "20px 20px 0 0" }}
        >
          <div>
            <Text className="cactus-classical-serif-md">GitHub</Text>
            <Text className="">Chưa cập nhật</Text>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
        <hr />
        <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
          <div>
            <Text className="cactus-classical-serif-md">Tên người dùng</Text>
            <Text className="">Chưa cập nhật</Text>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
        <hr />
        <div className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer">
          <div>
            <Text className="cactus-classical-serif-md">Giới thiệu</Text>
            <Text className="">Chưa cập nhật</Text>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
        <hr />
        <div
          className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
          style={{ borderRadius: "0 0 20px 20px" }}
        >
          <div>
            <div className="cactus-classical-serif-md">Ảnh đại diện</div>
            <div className="">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
