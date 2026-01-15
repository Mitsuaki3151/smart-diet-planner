import React from 'react';
import type { Meal } from '../../types';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TodayMealCardProps {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    meal?: Meal;
    isCompleted: boolean;
    onToggle: () => void;
}

export const TodayMealCard: React.FC<TodayMealCardProps> = ({ type, meal, isCompleted, onToggle }) => {
    const navigate = useNavigate();

    const titles = {
        breakfast: '朝食',
        lunch: '昼食',
        dinner: '夕食',
        snack: '間食'
    };

    const icons = {
        breakfast: '🌅',
        lunch: '☀️',
        dinner: '🌙',
        snack: '🍎'
    };

    if (!meal) return null;

    return (
        <div className="flex items-center p-3 bg-gray-50 rounded-xl mb-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate('/plan')}>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm mr-3">
                {icons[type]}
            </div>
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{titles[type]}</p>
                <h4 className="font-medium text-gray-900 text-sm truncate">{meal.name}</h4>
                <p className="text-xs text-gray-400">{meal.calories} kcal</p>
            </div>
            <button
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-indigo-600 text-white' : 'border-2 border-gray-200 text-gray-300 hover:border-indigo-600 hover:text-indigo-600'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
            >
                <Check size={16} strokeWidth={3} />
            </button>
        </div>
    );
};
