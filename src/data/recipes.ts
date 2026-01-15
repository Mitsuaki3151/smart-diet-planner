import type { Meal, Ingredient } from '../types';

interface Recipe {
    name: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: Ingredient[];
}

export const RECIPES: Recipe[] = [
    // Breakfast
    {
        name: 'オートミールとベリー',
        type: 'breakfast',
        calories: 350,
        protein: 12,
        carbs: 55,
        fat: 10,
        ingredients: [
            { name: 'オートミール', amount: 50, unit: 'g' },
            { name: 'ミックスベリー', amount: 80, unit: 'g' },
            { name: 'アーモンド', amount: 15, unit: 'g' },
            { name: 'はちみつ', amount: 10, unit: 'ml' },
            { name: '牛乳', amount: 150, unit: 'ml' }
        ]
    },
    {
        name: 'アボカドトースト＆卵',
        type: 'breakfast',
        calories: 450,
        protein: 18,
        carbs: 40,
        fat: 25,
        ingredients: [
            { name: '全粒粉パン', amount: 2, unit: '枚' },
            { name: 'アボカド', amount: 1, unit: '個' },
            { name: '卵', amount: 2, unit: '個' },
            { name: 'チェリートマト', amount: 50, unit: 'g' },
            { name: 'オリーブオイル', amount: 5, unit: 'ml' }
        ]
    },
    {
        name: 'ギリシャヨーグルトボウル',
        type: 'breakfast',
        calories: 320,
        protein: 20,
        carbs: 45,
        fat: 8,
        ingredients: [
            { name: 'ギリシャヨーグルト', amount: 200, unit: 'g' },
            { name: 'グラノーラ', amount: 40, unit: 'g' },
            { name: 'バナナ', amount: 1, unit: '本' },
            { name: 'チアシード', amount: 10, unit: 'g' }
        ]
    },
    {
        name: '野菜オムレツ',
        type: 'breakfast',
        calories: 380,
        protein: 22,
        carbs: 15,
        fat: 28,
        ingredients: [
            { name: '卵', amount: 3, unit: '個' },
            { name: 'ほうれん草', amount: 50, unit: 'g' },
            { name: 'パプリカ', amount: 30, unit: 'g' },
            { name: '玉ねぎ', amount: 30, unit: 'g' },
            { name: 'チーズ', amount: 30, unit: 'g' }
        ]
    },
    // Lunch
    {
        name: '黒豆のキヌアボウル',
        type: 'lunch',
        calories: 500,
        protein: 18,
        carbs: 70,
        fat: 15,
        ingredients: [
            { name: 'キヌア', amount: 80, unit: 'g' },
            { name: '黒豆', amount: 100, unit: 'g' },
            { name: 'コーン', amount: 50, unit: 'g' },
            { name: 'アボカド', amount: 0.5, unit: '個' },
            { name: 'ライム', amount: 1, unit: '個' },
            { name: 'コリアンダー', amount: 10, unit: 'g' }
        ]
    },
    {
        name: 'グリルチキンサラダ',
        type: 'lunch',
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 22,
        ingredients: [
            { name: '鶏むね肉', amount: 150, unit: 'g' },
            { name: 'ミックスリーフ', amount: 100, unit: 'g' },
            { name: 'チェリートマト', amount: 80, unit: 'g' },
            { name: 'きゅうり', amount: 50, unit: 'g' },
            { name: 'フェタチーズ', amount: 30, unit: 'g' },
            { name: 'オリーブオイルドレッシング', amount: 20, unit: 'ml' }
        ]
    },
    {
        name: '地中海風ラップサンド',
        type: 'lunch',
        calories: 480,
        protein: 25,
        carbs: 50,
        fat: 18,
        ingredients: [
            { name: '全粒粉トルティーヤ', amount: 1, unit: '枚' },
            { name: 'フムス', amount: 60, unit: 'g' },
            { name: 'グリルチキン', amount: 100, unit: 'g' },
            { name: 'レタス', amount: 30, unit: 'g' },
            { name: 'トマト', amount: 50, unit: 'g' },
            { name: '赤玉ねぎ', amount: 20, unit: 'g' }
        ]
    },
    // Dinner
    {
        name: '鮭のアスパラ添え',
        type: 'dinner',
        calories: 550,
        protein: 40,
        carbs: 30,
        fat: 28,
        ingredients: [
            { name: '鮭フィレ', amount: 180, unit: 'g' },
            { name: 'アスパラガス', amount: 150, unit: 'g' },
            { name: '玄米', amount: 80, unit: 'g' },
            { name: 'レモン', amount: 1, unit: '個' },
            { name: 'ディル', amount: 5, unit: 'g' }
        ]
    },
    {
        name: '豆腐の野菜カレー',
        type: 'dinner',
        calories: 500,
        protein: 20,
        carbs: 60,
        fat: 20,
        ingredients: [
            { name: '木綿豆腐', amount: 200, unit: 'g' },
            { name: 'カリフラワー', amount: 100, unit: 'g' },
            { name: 'ほうれん草', amount: 80, unit: 'g' },
            { name: 'ココナッツミルク', amount: 100, unit: 'ml' },
            { name: 'カレーペースト', amount: 30, unit: 'g' },
            { name: '玄米', amount: 80, unit: 'g' }
        ]
    },
    {
        name: '牛肉のブロッコリー炒め',
        type: 'dinner',
        calories: 520,
        protein: 38,
        carbs: 35,
        fat: 25,
        ingredients: [
            { name: '牛もも肉', amount: 150, unit: 'g' },
            { name: 'ブロッコリー', amount: 150, unit: 'g' },
            { name: '醤油', amount: 20, unit: 'ml' },
            { name: 'にんにく', amount: 2, unit: '片' },
            { name: '生姜', amount: 10, unit: 'g' },
            { name: '玄米', amount: 80, unit: 'g' }
        ]
    },
    // Snacks
    {
        name: 'フムス＆野菜スティック',
        type: 'snack',
        calories: 180,
        protein: 5,
        carbs: 20,
        fat: 10,
        ingredients: [
            { name: 'フムス', amount: 50, unit: 'g' },
            { name: 'にんじん', amount: 50, unit: 'g' },
            { name: 'セロリ', amount: 50, unit: 'g' },
            { name: 'きゅうり', amount: 50, unit: 'g' }
        ]
    },
    {
        name: 'プロテインスムージー',
        type: 'snack',
        calories: 250,
        protein: 25,
        carbs: 30,
        fat: 5,
        ingredients: [
            { name: 'プロテインパウダー', amount: 30, unit: 'g' },
            { name: 'バナナ', amount: 1, unit: '本' },
            { name: 'アーモンドミルク', amount: 250, unit: 'ml' },
            { name: 'ピーナッツバター', amount: 15, unit: 'g' }
        ]
    },
    {
        name: 'ミックスナッツ',
        type: 'snack',
        calories: 200,
        protein: 6,
        carbs: 8,
        fat: 18,
        ingredients: [
            { name: 'アーモンド', amount: 15, unit: 'g' },
            { name: 'くるみ', amount: 15, unit: 'g' },
            { name: 'カシューナッツ', amount: 10, unit: 'g' },
            { name: 'レーズン', amount: 10, unit: 'g' }
        ]
    }
];
