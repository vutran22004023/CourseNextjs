import Image from "next/image";
import React from "react";
import logo from "@/assets/logo/brain.png";
import Text from "../Text/text";
export default function Footer() {
  return (
    <div className="bg-[#181821] w-full h-auto px-10 py-20 block md:grid md:grid-cols-4 gap-2 justify-center">
      <div>
        <div className="flex gap-2 items-center justify-center">
          <Image src={logo} width={50} height={50} alt="logo" />
          <Text type="defaultSemiBold" className="text-white">
            Theo đuổi đam mê của bạn
          </Text>
        </div>
        <div className="flex gap-2 mt-3">
          <Text className="text-white opacity-80 w-[80px]">Điện thoại:</Text>
          <Text className="text-white opacity-80">0999 999 999</Text>
        </div>
        <div className="flex gap-2">
          <Text className="text-white opacity-80 w-[80px]">Email:</Text>
          <Text className="text-white opacity-80">Coursenivervn@gmail.com</Text>
        </div>
        <div className="flex gap-2">
          <Text className="text-white opacity-80 w-[80px]">Địa chỉ  </Text>
          <Text className="text-white opacity-80">
            130 Điện Biên Phủ, Chính Gián, Thanh Khê, Đà Nẵng
          </Text>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Về Courseniver
          </Text>
        </div>
        <div className="mt-3">
          <Text className="text-white opacity-80">Giới thiệu</Text>
          <Text className="text-white opacity-80">Liên hệ</Text>
          <Text className="text-white opacity-80">Điều khoản</Text>
          <Text className="text-white opacity-80">Bảo mật</Text>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Chăm sóc khách hàng
          </Text>
        </div>
        <div className="mt-3 justify-center t">
          <Text className="text-white opacity-80">Hướng dẫn thanh toán</Text>
          <Text className="text-white opacity-80">
            Điều kiện giao dịch chung
          </Text>
          <Text className="text-white opacity-80">
            Quy trình sử dụng dịch vụ
          </Text>
          <Text className="text-white opacity-80">Chính sách bảo hành</Text>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Trợ giúp
          </Text>
        </div>
        <div className="mt-3 justify-center t">
          <Text className="text-white opacity-80">Trợ giúp</Text>
          <Text className="text-white opacity-80">Liên hệ chúng tôi</Text>
        </div>
      </div>
    </div>
  );
}
