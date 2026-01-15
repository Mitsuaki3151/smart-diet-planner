import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { WeightChart } from '../components/weight/WeightChart';
import { LogWeightModal } from '../components/weight/LogWeightModal';
import { Plus } from 'lucide-react';

type Range = '1w' | '1m' | '3m' | '6m';

export const WeightPage: React.FC = () => {
    const { state, addWeightEntry } = useUser();
    const [range, setRange] = useState<Range>('1m');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sortedHistory = [...state.weightHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentWeight = sortedHistory.length > 0 ? sortedHistory[sortedHistory.length - 1].weight : state.profile?.currentWeight || 0;
    const startWeight = sortedHistory.length > 0 ? sortedHistory[0].weight : currentWeight;
    const change = currentWeight - startWeight;

    const rangeLabels: Record<Range, string> = {
        '1w': '1週間',
        '1m': '1ヶ月',
        '3m': '3ヶ月',
        '6m': '6ヶ月'
    };

    return (
        <div className="p-6 pb-24 h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-6">体重記録</h1>

            {/* Summary */}
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-gray-500 text-sm">現在</span>
                    <h2 className="text-4xl font-bold text-gray-900">{currentWeight} <small className="text-lg text-gray-500 font-normal">kg</small></h2>
                </div>
                <div className={`text-right ${change <= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    <span className="font-bold text-lg">{change > 0 ? '+' : ''}{change.toFixed(1)} kg</span>
                    <p className="text-xs text-gray-400">増減</p>
                </div>
            </div>

            {/* Range Selector */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                {(['1w', '1m', '3m', '6m'] as Range[]).map((r) => (
                    <button
                        key={r}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${range === r ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        onClick={() => setRange(r)}
                    >
                        {rangeLabels[r]}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <WeightChart data={state.weightHistory} range={range} />

            {/* Fab */}
            <div className="fixed bottom-24 right-6 sm:absolute sm:bottom-6 sm:right-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 transition-transform active:scale-95"
                >
                    <Plus size={28} />
                </button>
            </div>

            <LogWeightModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addWeightEntry}
                currentWeight={currentWeight}
            />
        </div>
    );
};
