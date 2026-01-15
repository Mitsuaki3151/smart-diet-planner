import React from 'react';

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className, action }) => {
    return (
        <div className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 ${className || ''}`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-900">{title}</h3>
                {action}
            </div>
            {children}
        </div>
    );
};
