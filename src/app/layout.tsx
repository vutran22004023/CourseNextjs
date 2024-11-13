import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebarHeader";
import { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { LanguageProvider } from "@/context/LanguageContext";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    template: "%s | CourseNiver",
    default: "CourseNiver",
  },
  icons: "/brain.png"
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          "text-black bg-white font-sans",
          fontSans.variable
        )}
      >
        <ClientProviders>
          <LanguageProvider>
            <SidebarHeader>{children}</SidebarHeader>
          </LanguageProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
