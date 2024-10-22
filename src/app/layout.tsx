import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebarHeader";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brain.png" /> 
      </head>
      <body className={cn("min-h-screen text-black bg-white font-sans antialiased",fontSans.variable)}>
          <SidebarHeader>{children}</SidebarHeader>
      </body>
    </html>
  );
}
