'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Trophy } from 'lucide-react';
import { DashboardStatsCards } from '@/components/analytics/dashboard-stats-cards';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProtectedRoute } from '@/components/auth/protected-route';
import Header from '@/components/layout/header';

interface DashboardStats {
    totalRevenue: number;
    totalPlayers: number;
    totalSpins: number;
    totalGames: number;
    avgRtp: number;
    avgBet: number;
    revenueChange24h: number;
    playersChange24h: number;
    spinsChange24h: number;
    topPerformingGame: {
        id: string;
        title: string;
        revenue: number;
        players: number;
    } | null;
    recentActivity: {
        date: string;
        revenue: number;
        players: number;
        spins: number;
    }[];
}

async function fetchDashboardData(): Promise<DashboardStats> {
    const response = await fetch(`/api/metrics/dashboard?period=7d`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
    }

    const statsData = await response.json();
    return statsData.data;
}

export default function DashboardPage() {
    const { data: dashboardStats } = useQuery<DashboardStats>({
        queryKey: ['dashboardStats'],
        queryFn: fetchDashboardData,
    });

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <>
            <Header title="Dashboard" description="Track your game performance and player engagement" />

            {/* Stats Cards */}
            {dashboardStats && (
                <div className="mb-8">
                    <DashboardStatsCards stats={dashboardStats} />
                </div>
            )}

            {/* Recent Activity Chart */}
            {dashboardStats?.recentActivity && (
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Recent Activity (Last 7 Days)
                            </CardTitle>
                            <CardDescription>
                                Daily trends for revenue, players, and spins
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={dashboardStats.recentActivity}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                        />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip
                                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                            formatter={(value: number, name: string) => [
                                                name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                                                name.charAt(0).toUpperCase() + name.slice(1)
                                            ]}
                                        />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            name="Revenue"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="players"
                                            stroke="#82ca9d"
                                            strokeWidth={2}
                                            name="Players"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="spins"
                                            stroke="#ffc658"
                                            strokeWidth={2}
                                            name="Spins"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Top Performing Game */}
            {dashboardStats?.topPerformingGame && (
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Top Performing Game
                            </CardTitle>
                            <CardDescription>
                                Your best performing game this period
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                <div>
                                    <h3 className="text-xl font-bold">{dashboardStats.topPerformingGame.title}</h3>
                                    <p className="text-muted-foreground">Game ID: {dashboardStats.topPerformingGame.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(dashboardStats.topPerformingGame.revenue)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatNumber(dashboardStats.topPerformingGame.players)} players
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

        </>
    );
}
