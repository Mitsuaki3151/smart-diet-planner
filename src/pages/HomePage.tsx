import React, { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { useMeal } from '../context/MealContext';
import { DashboardCard } from '../components/home/DashboardCard';
import { TodayMealCard } from '../components/home/TodayMealCard';
import { Navigate } from 'react-router-dom';
import { TrendingDown, Calendar } from 'lucide-react';

export const HomePage: React.FC = () => {
    const { state } = useUser();
    const { plan } = useMeal();

    if (!state.profile) return <Navigate to="/welcome" />;

    const today = new Date();
    const startDate = new Date(state.startDate);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const displayIndex = Math.min(Math.max(dayIndex, 0), 29);
    const todayPlan = plan.find(p => p.dayIndex === displayIndex);

    const progress = useMemo(() => {
        if (!state.profile) return 0;
        const initialWeight = state.weightHistory.length > 0 ? state.weightHistory[0].weight : state.profile.currentWeight;
        const lost = initialWeight - state.profile.currentWeight;
        const totalBase = initialWeight - state.profile.targetWeight;

        if (totalBase <= 0) return 100;
        return Math.min(Math.max((lost / totalBase) * 100, 0), 100);
    }, [state.profile, state.weightHistory]);

    return (
        <div className="p-6 pb-24 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">おかえりなさい</p>
                    <h1 className="text-2xl font-bold text-gray-900">{state.profile.name}さん</h1>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Calendar size={20} />
                </div>
            </div>

            {/* Weight Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-indigo-100 text-sm font-medium mb-1">現在の体重</p>
                        <h2 className="text-3xl font-bold">{state.profile.currentWeight} <span className="text-lg font-normal text-indigo-200">kg</span></h2>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <TrendingDown size={20} className="text-white" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-indigo-100">
                        <span>目標: {state.profile.targetWeight} kg</span>
                        <span>達成率 {Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Today's Plan */}
            <DashboardCard title="今日の献立" action={<span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{displayIndex + 1}日目</span>}>
                {todayPlan ? (
                    <div className="space-y-1">
                        <TodayMealCard
                            type="breakfast"
                            meal={todayPlan.meals.breakfast}
                            isCompleted={false}
                            onToggle={() => { }}
                        />
                        <TodayMealCard
                            type="lunch"
                            meal={todayPlan.meals.lunch}
                            isCompleted={false}
                            onToggle={() => { }}
                        />
                        <TodayMealCard
                            type="dinner"
                            meal={todayPlan.meals.dinner}
                            isCompleted={false}
                            onToggle={() => { }}
                        />
                        <TodayMealCard
                            type="snack"
                            meal={todayPlan.meals.snack}
                            isCompleted={false}
                            onToggle={() => { }}
                        />
                    </div>
                ) : (
                    <div className="text-center py-6 text-gray-400">
                        今日のプランがありません。<br />
                        <span className="text-sm">設定から作成できます</span>
                    </div>
                )}
            </DashboardCard>
        </div>
    );
};
