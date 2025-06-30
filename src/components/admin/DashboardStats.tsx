'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        direction: 'up' | 'down';
    };
    icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend, icon }) => (
    <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            {icon && (
                <div className="h-4 w-4 text-muted-foreground">
                    {icon}
                </div>
            )}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {trend && (
                <div className={`flex items-center text-xs mt-2 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    <span className={`mr-1 ${trend.direction === 'up' ? '↗️' : '↘️'
                        }`}>
                        {trend.direction === 'up' ? '↗️' : '↘️'}
                    </span>
                    {Math.abs(trend.value)}% from last month
                </div>
            )}
        </CardContent>
    </Card>
);

interface DashboardStatsProps {
    stats: {
        totalGames: number;
        activeUsers: number;
        totalRevenue: number;
        avgSessionTime: string;
        totalSpins: number;
        winRate: number;
    };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard
                title="Total Games"
                value={stats.totalGames}
                description="Active game configurations"
                trend={{ value: 12, direction: 'up' }}
                icon={<GamepadIcon />}
            />
            <StatCard
                title="Active Users"
                value={stats.activeUsers.toLocaleString()}
                description="Last 24 hours"
                trend={{ value: 8, direction: 'up' }}
                icon={<UsersIcon />}
            />
            <StatCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                description="All time"
                trend={{ value: 15, direction: 'up' }}
                icon={<DollarSignIcon />}
            />
            <StatCard
                title="Avg Session"
                value={stats.avgSessionTime}
                description="Time per session"
                trend={{ value: 5, direction: 'down' }}
                icon={<ClockIcon />}
            />
            <StatCard
                title="Total Spins"
                value={stats.totalSpins.toLocaleString()}
                description="All games combined"
                trend={{ value: 23, direction: 'up' }}
                icon={<ActivityIcon />}
            />
            <StatCard
                title="Win Rate"
                value={`${stats.winRate}%`}
                description="Player win percentage"
                trend={{ value: 2, direction: 'down' }}
                icon={<TrendingUpIcon />}
            />
        </div>
    );
};

// Simple icon components
const GamepadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="18" y2="12"></line>
        <line x1="12" y1="6" x2="12" y2="18"></line>
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
        <polyline points="17,6 23,6 23,12"></polyline>
    </svg>
);

export default DashboardStats;