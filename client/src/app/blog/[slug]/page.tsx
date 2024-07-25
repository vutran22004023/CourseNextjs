import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle  } from 'lucide-react';
export default function BlogDetail() {
  return (
    <div className="container mt-8 w-full">
      <div className="flex justify-between">
        <div className="flex-1 p-3">
        <div className="cactus-classical-serif-md mb-3">Cao (High Lands) Nguyên</div>
        <hr/>
        <div className="flex mt-4">
            <div className="flex mr-10"><Heart/> <span className="ml-2">3</span> </div>
            <div className="flex"><MessageCircle/> <span className="ml-2">3</span> </div>
        </div>
        </div>
        <div className="w-[800px]">
          <h2 className="cactus-classical-serif-md text-[30px] mb-5">
            Thư cảm ơn gửi đến anh Sơn
          </h2>
          <div className="flex mb-5">
            <div className="flex">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <div className="cactus-classical-serif-md">Cao (High Lands) Nguyên</div>
                <div className="text-[14px]">6 ngày trước · 2 phút đọc</div>
              </div>
            </div>
          </div>

          <div className="mb-[30px]">
          Xin chào mọi người và anh Sơn. Em tên là Lý Cao Nguyên Vào năm 2022 em có vô tình lướt thấy những video dạy học của anh trên Youtube, vì niềm đam mê với lập trình em đã chuyển từ Scratch, Pascal, Python sang học HTML, CSS, JavaScrip khoá cơ bản của anh. Càng học em thấy càng hay và em đã tạo ra được dự án đầu tay của mình là Website hỗ trợ học tốt Ngữ văn "Conquer Literature" (frontend).
          </div>

          <div className="flex mb-10">
            <div className="flex mr-10"><Heart/> <span className="ml-2">3</span> </div>
            <div className="flex"><MessageCircle/> <span className="ml-2">3</span> </div>
        </div>

        <hr className=" bg-[red] h-1 mb-10"/>
        
        <div>
        <h2 className="cactus-classical-serif-md text-[30px] mb-5">
            Bài viết nổi bật khác
          </h2>
        </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
