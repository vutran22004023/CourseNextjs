import React from 'react';

interface ButtonProps {
    type?:
      | "sidebar"
      | "courseHeader"
      | "notesheet"
    children: React.ReactNode;
    className: string;
  }
export default function Button({
  type = "sidebar",
  children,
  className,
  ...rest
}: ButtonProps) {
  const baseClass = "";

  const typeClasses = {
    sidebar: "bg-[#000] text-[#fff] hover:bg-[#5a5a5a] w-full mt-4",
    courseHeader: "bg-[#FF5A00] text-[#fff] hover:bg-[#FF5A00] transition-transform hover:translate-y-[-2px] hover:shadow-[4px_4px_12px_rgba(255,255,255,0.6)] rounded-xl",
    notesheet: "text-black",
  };

  const finalClassName = `${baseClass} ${typeClasses[type]} ${className || ""}`;

  return (
    <div className={finalClassName.trim()} {...rest}>
      {children}
    </div>
  );
}
