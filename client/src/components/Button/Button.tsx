import React from 'react';
import { Button } from "@/components/ui/button";

interface ButtonProps {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
    [key: string]: any;
  }
  const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, style,...rest }, ref) => {
      return (
        <Button
          ref={ref}
          className={`bg-[#000] text-[#fff] hover:bg-[#5a5a5a] w-full mt-4 ${className}`} 
          style={{ borderRadius: "20px", ...style }}
          {...rest}
        >
          {children}
        </Button>
      );
    }
  );
  
  ButtonComponent.displayName = 'ButtonComponent'; // Đặt tên hiển thị cho component
  
  export default ButtonComponent;
