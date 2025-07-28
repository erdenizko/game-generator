'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TopGame {
    gameId: string;
    title: string;
    totalRevenue: number;
    totalSpins: number;
    totalPlayers: number;
    rtp: number;
    avgBet: number;
}

interface TopGamesData {
    byRevenue: TopGame[];
    byUsage: TopGame[];
    byPlayers: TopGame[];
}

interface TopGamesChartsProps {
    data: TopGamesData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ff8042', '#00c49f', '#ffbb28', '#ff8042'];

export function TopGamesCharts({ data }: TopGamesChartsProps) {
    const [chartType, setChartType] = useState<'revenue' | 'usage' | 'players'>('revenue');
    const [displayType, setDisplayType] = useState<'bar' | 'pie'>('bar');

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

    const getChartData = () => {
        switch (chartType) {
            case 'revenue':
                return data.byRevenue.slice(0, 10).map(game => ({
                    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                    value: game.totalRevenue,
                    fullName: game.title,
                    revenue: game.totalRevenue,
                    spins: game.totalSpins,
                    players: game.totalPlayers,
                }));
            case 'usage':
                return data.byUsage.slice(0, 10).map(game => ({
                    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                    value: game.totalSpins,
                    fullName: game.title,
                    revenue: game.totalRevenue,
                    spins: game.totalSpins,
                    players: game.totalPlayers,
                }));
            case 'players':
                return data.byPlayers.slice(0, 10).map(game => ({
                    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
                    value: game.totalPlayers,
                    fullName: game.title,
                    revenue: game.totalRevenue,
                    spins: game.totalSpins,
                    players: game.totalPlayers,
                }));
            default:
                return [];
        }
    };

    const chartData = getChartData();

    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean;
        payload?: Array<{ payload: { fullName: string; revenue: number; spins: number; players: number } }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-bold">{data.fullName}</p>
                    <p className="text-sm text-gray-600">Revenue: {formatCurrency(data.revenue)}</p>
                    <p className="text-sm text-gray-600">Spins: {formatNumber(data.spins)}</p>
                    <p className="text-sm text-gray-600">Players: {formatNumber(data.players)}</p>
                </div>
            );
        }
        return null;
    };

    const getChartTitle = () => {
        switch (chartType) {
            case 'revenue':
                return 'Top Games by Revenue';
            case 'usage':
                return 'Top Games by Usage';
            case 'players':
                return 'Top Games by Players';
            default:
                return 'Top Games';
        }
    };

    const getYAxisLabel = () => {
        switch (chartType) {
            case 'revenue':
                return 'Revenue ($)';
            case 'usage':
                return 'Spins';
            case 'players':
                return 'Players';
            default:
                return '';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>{getChartTitle()}</CardTitle>
                        <CardDescription>
                            Performance metrics for your top performing games
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Select value={chartType} onValueChange={(value: string) => setChartType(value as 'revenue' | 'usage' | 'players')}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="usage">Usage</SelectItem>
                                <SelectItem value="players">Players</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={displayType} onValueChange={(value: string) => setDisplayType(value as 'bar' | 'pie')}>
                            <SelectTrigger className="w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bar">Bar</SelectItem>
                                <SelectItem value="pie">Pie</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        {displayType === 'bar' ? (
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    fontSize={12}
                                />
                                <YAxis
                                    label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
                                    fontSize={12}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        ) : (
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
} 