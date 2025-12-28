
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
      <div className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse">
        <div className="h-4 w-24 bg-slate-100 rounded mb-4"></div>
        <div className="h-8 w-32 bg-slate-200 rounded"></div>
      </div>
    );
  }

  const getBgColor = () => {
    if (trend === 'up') return 'bg-emerald-50';
    if (trend === 'down') return 'bg-rose-50';
    return 'bg-slate-50';
  };

  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-600';

  return (
    <div className={`p-6 rounded-2xl ${getBgColor()} transition-transform hover:scale-[1.02] cursor-default relative overflow-hidden border border-transparent hover:border-slate-200`}>
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
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
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};
