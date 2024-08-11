import HeaderLayoutCourses from "@/components/Layouts/HeaderLayoutCourses";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
        <HeaderLayoutCourses/>
        {children}
    </div>
  );
}