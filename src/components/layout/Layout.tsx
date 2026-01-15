import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart2, Calendar, ShoppingCart } from 'lucide-react';

export const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 pb-20">
            <main className="flex-1 max-w-md mx-auto w-full bg-white min-h-screen shadow-lg relative overflow-y-auto">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <div className="max-w-md mx-auto flex justify-between items-center px-6 py-3">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        <Home size={24} />
                        <span className="text-xs font-medium">ホーム</span>
                    </NavLink>

                    <NavLink
                        to="/weight"
                        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        <BarChart2 size={24} />
                        <span className="text-xs font-medium">グラフ</span>
                    </NavLink>

                    <NavLink
                        to="/plan"
                        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        <Calendar size={24} />
                        <span className="text-xs font-medium">献立</span>
                    </NavLink>

                    <NavLink
                        to="/shop"
                        className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        <ShoppingCart size={24} />
                        <span className="text-xs font-medium">買い物</span>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};
