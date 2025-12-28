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
                ? 'bg-slate-100 text-slate-900 font-bold shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </div>
);
