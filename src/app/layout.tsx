import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebarHeader";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    template: "%s | CourseNiver",
    default: "CourseNiver",
  },
  icons: {
    icon: "/brain.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen text-black bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProviders>
          <SidebarHeader>{children}</SidebarHeader>
        </ClientProviders>
      </body>
    </html>
  );
}
