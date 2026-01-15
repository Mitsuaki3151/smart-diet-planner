import type { DayPlan } from '../types';

interface AggregatedIngredient {
    name: string;
    amount: number;
    unit: string;
    checked: boolean;
}

export const aggregateShoppingList = (plans: DayPlan[]): AggregatedIngredient[] => {
    const ingredientMap = new Map<string, AggregatedIngredient>();

    for (const day of plans) {
        const mealsOfDay = [
            day.meals.breakfast,
            day.meals.lunch,
            day.meals.dinner,
            day.meals.snack
        ];

        for (const meal of mealsOfDay) {
            for (const ing of meal.ingredients) {
                const key = `${ing.name.toLowerCase()}_${ing.unit}`;

                if (ingredientMap.has(key)) {
                    const existing = ingredientMap.get(key)!;
                    existing.amount += ing.amount;
                } else {
                    ingredientMap.set(key, {
                        name: ing.name,
                        amount: ing.amount,
                        unit: ing.unit,
                        checked: false
                    });
                }
            }
        }
    }

    // Sort alphabetically
    return Array.from(ingredientMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};
