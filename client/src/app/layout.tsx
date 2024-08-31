import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
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
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        <ClientProviders>
          <SidebarHeader>{children}</SidebarHeader>
        </ClientProviders>
      </body>
    </html>
  );
}
