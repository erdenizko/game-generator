'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, DollarSign, Gamepad2, Target } from 'lucide-react';

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
}

interface DashboardStatsCardsProps {
    stats: DashboardStats;
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
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

    const formatPercentage = (value: number): string => {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const getChangeIcon = (change: number) => {
        if (change >= 0) {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        }
        return <TrendingDown className="h-4 w-4 text-red-600" />;
    };

    const getChangeColor = (change: number) => {
        return change >= 0 ? 'text-green-600' : 'text-red-600';
    };

    const cards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            change: stats.revenueChange24h,
            icon: DollarSign,
            description: 'Total revenue generated',
        },
        {
            title: 'Total Players',
            value: formatNumber(stats.totalPlayers),
            change: stats.playersChange24h,
            icon: Users,
            description: 'Unique players',
        },
        {
            title: 'Total Spins',
            value: formatNumber(stats.totalSpins),
            change: stats.spinsChange24h,
            icon: Gamepad2,
            description: 'Total spins played',
        },
        {
            title: 'Active Games',
            value: formatNumber(stats.totalGames),
            change: 0, // No change for games count
            icon: Target,
            description: 'Published games',
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {card.title}
                        </CardTitle>
                        <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p className="text-xs text-muted-foreground">{card.description}</p>
                        {card.change !== 0 && (
                            <div className="flex items-center mt-2">
                                {getChangeIcon(card.change)}
                                <span className={`text-xs font-medium ml-1 ${getChangeColor(card.change)}`}>
                                    {formatPercentage(card.change)}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 