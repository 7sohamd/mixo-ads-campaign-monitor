import React from 'react';
import { Campaign, CampaignInsightsResponse, InsightsData } from '../types';
import { MetricCard } from './MetricCard';
import { CampaignDetailChart } from './CampaignDetailChart';
import { PlatformIcon } from './CampaignTable';
import { BarChart3, Calendar, Info, X } from 'lucide-react';

interface CampaignDetailModalProps {
    campaign: Campaign;
    insights: CampaignInsightsResponse['insights'] | null;
    isLoading: boolean;
    metrics: InsightsData | undefined;
    onClose: () => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
    campaign,
    insights,
    isLoading,
    metrics,
    onClose
}) => (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/10 dark:bg-black/80 backdrop-blur-[2px]" onClick={onClose}>
        <div
            className="w-full max-w-xl bg-white dark:bg-[#111111] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-900"
            onClick={e => e.stopPropagation()}
        >
            <div className="p-8 pb-4 flex items-start justify-between">
                <div>
                    <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Detailed Analytics</h4>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{campaign.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-full uppercase tracking-tight">
                            ID: {campaign.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{campaign.status}</span>
                        </div>
                    </div>
                </div>
                <div className="relative group">
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors relative z-10">
                        <X className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                    </button>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 text-[10px] px-2 py-1 rounded font-bold pointer-events-none shadow-lg">
                        esc
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-1">
                            <Calendar size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Created Date</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {new Date(campaign.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-1">
                            <Info size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Platforms</span>
                        </div>
                        <div className="flex gap-3 mt-1">
                            {campaign.platforms.map(p => (
                                <div key={p} className="hover:scale-110 transition-transform">
                                    <PlatformIcon platform={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-6 text-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Synthesizing insights...</p>
                    </div>
                ) : insights ? (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <MetricCard label="Spend" value={`$${insights.spend.toLocaleString()}`} />
                            <MetricCard label="Impressions" value={insights.impressions.toLocaleString()} />
                            <MetricCard label="Clicks" value={insights.clicks.toLocaleString()} />
                            <MetricCard label="Conversions" value={insights.conversions.toLocaleString()} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <BarChart3 size={18} className="text-indigo-500 dark:text-indigo-400" />
                                Performance Audit
                            </h3>
                            {metrics && (
                                <CampaignDetailChart
                                    campaignMetrics={{
                                        ctr: insights.ctr,
                                        cpc: insights.cpc,
                                        conversion_rate: insights.conversion_rate,
                                        conversions: insights.conversions
                                    }}
                                    averages={{
                                        avg_ctr: metrics.avg_ctr,
                                        avg_cpc: metrics.avg_cpc,
                                        avg_conversion_rate: metrics.avg_conversion_rate,
                                        avg_conversions: metrics.total_conversions / (metrics.total_campaigns || 1)
                                    }}
                                />
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    </div>
);
