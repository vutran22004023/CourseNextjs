export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased">
      <div className="container">{children}</div>
    </div>
  );
}
