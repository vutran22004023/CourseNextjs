import React from 'react';

interface CardProps {
  children: React.ReactNode; // Adjust children type
}
export default function Cart({children} : CardProps) {
  return (
    <div
      className="w-full  border-2 border-inherit p-5 mb-5"
      style={{ borderRadius: "20px" }}
    >
      {children}
    </div>
  );
}
