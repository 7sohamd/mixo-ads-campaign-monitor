
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Maximize2 } from 'lucide-react';

interface CampaignChartProps {
  data: any[];
  isLoading: boolean;
  onToggleMaximized?: () => void;
  isMaximized?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-2xl rounded-2xl min-w-[160px]">
        <p className="text-[12px] font-bold text-slate-900 mb-3 border-b border-slate-50 pb-2">
          {entry.name} <span className="text-[10px] text-slate-400 ml-1">({entry.id})</span>
        </p>
        <div className="space-y-2">
          {payload.map((e: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-[11px] font-semibold">
              <span className="text-slate-500 uppercase tracking-tighter">{e.name}:</span>
              <span className={e.name === 'Returns' ? "text-indigo-600 font-bold" : "text-slate-900 font-bold"}>
                {e.name === 'Investment' ? `$${e.value.toLocaleString()}` : e.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const CampaignChart: React.FC<CampaignChartProps> = ({ data, isLoading, onToggleMaximized, isMaximized = false }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-indigo-600 animate-spin" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Aggregating Global Metrics...</span>
        </div>
      </div>
    );
  }

  // Calculate dynamic width for scrollability when maximized on mobile
  // Each bar set + gaps roughly needs 80px on mobile to look good
  const scrollableWidth = isMaximized && isMobile ? Math.max(window.innerWidth, data.length * 80) : '100%';

  return (
    <div className={`h-full flex flex-col w-full ${isMaximized ? 'bg-white p-4 sm:p-10' : ''}`}>
      <div className="flex items-center mb-6 relative px-2">
        {!isMaximized && <div className="min-w-[40px] hidden sm:block"></div>}
        
        <div className="flex-1 flex justify-center items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-900" />
            <span>Investment ($)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
            <span className="text-indigo-600">Returns (Units)</span>
          </div>
        </div>

        {!isMaximized && onToggleMaximized && (
          <div className="min-w-[40px] flex justify-end">
            <button 
              onClick={onToggleMaximized}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
              aria-label="Full Screen"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        )}
      </div>
      
      <div className={`flex-1 w-full ${isMaximized ? 'overflow-x-auto scrollbar-hide' : 'overflow-hidden'}`}>
        <div style={{ width: scrollableWidth, height: '100%', minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }} barGap={isMaximized ? 12 : 10}>
              <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="3 3" />
              <XAxis 
                dataKey="id" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94A3B8', fontSize: isMaximized ? 10 : 9, fontWeight: 700}} 
                dy={15}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94A3B8', fontSize: 9, fontWeight: 700}}
                tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6366F1', fontSize: 9, fontWeight: 800}}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                cursor={{fill: '#F8FAFC', radius: 8}}
                content={<CustomTooltip />}
              />
              
              <Bar 
                yAxisId="left"
                name="Investment" 
                dataKey="spend" 
                radius={[4, 4, 0, 0]} 
                barSize={isMaximized ? 32 : 28}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-spend-${index}`} fill={index % 2 === 0 ? '#1E293B' : '#475569'} fillOpacity={0.8} />
                ))}
              </Bar>
              
              <Bar 
                yAxisId="right"
                name="Returns" 
                dataKey="conversions" 
                fill="#6366F1" 
                radius={[4, 4, 0, 0]} 
                barSize={isMaximized ? 32 : 28}
                fillOpacity={1}
                className="filter drop-shadow-[0_4px_6px_rgba(99,102,241,0.2)]"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isMaximized && isMobile && (
        <div className="flex justify-center mt-2 pb-2">
           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
             Swipe horizontally to explore all campaigns
           </span>
        </div>
      )}
    </div>
  );
};
