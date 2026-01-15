import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { WeightEntry } from '../../types';

interface WeightChartProps {
    data: WeightEntry[];
    range: '1w' | '1m' | '3m' | '6m';
}

export const WeightChart: React.FC<WeightChartProps> = ({ data, range }) => {

    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];

        const now = new Date();
        const cutoff = new Date();

        if (range === '1w') cutoff.setDate(now.getDate() - 7);
        if (range === '1m') cutoff.setMonth(now.getMonth() - 1);
        if (range === '3m') cutoff.setMonth(now.getMonth() - 3);
        if (range === '6m') cutoff.setMonth(now.getMonth() - 6);

        return data
            .filter(d => new Date(d.date) >= cutoff)
            .map(d => ({
                date: `${new Date(d.date).getMonth() + 1}/${new Date(d.date).getDate()}`,
                timestamp: new Date(d.date).getTime(),
                weight: d.weight
            }));
    }, [data, range]);

    if (chartData.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-2xl">
                この期間のデータがありません
            </div>
        );
    }

    return (
        <div className="h-64 w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        domain={['dataMin - 2', 'dataMax + 2']}
                        width={30}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
                        formatter={(value: number) => [`${value} kg`, '体重']}
                    />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
