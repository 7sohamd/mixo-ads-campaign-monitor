
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, trend, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 animate-pulse">
        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-8 w-32 bg-slate-200 dark:bg-slate-600 rounded"></div>
      </div>
    );
  }

  const getBgColor = () => {
    if (trend === 'up') return 'bg-emerald-50 dark:bg-emerald-900/20';
    if (trend === 'down') return 'bg-rose-50 dark:bg-rose-900/20';
    return 'bg-slate-50 dark:bg-slate-700';
  };

  const trendColor = trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : trend === 'down' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400';

  return (
    <div className={`p-6 rounded-2xl ${getBgColor()} transition-transform hover:scale-[1.02] cursor-default relative overflow-hidden border border-transparent hover:border-slate-200 dark:hover:border-slate-600`}>
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</span>
        {subValue && (
          <div className={`text-[10px] font-bold flex items-center gap-0.5 ${trendColor} mb-1`}>
            {subValue}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${trend === 'down' ? 'rotate-90' : ''}`}
            >
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};
