import React from 'react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all whitespace-nowrap ${active
            ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </div>
);
