import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "@/components/auth/UserNav";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Miner Game</span>
                    </Link>
                    <Link
                        href="/admin/dashboard"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/dashboard/stats"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Stats
                    </Link>
                    <Link
                        href="/admin/dashboard/games"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Games
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Miner Game</span>
                            </Link>
                            <Link href="/admin/dashboard" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/dashboard/stats"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Stats
                            </Link>
                            <Link
                                href="/admin/dashboard/games"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Games
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial">
                        {/* Future search bar can go here */}
                    </div>
                    <UserNav />
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    );
} 