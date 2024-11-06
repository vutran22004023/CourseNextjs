import SidebarAdmin from "./sideBar";
import HeaderLayout from "@/components/Layouts/HeaderLayout";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background font-sans antialiased">
      <SidebarAdmin>{children}</SidebarAdmin>
    </div>
  );
}
