import React from 'react';
import { useMeal } from '../context/MealContext';
import { useNavigate } from 'react-router-dom';
import { DayListItem } from '../components/meals/DayListItem';

export const MealPlanPage: React.FC = () => {
    const { plan } = useMeal();
    const navigate = useNavigate();

    const completedDays = plan.filter(d => d.isCompleted).length;
    const progress = plan.length > 0 ? (completedDays / plan.length) * 100 : 0;

    return (
        <div className="p-6 pb-24">
            <h1 className="text-2xl font-bold mb-2">献立プラン</h1>
            <p className="text-gray-500 text-sm mb-6">30日間のパーソナライズメニュー</p>

            {/* Progress */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">{completedDays} / {plan.length} 日完了</span>
                    <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Day List */}
            {plan.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <p>献立プランがまだありません</p>
                    <p className="text-sm">オンボーディングを完了して始めましょう</p>
                </div>
            ) : (
                <div>
                    {plan.map(day => (
                        <DayListItem
                            key={day.dayIndex}
                            day={day}
                            onClick={() => navigate(`/plan/${day.dayIndex}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
