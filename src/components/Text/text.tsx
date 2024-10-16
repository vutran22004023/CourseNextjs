import React from "react";

interface Prop {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "header"
    | "subtitleDefault";
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  type = "default",
  children,
  className,
  ...rest
}: Prop) {
  const baseClass = "text-[#000] cactus-classical-mono-md";

  const typeClasses = {
    default: "text-[16px]",
    title: "text-[32px] font-bold leading-8",
    defaultSemiBold: "text-base font-bold leading-6",
    subtitle: "text-2xl font-bold leading-6",
    subtitleDefault: "text-2xl",
    header: "text-3xl font-bold",
  };

  const finalClassName = `${baseClass} ${typeClasses[type]} ${className || ""}`;

  return (
    <div className={finalClassName.trim()} {...rest}>
      {children}
    </div>
  );
}
