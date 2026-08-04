export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* No Header here! */}
        {children}
      </body>
    </html>
  );
}