import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth-context";
import { ReactQueryProvider } from '@/app/providers';
import "./globals.css";

export const metadata: Metadata = {
  title: "Slot Game Builder",
  description: "Create and customize HTML5 slot games without coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`antialiased`}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
