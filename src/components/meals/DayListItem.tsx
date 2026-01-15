import React from 'react';
import type { DayPlan } from '../../types';
import { Check, ChevronRight } from 'lucide-react';

interface DayListItemProps {
    day: DayPlan;
    onClick: () => void;
}

export const DayListItem: React.FC<DayListItemProps> = ({ day, onClick }) => {
    const totalCalories =
        day.meals.breakfast.calories +
        day.meals.lunch.calories +
        day.meals.dinner.calories +
        day.meals.snack.calories;

    const date = new Date(day.date);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const dayName = dayNames[date.getDay()];
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

    return (
        <div
            onClick={onClick}
            className={`flex items-center p-4 bg-white rounded-xl mb-3 cursor-pointer border transition-all hover:border-indigo-200 hover:shadow-sm ${day.isCompleted ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-100'}`}
        >
            <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center mr-4 ${day.isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {day.isCompleted ? (
                    <Check size={24} strokeWidth={3} />
                ) : (
                    <>
                        <span className="text-xs font-medium">{dayName}</span>
                        <span className="text-sm font-bold">{day.dayIndex + 1}</span>
                    </>
                )}
            </div>

            <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{day.dayIndex + 1}日目</h4>
                <p className="text-xs text-gray-500">{dateStr} • {totalCalories} kcal</p>
            </div>

            <ChevronRight size={20} className="text-gray-300" />
        </div>
    );
};
