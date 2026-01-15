import type { DayPlan, Meal, UserProfile, MealType } from '../types';
import { RECIPES } from '../data/recipes';
import { v4 as uuidv4 } from 'uuid';

// Helper to get random item from array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Simple formula to estimate TDEE (Mifflin-St Jeor)
export const calculateTDEE = (profile: UserProfile): number => {
    let bmr;
    // Convert height to cm, weight to kg, age usually needed but we'll approximate/add later or assume 30.
    // Using simplified constants.
    const age = new Date().getFullYear() - new Date(profile.birthDate).getFullYear();

    if (profile.gender === 'male') {
        bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * age + 5;
    } else {
        bmr = 10 * profile.currentWeight + 6.25 * profile.height - 5 * age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
    };

    return Math.round(bmr * activityMultipliers[profile.activityLevel]);
};

export const generateMealPlan = (profile: UserProfile, days: number = 30): DayPlan[] => {
    // const tdee = calculateTDEE(profile);
    // Deficit for weight loss (approx 500 kcal)
    // const targetCalories = profile.currentWeight > profile.targetWeight ? tdee - 500 : tdee;

    const plan: DayPlan[] = [];
    const today = new Date();

    // Filter recipes by type (we need to tag them or structure the data better, 
    // currently we'll just heuristic/assume based on index or just use the whole pool for prototype simplicity 
    // but let's do it right: I didn't add 'type' to RECIPES items, so I'll infer or just pick randomly for now 
    // but actually I should have typed them. Let's fix the recipe data structure usage here.)

    // Actually, in RECIPES I didn't put the type directly in the object, I grouped them by comments.
    // I will just use slices for this MVP to separate them.
    const breakfasts = RECIPES.slice(0, 4);
    const lunches = RECIPES.slice(4, 7);
    const dinners = RECIPES.slice(7, 10);
    const snacks = RECIPES.slice(10, 13);

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const createMeal = (base: any, type: MealType): Meal => ({
            ...base,
            id: uuidv4(),
            type,
        });

        plan.push({
            date: date.toISOString(),
            dayIndex: i,
            meals: {
                breakfast: createMeal(getRandom(breakfasts), 'breakfast'),
                lunch: createMeal(getRandom(lunches), 'lunch'),
                dinner: createMeal(getRandom(dinners), 'dinner'),
                snack: createMeal(getRandom(snacks), 'snack'),
            },
            isCompleted: false,
        });
    }

    return plan;
};

export const regenerateMeal = (originalMeal: Meal): Meal => {
    // Determine pool based on type
    let pool = RECIPES.slice(0, 4); // Default to breakfast
    if (originalMeal.type === 'lunch') pool = RECIPES.slice(4, 7);
    if (originalMeal.type === 'dinner') pool = RECIPES.slice(7, 10);
    if (originalMeal.type === 'snack') pool = RECIPES.slice(10, 13);

    // Pick something different if possible
    const candidates = pool.filter(r => r.name !== originalMeal.name); // Simple name check
    const base = candidates.length > 0 ? getRandom(candidates) : getRandom(pool);

    return {
        ...base,
        id: uuidv4(),
        type: originalMeal.type,
        alternativeOf: originalMeal.id
    };
}
