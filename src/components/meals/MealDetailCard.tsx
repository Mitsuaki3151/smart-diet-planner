import React, { useState } from 'react';
import type { Meal } from '../../types';
import { Check, RefreshCw } from 'lucide-react';

interface MealDetailCardProps {
    meal: Meal;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    isCompleted: boolean;
    onReplace: () => void;
}

export const MealDetailCard: React.FC<MealDetailCardProps> = ({ meal, type, isCompleted, onReplace }) => {
    const [showIngredients, setShowIngredients] = useState(false);

    const icons = {
        breakfast: '🌅',
        lunch: '☀️',
        dinner: '🌙',
        snack: '🍎'
    };

    const titles = {
        breakfast: '朝食',
        lunch: '昼食',
        dinner: '夕食',
        snack: '間食'
    };

    return (
        <div className={`bg-white rounded-2xl border p-4 mb-4 transition-all ${isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        {icons[type]}
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{titles[type]}</p>
                        <h4 className="font-bold text-gray-900">{meal.name}</h4>
                    </div>
                </div>
                {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Nutrition */}
            <div className="flex gap-4 mb-4 text-center">
                <div className="flex-1 bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-indigo-600">{meal.calories}</p>
                    <p className="text-xs text-gray-400">kcal</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-700">{meal.protein}g</p>
                    <p className="text-xs text-gray-400">タンパク質</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-700">{meal.carbs}g</p>
                    <p className="text-xs text-gray-400">炭水化物</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-700">{meal.fat}g</p>
                    <p className="text-xs text-gray-400">脂質</p>
                </div>
            </div>

            {/* Ingredients Toggle */}
            <button
                onClick={() => setShowIngredients(!showIngredients)}
                className="text-sm text-indigo-600 font-medium mb-3"
            >
                {showIngredients ? '材料を隠す' : '材料を見る'}
            </button>

            {showIngredients && (
                <ul className="mb-4 space-y-1">
                    {meal.ingredients.map((ing, i) => (
                        <li key={i} className="text-sm text-gray-600 flex justify-between">
                            <span>{ing.name}</span>
                            <span className="text-gray-400">{ing.amount} {ing.unit}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={onReplace}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    <RefreshCw size={16} />
                    料理を変更
                </button>
            </div>
        </div>
    );
};
