import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, WeightEntry, AppState } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
    state: AppState;
    updateProfile: (profile: UserProfile) => void;
    addWeightEntry: (weight: number, date?: string) => void;
    completeOnboarding: (profile: UserProfile) => void;
    resetData: () => void;
}

const STORAGE_KEY = 'smart_diet_planner_state';

const initialState: AppState = {
    hasCompletedOnboarding: false,
    profile: null,
    weightHistory: [],
    startDate: new Date().toISOString(),
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const updateProfile = (profile: UserProfile) => {
        setState(prev => ({ ...prev, profile }));
    };

    const completeOnboarding = (profile: UserProfile) => {
        // Initial weight entry
        const initialWeightEntry: WeightEntry = {
            id: uuidv4(),
            date: new Date().toISOString(),
            weight: profile.currentWeight,
        };

        setState({
            ...initialState,
            hasCompletedOnboarding: true,
            profile,
            weightHistory: [initialWeightEntry],
            startDate: new Date().toISOString(),
        });
    };

    const addWeightEntry = (weight: number, date: string = new Date().toISOString()) => {
        const newEntry: WeightEntry = {
            id: uuidv4(),
            date,
            weight,
        };

        setState(prev => {
            // Update current weight in profile to the latest entry
            const updatedProfile = prev.profile ? { ...prev.profile, currentWeight: weight } : null;

            return {
                ...prev,
                profile: updatedProfile,
                weightHistory: [...prev.weightHistory, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
            };
        });
    };

    const resetData = () => {
        setState(initialState);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <UserContext.Provider value={{ state, updateProfile, addWeightEntry, completeOnboarding, resetData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
