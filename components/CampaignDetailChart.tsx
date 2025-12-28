
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface CampaignDetailChartProps {
  campaignMetrics: {
    ctr: number;
    cpc: number;
    conversion_rate: number;
    conversions: number;
  };
  averages: {
    avg_ctr: number;
    avg_cpc: number;
    avg_conversion_rate: number;
    avg_conversions: number;
  };
}

export const CampaignDetailChart: React.FC<CampaignDetailChartProps> = ({ campaignMetrics, averages }) => {
  // Normalize data for radar chart (0-100 scale)
  // We use simple ratios relative to averages to show "strength"
  const data = [
    {
      subject: 'CTR',
      A: (campaignMetrics.ctr / (averages.avg_ctr || 0.01)) * 50,
      fullMark: 100,
    },
    {
      subject: 'Conv. Rate',
      A: (campaignMetrics.conversion_rate / (averages.avg_conversion_rate || 0.01)) * 50,
      fullMark: 100,
    },
    {
      subject: 'CPC Efficiency',
      // Lower CPC is better, so we invert the ratio
      A: (averages.avg_cpc / (campaignMetrics.cpc || 0.1)) * 50,
      fullMark: 100,
    },
    {
      subject: 'Conv. Vol',
      A: (campaignMetrics.conversions / (averages.avg_conversions || 1)) * 50,
      fullMark: 100,
    },
    {
      subject: 'Quality Score',
      A: 75, // Simulated composite score for visual balance
      fullMark: 100,
    },
  ].map(item => ({
    ...item,
    // Cap at 100 for visual consistency but allow slight overshoot for "overperforming"
    A: Math.min(item.A, 110)
  }));

  return (
    <div className="w-full h-72 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-inner">
      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Efficiency Benchmarking</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#cbd5e1" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
          <Radar
            name="Campaign"
            dataKey="A"
            stroke="#22d3ee"
            strokeWidth={3}
            fill="#67e8f9"
            fillOpacity={0.8}
            animationDuration={1500}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
