import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMeal } from '../context/MealContext';
import { MealDetailCard } from '../components/meals/MealDetailCard';
import { Button } from '../components/shared/Button';
import { ArrowLeft, Check, MessageCircle, X, Send } from 'lucide-react';

export const DayDetailPage: React.FC = () => {
    const { dayIndex } = useParams<{ dayIndex: string }>();
    const navigate = useNavigate();
    const { plan, markDayComplete, replaceMeal } = useMeal();
    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);

    const index = parseInt(dayIndex || '0', 10);
    const dayPlan = plan.find(p => p.dayIndex === index);

    if (!dayPlan) {
        return (
            <div className="p-6 text-center text-gray-500">
                <p>この日は見つかりませんでした</p>
                <Button onClick={() => navigate('/plan')} className="mt-4">献立に戻る</Button>
            </div>
        );
    }

    const date = new Date(dayPlan.date);
    const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

    const handleSendChat = () => {
        if (!chatInput.trim()) return;

        setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);

        setTimeout(() => {
            let response = "献立の変更をお手伝いします。代替案を提案しますね...";

            if (chatInput.includes('朝') || chatInput.toLowerCase().includes('breakfast')) {
                replaceMeal(index, 'breakfast');
                response = "朝食を新しいメニューに更新しました！";
            } else if (chatInput.includes('昼') || chatInput.toLowerCase().includes('lunch')) {
                replaceMeal(index, 'lunch');
                response = "昼食を別のメニューに変更しました！";
            } else if (chatInput.includes('夕') || chatInput.includes('夜') || chatInput.toLowerCase().includes('dinner')) {
                replaceMeal(index, 'dinner');
                response = "夕食を更新しました！";
            } else if (chatInput.includes('間食') || chatInput.includes('おやつ') || chatInput.toLowerCase().includes('snack')) {
                replaceMeal(index, 'snack');
                response = "間食を更新しました！";
            } else {
                response = "献立の変更をお手伝いします。「朝食を変えて」や「夕食を別のものに」などと言ってみてください。";
            }

            setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
        }, 500);

        setChatInput('');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/plan')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{index + 1}日目</h1>
                        <p className="text-xs text-gray-500">{dateStr}</p>
                    </div>
                </div>
            </div>

            {/* Meals */}
            <div className="p-4">
                <MealDetailCard
                    meal={dayPlan.meals.breakfast}
                    type="breakfast"
                    isCompleted={dayPlan.isCompleted}
                    onReplace={() => replaceMeal(index, 'breakfast')}
                />
                <MealDetailCard
                    meal={dayPlan.meals.lunch}
                    type="lunch"
                    isCompleted={dayPlan.isCompleted}
                    onReplace={() => replaceMeal(index, 'lunch')}
                />
                <MealDetailCard
                    meal={dayPlan.meals.dinner}
                    type="dinner"
                    isCompleted={dayPlan.isCompleted}
                    onReplace={() => replaceMeal(index, 'dinner')}
                />
                <MealDetailCard
                    meal={dayPlan.meals.snack}
                    type="snack"
                    isCompleted={dayPlan.isCompleted}
                    onReplace={() => replaceMeal(index, 'snack')}
                />
            </div>

            {/* Complete Day Button */}
            <div className="p-4">
                <Button
                    onClick={() => markDayComplete(index, !dayPlan.isCompleted)}
                    variant={dayPlan.isCompleted ? 'outline' : 'primary'}
                    className="w-full"
                >
                    {dayPlan.isCompleted ? (
                        <>完了を取り消す</>
                    ) : (
                        <><Check size={18} className="mr-2" /> この日を完了にする</>
                    )}
                </Button>
            </div>

            {/* Chat FAB */}
            <button
                onClick={() => setChatOpen(true)}
                className="fixed bottom-24 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-transform active:scale-95 z-20"
            >
                <MessageCircle size={24} />
            </button>

            {/* Chat Modal */}
            {chatOpen && (
                <div className="fixed inset-0 z-50 flex flex-col">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setChatOpen(false)} />

                    <div className="relative mt-auto bg-white rounded-t-3xl max-h-[70vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-gray-900">献立をカスタマイズ</h3>
                            <button onClick={() => setChatOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
                            {chatMessages.length === 0 && (
                                <div className="text-center text-gray-400 py-6">
                                    <p className="text-sm">献立の変更をリクエストしてください！</p>
                                    <p className="text-xs mt-1">例：「朝食を変えて」「鮭が苦手」</p>
                                </div>
                            )}
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t flex gap-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                                placeholder="リクエストを入力..."
                                className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                onClick={handleSendChat}
                                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
