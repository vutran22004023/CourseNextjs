import CardBlogComponment from "@/components/Card/CardBlog";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link'
import Image from "next/image";
export default function Blog() {
  return (
    <div className="container mt-8 w-full">
      <div className="cactus-classical-serif-md text-[25px] mb-1 ">
        Bài viết nổi bật
      </div>
      <div className="text-[15px] mb-7">
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </div>

      <div className="w-full flex">
        <div className="w-[60%]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Link href={'/blog/blog-detail'} key={index}>
            <CardBlogComponment>
              <div className="flex  items-center mb-3">
                <Avatar className="w-[40px] h-[40px] mr-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-[14px]">Cao (High Lands) Nguyên</div>
              </div>
              <div className="flex">
                <div className="w-[70%] p-3">
                  <div className="cactus-classical-serif-md tex-[20px]">
                    Thư cảm ơn gửi đến anh Vũ
                  </div>
                  <div className="text-[14px] mb-1">
                    Xin chào mọi người và anh Sơn. Em tên là Lý Cao Nguyên Vào
                    năm 2022 em có vô tình lướt thấy những video dạy học của anh
                    trên...
                  </div>

                  <div className="text-[12px]">5 ngày trước - 2 phút đọc</div>
                </div>
                <div className="p-3">
                  <Image
                    src={Anh1}
                    alt="Anh 1"
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </div>
            </CardBlogComponment>
            </Link>
          ))}
          <div></div>
        </div>
        <div className="flex-1 p-5 ">
          <div className="text-[14px] mb-3">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</div>
          <div className="grid  gap-2 grid-cols-3">
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              {" "}
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              {" "}
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              {" "}
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              {" "}
              Font end/ Mobile apps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
