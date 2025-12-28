import React from 'react';
import { CampaignChart } from './CampaignChart';
import { BarChart3, X } from 'lucide-react';

interface ChartMaximizedModalProps {
    comparisonData: any[];
    isLoading: boolean;
    isDesktop: boolean;
    dragY: number;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onClose: () => void;
}

export const ChartMaximizedModal: React.FC<ChartMaximizedModalProps> = ({
    comparisonData,
    isLoading,
    isDesktop,
    dragY,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onClose
}) => (
    <div
        className="fixed inset-0 z-[110] bg-white animate-in fade-in duration-300 flex flex-col transition-transform ease-out"
        style={{
            transform: !isDesktop ? `translateY(${dragY}px)` : 'none',
            opacity: !isDesktop ? Math.max(0, 1 - dragY / 500) : 1
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
        <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto mt-3 sm:hidden shrink-0" />

        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 shrink-0">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                    <BarChart3 size={20} />
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm sm:text-lg font-bold text-slate-900 truncate">Global Performance Audit</h2>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest truncate">
                        Aggregated ROI Benchmark Analysis (Full 14 Pool)
                    </p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-3 hover:bg-slate-50 rounded-full transition-colors group shrink-0"
                aria-label="Minimize"
            >
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </button>
        </div>
        <div className="flex-1 overflow-hidden">
            <CampaignChart
                data={comparisonData}
                isLoading={isLoading}
                isMaximized
            />
        </div>
    </div>
);
