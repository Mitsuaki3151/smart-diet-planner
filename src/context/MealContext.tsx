import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DayPlan } from '../types';
import { generateMealPlan, regenerateMeal } from '../utils/mealGenerator';
import { useUser } from './UserContext';

interface MealContextType {
    plan: DayPlan[];
    generatePlan: () => void;
    markDayComplete: (dayIndex: number, completed: boolean) => void;
    replaceMeal: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
}

const STORAGE_KEY = 'smart_diet_planner_meals';

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state: userState } = useUser();
    const [plan, setPlan] = useState<DayPlan[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    }, [plan]);

    // Auto-generate plan when profile is set and plan is empty
    useEffect(() => {
        if (userState.profile && userState.hasCompletedOnboarding && plan.length === 0) {
            const newPlan = generateMealPlan(userState.profile);
            setPlan(newPlan);
        }
    }, [userState.profile, userState.hasCompletedOnboarding, plan.length]);

    const generatePlan = () => {
        if (!userState.profile) return;
        const newPlan = generateMealPlan(userState.profile);
        setPlan(newPlan);
    };

    const markDayComplete = (dayIndex: number, completed: boolean) => {
        setPlan(prev => prev.map(day =>
            day.dayIndex === dayIndex ? { ...day, isCompleted: completed } : day
        ));
    };

    const replaceMeal = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
        setPlan(prev => prev.map(day => {
            if (day.dayIndex !== dayIndex) return day;

            const originalMeal = day.meals[mealType];
            const newMeal = regenerateMeal(originalMeal);

            return {
                ...day,
                meals: {
                    ...day.meals,
                    [mealType]: newMeal
                }
            };
        }));
    };

    return (
        <MealContext.Provider value={{ plan, generatePlan, markDayComplete, replaceMeal }}>
            {children}
        </MealContext.Provider>
    );
};

export const useMeal = () => {
    const context = useContext(MealContext);
    if (context === undefined) {
        throw new Error('useMeal must be used within a MealProvider');
    }
    return context;
};
