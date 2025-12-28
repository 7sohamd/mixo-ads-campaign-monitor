import React from 'react';
import { SidebarItem } from './SidebarItem';
import { LayoutDashboard, Target, FileDown, X, Heart } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onDownloadReport: () => void;
    isGeneratingReport: boolean;
    canGenerateReport: boolean;
    onNavigateOverview: () => void;
    onNavigateCampaigns: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    onDownloadReport,
    isGeneratingReport,
    canGenerateReport,
    onNavigateOverview,
    onNavigateCampaigns
}) => (
    <aside
        className={`bg-white dark:bg-[#111111] border-r border-slate-200 dark:border-slate-900 flex flex-col shrink-0 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 lg:static ${isOpen ? 'w-64 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full lg:w-0 overflow-hidden'
            }`}
    >
        <div className="p-6 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-600">
                    <img src="/mixo.png" alt="Mixo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">Mixo Ads</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <X size={18} />
            </button>
        </div>

        <nav className="flex-1 px-4 space-y-6 overflow-x-hidden">
            <div className="min-w-[224px]">
                <p className="px-4 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Navigation
                </p>
                <div className="space-y-1">
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active onClick={onNavigateOverview} />
                    <SidebarItem icon={<Target size={18} />} label="Active Campaigns" onClick={onNavigateCampaigns} />
                </div>
            </div>

            <div className="min-w-[224px]">
                <p className="px-4 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Reports
                </p>
                <div className="space-y-1 px-2">
                    <button
                        onClick={onDownloadReport}
                        disabled={isGeneratingReport || !canGenerateReport}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 group border border-indigo-100 dark:border-indigo-800 shadow-sm"
                    >
                        <FileDown size={18} className={isGeneratingReport ? 'animate-bounce' : 'group-hover:translate-y-0.5 transition-transform'} />
                        <span className="text-sm whitespace-nowrap">
                            {isGeneratingReport ? 'Building PDF...' : 'AI Strategy Report'}
                        </span>
                    </button>
                </div>
            </div>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Built with</span>
                <Heart size={12} className="text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400" />
                <span>by Soham</span>
            </div>
        </div>
    </aside>
);
