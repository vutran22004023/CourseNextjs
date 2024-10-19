'use client';
import React from "react";

interface ButtonProps {
  type?:
    | "hoverbutton"
    | "sidebar"
    | "courseHeader"
    | "notesheet"
    | "login"
    | "iconlogin";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button({
  type = "sidebar",
  children,
  className,
  style,
  onClick,
  disabled = false,
  ...rest
}: ButtonProps) {
  const baseClass = "";

  const typeClasses = {
    hoverbutton:
      "bg-white text-center rounded-[30px] relative border-[0.5px] border-black text-black font-semibold group",
    sidebar: "bg-[#000] text-[#fff] hover:bg-[#5a5a5a] w-full mt-4",
    courseHeader:
      "bg-[#FF5A00] text-[#fff] hover:bg-[#FF5A00] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_12px_rgba(255,255,255,0.6)] rounded-xl",
    notesheet:
      "bg-[#FF5A00] text-[#fff] hover:bg-[#FF5A00] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_12px_rgba(255,255,255,0.6)] rounded-[30px]",
    login:
      "bg-white transition-transform hover:translate-y-[-2px] hover:shadow-orange-500 hover:shadow-md rounded-[20px]",
    iconlogin:
      "rounded-full bg-white border-[1px] border-black flex justify-center item-center w-[35px] h-[35px]",
  };

  const finalClassName = `${baseClass} ${typeClasses[type]} ${
    className || ""
  } ${disabled && "cursor-no-drop opacity-80"}`;


  return (
    <div className={finalClassName.trim()} {...rest} onClick={onClick}>
      {children}
    </div>
  );
}
