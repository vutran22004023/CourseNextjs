import React from "react";
import NarBar from "./navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NarBar>{children}</NarBar>
    </div>
  );
}
