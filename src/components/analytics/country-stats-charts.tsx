'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CountryStats {
    country: string;
    countryName: string;
    totalRevenue: number;
    totalSpins: number;
    totalPlayers: number;
    avgBet: number;
    rtp: number;
    playerCount: number;
}

interface CountryStatsData {
    byRevenue: CountryStats[];
    byPlayers: CountryStats[];
    bySpins: CountryStats[];
    summary: {
        totalCountries: number;
        totalRevenue: number;
        totalPlayers: number;
        totalSpins: number;
    };
}

interface CountryStatsChartsProps {
    data: CountryStatsData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ff8042', '#00c49f', '#ffbb28', '#ff8042'];

export function CountryStatsCharts({ data }: CountryStatsChartsProps) {
    const [chartType, setChartType] = useState<'revenue' | 'players' | 'spins'>('revenue');
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
                return data.byRevenue.slice(0, 10).map(country => ({
                    name: country.countryName,
                    value: country.totalRevenue,
                    country: country.country,
                    revenue: country.totalRevenue,
                    spins: country.totalSpins,
                    players: country.totalPlayers,
                    avgBet: country.avgBet,
                    rtp: country.rtp,
                }));
            case 'players':
                return data.byPlayers.slice(0, 10).map(country => ({
                    name: country.countryName,
                    value: country.totalPlayers,
                    country: country.country,
                    revenue: country.totalRevenue,
                    spins: country.totalSpins,
                    players: country.totalPlayers,
                    avgBet: country.avgBet,
                    rtp: country.rtp,
                }));
            case 'spins':
                return data.bySpins.slice(0, 10).map(country => ({
                    name: country.countryName,
                    value: country.totalSpins,
                    country: country.country,
                    revenue: country.totalRevenue,
                    spins: country.totalSpins,
                    players: country.totalPlayers,
                    avgBet: country.avgBet,
                    rtp: country.rtp,
                }));
            default:
                return [];
        }
    };

    const chartData = getChartData();

    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean;
        payload?: Array<{ payload: { name: string; revenue: number; spins: number; players: number; avgBet: number; rtp: number } }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm text-gray-600">Revenue: {formatCurrency(data.revenue)}</p>
                    <p className="text-sm text-gray-600">Spins: {formatNumber(data.spins)}</p>
                    <p className="text-sm text-gray-600">Players: {formatNumber(data.players)}</p>
                    <p className="text-sm text-gray-600">Avg Bet: {formatCurrency(data.avgBet)}</p>
                    <p className="text-sm text-gray-600">RTP: {data.rtp.toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    const getChartTitle = () => {
        switch (chartType) {
            case 'revenue':
                return 'Countries by Revenue';
            case 'players':
                return 'Countries by Players';
            case 'spins':
                return 'Countries by Spins';
            default:
                return 'Country Statistics';
        }
    };

    const getYAxisLabel = () => {
        switch (chartType) {
            case 'revenue':
                return 'Revenue ($)';
            case 'players':
                return 'Players';
            case 'spins':
                return 'Spins';
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
                            Performance metrics by country
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Select value={chartType} onValueChange={(value: string) => setChartType(value as 'revenue' | 'players' | 'spins')}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="players">Players</SelectItem>
                                <SelectItem value="spins">Spins</SelectItem>
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
                                <Bar dataKey="value" fill="#82ca9d" />
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
                                    fill="#82ca9d"
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