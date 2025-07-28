import type { Metadata } from "next";
import "@/app/globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Slot Game Builder - Dashboard",
  description: "Create and customize HTML5 slot games without coding",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <Navigation />

      <main className="pt-28 px-4 max-w-7xl mx-auto text-foreground relative z-20">
        {children}
      </main>

      <div className="pointer-events-none fixed right-1/6 z-10 top-0 w-1/2 aspect-square bg-radial from-pink-200 via-transparent to-transparent opacity-20 mix-blend-multiply scale-200"></div>
      <div className="pointer-events-none fixed left-1/6 z-10 bottom-1/4 w-1/2 aspect-square bg-radial from-purple-200 via-transparent to-transparent opacity-20 mix-blend-multiply scale-200"></div>

      <Toaster />
    </div>
  );
}
