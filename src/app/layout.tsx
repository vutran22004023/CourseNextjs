import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebarHeader";
import Head from 'next/head';
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
        <ClientProviders>
          <SidebarHeader>{children}</SidebarHeader>
        </ClientProviders>
      </body>
    </html>
  );
}
