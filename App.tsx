import React from 'react';
import { InsightsData } from './types';
import { useDashboardData } from './hooks/useDashboardData';
import { useCampaignDetails } from './hooks/useCampaignDetails';
import { useWindowWidth } from './hooks/useWindowWidth';
import { useTheme } from './hooks/useTheme';
import { generatePdfReport } from './utils/reportGenerator';
import { exportCampaignsCsv } from './utils/csvExporter';
import { StatCard } from './components/StatCard';
import { CampaignTable } from './components/CampaignTable';
import { CampaignChart } from './components/CampaignChart';
import { AiAdvisor } from './components/AiAdvisor';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChartMaximizedModal } from './components/ChartMaximizedModal';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { Wallet, AlertCircle, X, TrendingUp, BarChart3, Target } from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const {
    campaigns,
    insightsResponse,
    comparisonData,
    isLoading,
    error,
    aiAdvice,
    isAiLoading,
    fetchData
  } = useDashboardData();

  const {
    selectedCampaign,
    selectedInsights,
    isDetailLoading,
    handleSelectCampaign,
    closeDetails
  } = useCampaignDetails();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [isChartMaximized, setIsChartMaximized] = React.useState(false);
  const [dragY, setDragY] = React.useState(0);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = React.useState(window.innerWidth >= 1024);
  const [isRightPanelOpen, setIsRightPanelOpen] = React.useState(window.innerWidth >= 1024);

  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 1024;

  const touchStartY = React.useRef(0);
  const inventoryRef = React.useRef<HTMLDivElement>(null);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  const metrics: InsightsData | undefined = insightsResponse?.insights;
  const globalCpa = metrics && metrics.total_conversions > 0
    ? metrics.total_spend / metrics.total_conversions
    : 0;

  const chartDisplayLimit = isDesktop ? 10 : 3;
  const filteredComparisonData = comparisonData.slice(0, chartDisplayLimit);

  const handleDownloadAiReport = React.useCallback(async () => {
    if (!insightsResponse || campaigns.length === 0) return;
    setIsGeneratingReport(true);
    try {
      await generatePdfReport(campaigns, insightsResponse, comparisonData);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsGeneratingReport(false);
    }
  }, [campaigns, insightsResponse, comparisonData]);

  const scrollToInventory = React.useCallback(() => {
    inventoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleHeaderSearchSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    scrollToInventory();
  }, [scrollToInventory]);

  const handleExportCsv = React.useCallback(() => {
    exportCampaignsCsv(campaigns);
  }, [campaigns]);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (!isDesktop) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, [isDesktop]);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!isDesktop) {
      const currentY = e.touches[0].clientY;
      const delta = currentY - touchStartY.current;
      if (delta > 0) {
        setDragY(delta);
      }
    }
  }, [isDesktop]);

  const handleTouchEnd = React.useCallback(() => {
    if (!isDesktop) {
      if (dragY > 150) {
        setIsChartMaximized(false);
      }
      setDragY(0);
    }
  }, [isDesktop, dragY]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetails();
        setIsChartMaximized(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDetails]);

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0a0a] flex overflow-hidden">
      {(isLeftSidebarOpen || (isRightPanelOpen && windowWidth < 1024)) && (
        <div
          className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            if (windowWidth < 1024) setIsRightPanelOpen(false);
          }}
        />
      )}

      <Sidebar
        isOpen={isLeftSidebarOpen}
        onClose={() => setIsLeftSidebarOpen(false)}
        onDownloadReport={handleDownloadAiReport}
        isGeneratingReport={isGeneratingReport}
        canGenerateReport={!!insightsResponse}
        onNavigateOverview={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateCampaigns={scrollToInventory}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          isLeftSidebarOpen={isLeftSidebarOpen}
          isRightPanelOpen={isRightPanelOpen}
          searchQuery={searchQuery}
          showNotifications={showNotifications}
          onToggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleHeaderSearchSubmit}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          notificationRef={notificationRef}
        />

        <div className="flex-1 flex overflow-hidden w-full relative">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 min-w-0 scrollbar-hide">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Campaign Overview</h1>
            </div>

            {error && (
              <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-4 rounded-xl flex items-center gap-3 text-rose-700 dark:text-rose-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
                <button onClick={fetchData} className="ml-auto text-xs font-bold uppercase tracking-wider hover:underline">Retry</button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Spend" value={metrics ? `$${(metrics.total_spend || 0).toLocaleString()}` : '$0'} subValue="+11.01%" trend="up" icon={<Wallet size={18} />} loading={isLoading} />
              <StatCard label="Impressions" value={metrics ? (metrics.total_impressions || 0).toLocaleString() : '0'} subValue="-0.03%" trend="down" icon={<TrendingUp size={18} />} loading={isLoading} />
              <StatCard label="Avg. CPC" value={metrics ? `$${(metrics.avg_cpc || 0).toFixed(2)}` : '$0.00'} subValue="+15.03%" trend="up" icon={<BarChart3 size={18} />} loading={isLoading} />
              <StatCard label="Avg. CPA" value={globalCpa ? `$${globalCpa.toFixed(2)}` : '$0.00'} subValue="+6.08%" trend="up" icon={<Target size={18} />} loading={isLoading} />
            </div>

            <section className="space-y-4">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Performance Analysis</h2>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium italic">
                  Top {chartDisplayLimit} High-Efficiency ROI Campaigns
                </p>
              </div>
              <div className="bg-white dark:bg-[#141414] p-6 rounded-2xl border border-slate-200 dark:border-slate-900 shadow-sm overflow-hidden h-[500px]">
                <CampaignChart
                  data={filteredComparisonData}
                  isLoading={isLoading}
                  onToggleMaximized={() => setIsChartMaximized(true)}
                  onBarClick={handleSelectCampaign}
                  campaigns={campaigns}
                />
              </div>
            </section>

            <section className="space-y-4" ref={inventoryRef}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Campaign Inventory</h2>
              </div>
              <CampaignTable
                campaigns={campaigns}
                onSelect={handleSelectCampaign}
                onExport={handleExportCsv}
                isLoading={isLoading}
                externalSearch={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </section>
          </div>

          <aside
            className={`bg-white dark:bg-[#111111] border-l border-slate-200 dark:border-slate-900 overflow-y-auto transition-all duration-300 ease-in-out shrink-0 overflow-x-hidden fixed lg:static right-0 inset-y-0 z-50 lg:z-auto ${isRightPanelOpen ? 'w-[320px] sm:w-[360px] p-6 opacity-100 translate-x-0' : 'w-0 p-0 opacity-0 translate-x-full lg:translate-x-0 overflow-hidden'
              }`}
          >
            <div className="w-full flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Optimization Tools</h3>
                <button onClick={() => setIsRightPanelOpen(false)} className="p-2 text-slate-400 dark:text-slate-500">
                  <X size={18} />
                </button>
              </div>
              <div className="w-full">
                <AiAdvisor advice={aiAdvice} loading={isAiLoading} />
              </div>
            </div>
          </aside>
        </div>

        {isChartMaximized && (
          <ChartMaximizedModal
            comparisonData={comparisonData}
            isLoading={isLoading}
            isDesktop={isDesktop}
            dragY={dragY}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClose={() => setIsChartMaximized(false)}
            onBarClick={handleSelectCampaign}
            campaigns={campaigns}
          />
        )}

        {selectedCampaign && (
          <CampaignDetailModal
            campaign={selectedCampaign}
            insights={selectedInsights}
            isLoading={isDetailLoading}
            metrics={metrics}
            onClose={closeDetails}
          />
        )}
      </div>
    </div>
  );
}
