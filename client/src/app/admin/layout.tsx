
import { Inter as FontSans } from "next/font/google"
import ClientProviders from '@/components/ClientProviders';
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import HeaderLayout from '@/components/Layouts/HeaderLayout';
import SidebarComponent from '@/components/Sidebar/sidebar';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
//   const pathname = usePathname();
//   const activePage =
//     pathname === '/'
//       ? 'listenNow'
//       : pathname.includes('/learning-paths')
//       ? 'browse'
//       : pathname.includes('/blog')
//       ? 'radio'
//       : '';

//       const isHeaderVisible = !pathname.includes('/login'); // Example logic
//       const isSidebarVisible = !pathname.includes('/login');
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}

