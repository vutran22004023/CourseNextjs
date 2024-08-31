import SidebarAdmin from "./sideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SidebarAdmin>{children}</SidebarAdmin>
    </div>
  );
}
