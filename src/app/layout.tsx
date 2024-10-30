import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebarHeader";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { cookies } from 'next/headers';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    template: "%s | CourseNiver",
    default: "CourseNiver",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('access_Token')?.value;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen text-black bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProviders token={myCookie}>
          <SidebarHeader>{children}</SidebarHeader>
        </ClientProviders>
      </body>
    </html>
  );
}
