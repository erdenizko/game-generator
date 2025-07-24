import type { Metadata } from "next";
import "@/app/globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

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
    <>
      <Navigation />
      <main className="pt-24 min-h-screen bg-gradient-to-br from-background via-muted/80 to-muted/50 px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
}
