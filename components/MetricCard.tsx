import React from 'react';

interface MetricCardProps {
    label: string;
    value: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => (
    <div className="p-5 bg-slate-50 dark:bg-slate-700 rounded-2xl border border-slate-100 dark:border-slate-600">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            {label}
        </span>
        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
    </div>
);
