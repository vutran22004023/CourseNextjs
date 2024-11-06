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
  const {pages,footer} = useAtoms();
  console.log(footer)
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
            <Text className="text-white opacity-80">{footer?.contactInfo?.phone}</Text>
          </div>
          <div className="flex  gap-2">
            <Text className="text-white font-medium">Email:</Text>
            <Text className="text-white opacity-80">
              {footer?.contactInfo?.email}
            </Text>
          </div>
          <div className="flex ">
            <Text className="text-white font-medium w-[105px]">Địa chỉ:</Text>
            <Text className="text-white opacity-80">
              {footer?.contactInfo?.address}
            </Text>
          </div>
        </div>
        <div className="flex md:pl-[15px] gap-5 mt-3">
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href={footer?.socialMediaLinks[0]?.url || "/"}>
              <Facebook className="text-white" />
            </Link>
          </div>
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href={footer?.socialMediaLinks[2]?.url || "/"}>
              <Youtube className="text-white" />
            </Link>
          </div>
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-lg border-2 border-[#fff]">
            <Link href={footer?.socialMediaLinks[1]?.url || "/"}>
              <Instagram className="text-white" />
            </Link>
          </div>
        </div>
      </div>
      {footer?.footer?.map((content: any, index: number) => (
          <div className="block mr-[100px] mt-5 md:mt-0" key={index}>
            <div className="flex gap-2 items-center h-[50px]">
              <Text type="defaultSemiBold" className="text-white items-center">
                {content.title}
              </Text>
            </div>
            <div>
              {content.items?.map((item: any, itemIndex: number) => (
                  <Link href={item.link} key={itemIndex}>
                    <Text className="text-white opacity-80">{item.label}</Text>
                  </Link>
              ))}
            </div>
          </div>
      ))}
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
              <SelectValue placeholder="Chọn ngôn ngữ"/>
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
