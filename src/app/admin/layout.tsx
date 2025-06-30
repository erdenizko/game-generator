import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin panel for Miner Game",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            {children}
        </div>
    );
} 