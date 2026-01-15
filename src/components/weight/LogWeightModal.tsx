import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { X } from 'lucide-react';

interface LogWeightModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (weight: number, date: string) => void;
    currentWeight: number;
}

export const LogWeightModal: React.FC<LogWeightModalProps> = ({ isOpen, onClose, onSave, currentWeight }) => {
    const [weight, setWeight] = useState(currentWeight);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(weight, new Date(date).toISOString());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/50 pointer-events-auto backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="bg-white w-full max-w-md p-6 rounded-t-3xl sm:rounded-2xl pointer-events-auto shadow-xl transform transition-transform animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">体重を記録</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="日付"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        label="体重 (kg)"
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="text-2xl font-bold text-center"
                        autoFocus
                    />

                    <Button type="submit" className="w-full">
                        保存
                    </Button>
                </form>
            </div>
        </div>
    );
};
