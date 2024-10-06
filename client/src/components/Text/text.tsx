import React from "react";

interface Prop {
  type?:
    | "default"
    | "title"
    | "defaultBold"
    | "largeTitle"
    | "smallHeader"
    | "mediumTitle";
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

  // const typeClasses = {
  //   default: "text-[16px]",
  //   title: "text-[32px] font-bold leading-8",
  //   defaultBold: "text-base font-bold leading-6",
  //   largeTitle: "text-2xl font-bold leading-6",
  //   mediumTitle: "text-2xl",
  //   smallHeader: "text-3xl font-bold",
  // };

  const typeClasses = {
    default: "text-[16px]", // Default font size
    title: "text-[32px] font-bold leading-8", // Large bold title
    defaultBold: "text-base font-bold leading-6", // Default bold text
    largeTitle: "text-2xl font-bold leading-6", // Large bold title
    mediumTitle: "text-2xl", // Medium default title
    smallHeader: "text-3xl font-bold", // Small smallHeader
  };

  const finalClassName = `${baseClass} ${typeClasses[type]} ${className || ""}`;

  return (
    <div className={finalClassName.trim()} {...rest}>
      {children}
    </div>
  );
}
