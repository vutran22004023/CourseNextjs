import { ArrowBigRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonComponment from '@/components/Button/Button'
export default function PasswordAndSecurity() {
  return (
    <div className="container mt-[60px] w-full" style={{ padding: "0 90px" }}>
      <h2 className="cactus-classical-serif-md text-[25px] ">
        Mật khẩu và bảo mật
      </h2>
      <p className="mb-10 text-[14px]">Quản lý mật khẩu và bảo mật</p>

      <div>
        <h2 className="cactus-classical-serif-md text-[20px] mb-5">
          Đăng nhập & khôi phục
        </h2>
        <p className="mb-10 text-[14px]">
          Quản lý mật khẩu và xác minh 2 bước
        </p>
      </div>

      <div className="w-full bg-slate-300" style={{ borderRadius: "20px" }}>
      <Dialog>
      <DialogTrigger asChild>
        <div
          className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
          style={{ borderRadius: "20px 20px 0 0" }}
        >
          <div>
            <div className="cactus-classical-serif-md">Đổi mật khẩu</div>
            <div className="">Chưa đổi mật khẩu</div>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-50">
        <DialogHeader >
          <DialogTitle>Chập nhập tên của bạn </DialogTitle>
          <DialogDescription>
            Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <ButtonComponment className="" style={{}}>Save changes</ButtonComponment>
        </DialogFooter>
      </DialogContent>
        </Dialog>
        <hr />
        <Dialog>
      <DialogTrigger asChild>
        <div
          className="p-4 flex justify-between hover:bg-slate-200 cursor-pointer"
          style={{ borderRadius: "0 0 20px 20px" }}
        >
          <div>
            <div className="cactus-classical-serif-md">Xác minh 2 bước</div>
            <div className="">Đang tắt</div>
          </div>
          <div>
            <ArrowBigRight className="w-[50px] h-[50px]" />
          </div>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-50">
        <DialogHeader >
          <DialogTitle>Chập nhập tên của bạn </DialogTitle>
          <DialogDescription>
            Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <ButtonComponment className="" style={{}}>Save changes</ButtonComponment>
        </DialogFooter>
      </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}
