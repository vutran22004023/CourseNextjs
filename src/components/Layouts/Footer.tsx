'use client'
import Image from "next/image";
import React, {useState, useEffect} from "react";
import { Facebook, Youtube, Instagram  } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo/brain.png";
import Text from "../Text/text";
import {useAtoms} from '@/hooks/useAtom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/context/LanguageContext";
export default function Footer() {
  const {pages} = useAtoms();
  const { language, setLanguage } = useLanguage();
  return (
    <div className="bg-[#181821] w-full h-auto p-[80px] leading-6 md:flex gap-2 justify-center">
      <div className="w-[300px] block pr-[15px] md:mr-[100px]">
        <div className="flex gap-2">
          <Image src={pages?.logoSmall} width={50} height={50} alt="logo" />
          <Text type="defaultSemiBold" className="text-white pt-[10px]">
            Theo đuổi đam mê của bạn
          </Text>
        </div>
        <div className="md:pl-[15px]">
          <div className="flex gap-2">
            <Text className="text-white font-medium">Điện thoại:</Text>
            <Text className="text-white opacity-80">0999 999 999</Text>
          </div>
          <div className="flex  gap-2">
            <Text className="text-white font-medium">Email:</Text>
            <Text className="text-white opacity-80">
              Coursenivervn@gmail.com
            </Text>
          </div>
          <div className="flex ">
            <Text className="text-white font-medium w-[105px]">Địa chỉ:</Text>
            <Text className="text-white opacity-80">
              130 Điện Biên Phủ, Chính Gián, Thanh Khê, Đà Nẵng
            </Text>
          </div>
        </div>
        <div className="flex md:pl-[15px] gap-5 mt-3">
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href="https://www.facebook.com/manduong1502">
              <Facebook className="text-white" />
            </Link>
          </div>
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href="https://www.youtube.com/">
              <Youtube className="text-white" />
            </Link>
          </div>
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href="https://www.instagram.com/redd_1502">
              <Instagram className="text-white" />
            </Link>
          </div>
        </div>
      </div>
      <div className="block mr-[100px] mt-5 md:mt-0">
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Về Courseniver
          </Text>
        </div>
        <div className="">
          <Link href="/">
            <Text className="text-white opacity-80">Giới thiệu</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Liên hệ</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Điều khoản</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Bảo mật</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Cơ hội việc làm</Text>
          </Link>
        </div>
      </div>
      <div className="block mr-[100px] mt-5 md:mt-0">
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Chăm sóc khách hàng
          </Text>
        </div>
        <div className=" justify-center t">
          <Link href="/">
            <Text className="text-white opacity-80">Hướng dẫn thanh toán</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">
              Điều kiện giao dịch chung
            </Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">
              Quy trình sử dụng dịch vụ
            </Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Chính sách bảo hành</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">
              Chính sách hoàn trả hàng
            </Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Chính sách bảo mật</Text>
          </Link>
        </div>
      </div>
      <div className="block mt-5 md:mt-0">
        <div className="flex gap-2 items-center h-[50px]">
          <Text type="defaultSemiBold" className="text-white items-center">
            Trợ giúp
          </Text>
        </div>
        <div className=" justify-center ">
          <Link href="/">
            <Text className="text-white opacity-80">Trợ giúp</Text>
          </Link>
          <Link href="/">
            <Text className="text-white opacity-80">Liên hệ chúng tôi</Text>
          </Link>
          <Text className="text-white opacity-80  mt-2">Ngôn ngữ</Text>
          <Select onValueChange={setLanguage} value={language}>
            <SelectTrigger className="bg-white mt-1">
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ngôn ngữ</SelectLabel>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
