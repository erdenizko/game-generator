import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardStats from "@/components/admin/DashboardStats";
import Link from "next/link";

export default function AdminPanelPage() {
    // Mock data - in real app, this would come from API
    const stats = {
        totalGames: 12,
        activeUsers: 1234,
        totalRevenue: 45678,
        avgSessionTime: "4m 32s",
        totalSpins: 89012,
        winRate: 23.4
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Monitor your casino games and player activity
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button asChild>
                        <Link href="/admin/dashboard/games/new">Create Game</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/dashboard/stats">View Analytics</Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <DashboardStats stats={stats} />

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            🎮 Game Management
                        </CardTitle>
                        <CardDescription>
                            Configure games, adjust odds, and manage prizes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Button asChild className="w-full">
                                <Link href="/admin/dashboard/games">Manage Games</Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/admin/dashboard/games/new">Create New Game</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            📊 Analytics & Reports
                        </CardTitle>
                        <CardDescription>
                            View player activity, revenue, and performance metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Button asChild className="w-full">
                                <Link href="/admin/dashboard/stats">View Analytics</Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/admin/dashboard/revenue">Revenue Report</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            🎯 Live Preview
                        </CardTitle>
                        <CardDescription>
                            Test your games with live preview functionality
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Button asChild className="w-full">
                                <Link href="/iframe/game?preview=true&gameType=CASINO_WHEEL">
                                    Preview Wheel Game
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/iframe/game?preview=true&gameType=SLOT_MACHINE">
                                    Preview Slot Machine
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        Latest game sessions and player actions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    🎰
                                </div>
                                <div>
                                    <p className="font-medium">New slot machine game created</p>
                                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Admin
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    🎡
                                </div>
                                <div>
                                    <p className="font-medium">Wheel game odds updated</p>
                                    <p className="text-sm text-muted-foreground">15 minutes ago</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Admin
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    💎
                                </div>
                                <div>
                                    <p className="font-medium">High value win detected</p>
                                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Player #1234
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 