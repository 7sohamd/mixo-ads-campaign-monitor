import React from 'react';
import { Search, Sun, Bell, PanelLeft, X } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
    isLeftSidebarOpen: boolean;
    isRightPanelOpen: boolean;
    searchQuery: string;
    showNotifications: boolean;
    onToggleLeftSidebar: () => void;
    onToggleRightPanel: () => void;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
    onToggleNotifications: () => void;
    notificationRef: React.RefObject<HTMLDivElement>;
}

export const Header: React.FC<HeaderProps> = ({
    isLeftSidebarOpen,
    isRightPanelOpen,
    searchQuery,
    showNotifications,
    onToggleLeftSidebar,
    onToggleRightPanel,
    onSearchChange,
    onSearchSubmit,
    onToggleNotifications,
    notificationRef
}) => (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-8 shrink-0 z-20">
        <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
            <PanelLeft
                size={18}
                className={`transition-colors duration-200 cursor-pointer ${isLeftSidebarOpen ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                onClick={onToggleLeftSidebar}
            />
            <div className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">
                <span className="hidden sm:inline">Dashboards</span>
                <span className="text-slate-300 hidden sm:inline">/</span>
                <span className="text-slate-900 font-bold">Performance</span>
            </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
            <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                placeholder="Search name or platform..."
                className="hidden sm:block w-40 md:w-64"
            />
            <Sun size={18} className="text-slate-400 cursor-pointer" />
            <div className="relative" ref={notificationRef}>
                <Bell
                    size={18}
                    className={`cursor-pointer transition-colors duration-200 ${showNotifications ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    onClick={onToggleNotifications}
                />
                {showNotifications && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-50 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900">Notifications</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent</span>
                        </div>
                        <div className="py-8 text-center">
                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Bell size={16} className="text-slate-300" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">No new notifications</p>
                        </div>
                    </div>
                )}
            </div>
            <PanelLeft
                size={18}
                className={`cursor-pointer transition-colors duration-200 rotate-180 ${isRightPanelOpen ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                onClick={onToggleRightPanel}
            />
        </div>
    </header>
);
