import SidebarAdmin from "./sideBar";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <HeaderLayout/>
      <SidebarAdmin>{children}</SidebarAdmin>
    </div>
  );
}
