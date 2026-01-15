import React, { useState, useMemo } from 'react';
import { useMeal } from '../context/MealContext';
import { aggregateShoppingList } from '../utils/shoppingListUtils';
import { Button } from '../components/shared/Button';
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react';

export const ShoppingListPage: React.FC = () => {
    const { plan } = useMeal();
    const [startDay, setStartDay] = useState(0);
    const [endDay, setEndDay] = useState(6);
    const [showList, setShowList] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const selectedPlans = useMemo(() => {
        return plan.filter(p => p.dayIndex >= startDay && p.dayIndex <= endDay);
    }, [plan, startDay, endDay]);

    const shoppingList = useMemo(() => {
        return aggregateShoppingList(selectedPlans);
    }, [selectedPlans]);

    const toggleChecked = (name: string) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(name)) {
                newSet.delete(name);
            } else {
                newSet.add(name);
            }
            return newSet;
        });
    };

    const checkedCount = checkedItems.size;
    const totalCount = shoppingList.length;

    if (showList) {
        return (
            <div className="p-6 pb-24">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setShowList(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">買い物リスト</h1>
                        <p className="text-sm text-gray-500">{startDay + 1}日目 〜 {endDay + 1}日目</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-indigo-700">{checkedCount} / {totalCount} 品目</span>
                        <span className="text-sm font-bold text-indigo-600">{totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0}%</span>
                    </div>
                    <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="space-y-2">
                    {shoppingList.map((item) => (
                        <div
                            key={`${item.name}_${item.unit}`}
                            onClick={() => toggleChecked(item.name)}
                            className={`flex items-center p-4 bg-white rounded-xl border cursor-pointer transition-all ${checkedItems.has(item.name) ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center transition-all ${checkedItems.has(item.name) ? 'bg-emerald-500 text-white' : 'border-2 border-gray-200'}`}>
                                {checkedItems.has(item.name) && <Check size={14} strokeWidth={3} />}
                            </div>
                            <div className="flex-1">
                                <span className={`font-medium ${checkedItems.has(item.name) ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                    {item.name}
                                </span>
                            </div>
                            <span className={`text-sm ${checkedItems.has(item.name) ? 'text-gray-300' : 'text-gray-500'}`}>
                                {item.amount} {item.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24">
            <h1 className="text-2xl font-bold mb-2">買い物リスト</h1>
            <p className="text-gray-500 text-sm mb-6">日数を選んでリストを生成</p>

            {/* Day Range Selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">開始日</label>
                        <select
                            value={startDay}
                            onChange={(e) => setStartDay(parseInt(e.target.value))}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 appearance-none"
                        >
                            {plan.map(p => (
                                <option key={p.dayIndex} value={p.dayIndex}>{p.dayIndex + 1}日目</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">終了日</label>
                        <select
                            value={endDay}
                            onChange={(e) => setEndDay(parseInt(e.target.value))}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 appearance-none"
                        >
                            {plan.filter(p => p.dayIndex >= startDay).map(p => (
                                <option key={p.dayIndex} value={p.dayIndex}>{p.dayIndex + 1}日目</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="text-center py-4 bg-gray-50 rounded-xl mb-4">
                    <p className="text-sm text-gray-500">選択中: <strong className="text-gray-900">{endDay - startDay + 1}日分</strong></p>
                    <p className="text-xs text-gray-400">{selectedPlans.length * 4}食分 • 約{shoppingList.length}品目</p>
                </div>

                <Button
                    onClick={() => setShowList(true)}
                    className="w-full"
                    disabled={plan.length === 0}
                >
                    <ShoppingCart size={18} className="mr-2" />
                    リストを生成
                </Button>
            </div>

            {/* Quick Presets */}
            <h3 className="font-bold text-gray-900 mb-3">クイック選択</h3>
            <div className="flex gap-2 flex-wrap">
                {[
                    { label: '3日分', start: 0, end: 2 },
                    { label: '1週間', start: 0, end: 6 },
                    { label: '2週間', start: 0, end: 13 },
                    { label: '全30日', start: 0, end: 29 },
                ].map(preset => (
                    <button
                        key={preset.label}
                        onClick={() => { setStartDay(preset.start); setEndDay(Math.min(preset.end, plan.length - 1)); }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
