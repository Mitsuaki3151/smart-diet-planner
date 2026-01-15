import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useMeal } from '../../context/MealContext';
import { Button } from '../../components/shared/Button';
import { Input } from '../../components/shared/Input';
import { Select } from '../../components/shared/Select';
import type { UserProfile } from '../../types';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Welcome', 'Profile', 'Goal', 'Generating'];

export const OnboardingFlow: React.FC = () => {
    const [step, setStep] = useState(0);
    const { completeOnboarding } = useUser();
    const { generatePlan } = useMeal();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: '',
        gender: 'female',
        height: 160,
        currentWeight: 60,
        targetWeight: 55,
        activityLevel: 'sedentary',
        birthDate: '1995-01-01',
    });

    const handleNext = async () => {
        if (step < STEPS.length - 1) {
            if (STEPS[step + 1] === 'Generating') {
                setStep(step + 1);
                setTimeout(() => {
                    finishOnboarding();
                }, 2000);
            } else {
                setStep(step + 1);
            }
        }
    };

    const finishOnboarding = () => {
        if (!formData.name || !formData.currentWeight || !formData.targetWeight) return;
        completeOnboarding(formData as UserProfile);
        generatePlan();
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'height' || name === 'currentWeight' || name === 'targetWeight'
                ? parseFloat(value)
                : value
        }));
    };

    const renderStep = () => {
        switch (STEPS[step]) {
            case 'Welcome':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-8 animate-fade-in">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-4xl">🥑</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">スマートダイエット</h1>
                            <p className="text-gray-500">あなた専用のAI栄養士</p>
                        </div>
                        <Button onClick={handleNext} className="w-full max-w-xs">
                            始める <ChevronRight className="ml-2" size={20} />
                        </Button>
                    </div>
                );

            case 'Profile':
                return (
                    <div className="flex flex-col h-full p-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6">プロフィール</h2>
                        <div className="space-y-4 flex-1">
                            <Input label="お名前" name="name" value={formData.name} onChange={handleChange} placeholder="名前を入力" />

                            <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Select
                                    label="性別"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    options={[
                                        { label: '女性', value: 'female' },
                                        { label: '男性', value: 'male' },
                                        { label: 'その他', value: 'other' }
                                    ]}
                                />
                                <Input label="生年月日" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input label="身長 (cm)" type="number" name="height" value={formData.height} onChange={handleChange} />
                                <Input label="体重 (kg)" type="number" name="currentWeight" value={formData.currentWeight} onChange={handleChange} />
                            </div>

                            <Select
                                label="活動レベル"
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                options={[
                                    { label: '座り仕事中心', value: 'sedentary' },
                                    { label: '軽い運動 (週1-3日)', value: 'light' },
                                    { label: '適度な運動 (週3-5日)', value: 'moderate' },
                                    { label: '活発な運動 (週6-7日)', value: 'active' }
                                ]}
                            />
                        </div>
                        <Button onClick={handleNext} className="mt-6" disabled={!formData.name}>次へ</Button>
                    </div>
                );

            case 'Goal':
                return (
                    <div className="flex flex-col h-full p-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6">目標設定</h2>
                        <div className="space-y-6 flex-1">
                            <div className="flex flex-col items-center justify-center p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <span className="text-sm text-indigo-600 font-medium mb-1">現在の体重</span>
                                <span className="text-3xl font-bold text-gray-900">{formData.currentWeight} kg</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Input
                                    label="目標体重 (kg)"
                                    type="number"
                                    name="targetWeight"
                                    value={formData.targetWeight}
                                    onChange={handleChange}
                                    className="text-lg font-bold text-center"
                                />
                                <p className="text-xs text-gray-500 text-center">
                                    健康的な減量ペースは週0.5〜1kgです
                                </p>
                            </div>
                        </div>
                        <Button onClick={handleNext} variant="primary" className="mt-6">
                            プランを作成
                        </Button>
                    </div>
                );

            case 'Generating':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
                        <div className="relative mb-8">
                            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl">✨</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2">プラン作成中...</h2>
                        <p className="text-gray-500">食事ガイドラインに基づいて30日間のメニューを作成しています</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="h-screen bg-white">
            {renderStep()}
        </div>
    );
};
