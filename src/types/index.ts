export type Gender = 'male' | 'female' | 'other';

export interface UserProfile {
    name: string;
    gender: Gender;
    height: number; // in cm
    currentWeight: number; // in kg
    targetWeight: number; // in kg
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
    birthDate: string; // ISO date string
}

export interface WeightEntry {
    id: string;
    date: string; // ISO date string
    weight: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Meal {
    id: string;
    name: string;
    type: MealType;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: Ingredient[];
    alternativeOf?: string; // ID of the meal this replaced
}

export interface DayPlan {
    date: string; // ISO date string (YYYY-MM-DD)
    dayIndex: number; // 0 to 29
    meals: {
        breakfast: Meal;
        lunch: Meal;
        dinner: Meal;
        snack: Meal;
    };
    isCompleted: boolean;
}

export interface AppState {
    hasCompletedOnboarding: boolean;
    profile: UserProfile | null;
    weightHistory: WeightEntry[];
    startDate: string; // ISO date when the plan started
}
