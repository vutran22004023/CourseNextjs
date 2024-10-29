import HeaderLayout from "@/components/Layouts/HeaderLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased">
      <HeaderLayout />
      <div className="container">{children}</div>
    </div>
  );
}
