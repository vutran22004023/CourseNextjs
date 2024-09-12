import React from 'react';

interface ButtonProps {
    type?:
      | "sidebar"
      | "courseHeader"
    children: React.ReactNode;
    className: string;
  }
export default function Button({
  type = "sidebar",
  children,
  className,
  ...rest
}: ButtonProps) {
  const baseClass = "bg-[#000] text-[#fff] hover:bg-[#5a5a5a] w-full";

  const typeClasses = {
    sidebar: "bg-[#000] text-[#fff] hover:bg-[#5a5a5a] w-full mt-4",
    courseHeader: "px-3 py-1 rounded-xl",
  };

  const finalClassName = `${baseClass} ${typeClasses[type]} ${className || ""}`;

  return (
    <div className={finalClassName.trim()} {...rest}>
      {children}
    </div>
  );
}
