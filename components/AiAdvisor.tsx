
import React from 'react';
import { Sparkles, MessageCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Advice {
  title: string;
  advice: string;
}

interface AiAdvisorProps {
  advice: Advice[];
  loading: boolean;
}

const loadingMessages = [
  "Mixo Engine v2 is running...",
  "Creative Auditor analyzing...",
  "Budget Allocator processing...",
  "Evaluating campaign performance...",
  "Generating insights..."
];

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ advice, loading }) => {
  const [loadingMessageIndex, setLoadingMessageIndex] = React.useState(0);
  const [showReady, setShowReady] = React.useState(false);
  const hasShownReady = React.useRef(false);

  React.useEffect(() => {
    if (loading) {
      setShowReady(false);
      hasShownReady.current = false;
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    } else if (advice.length > 0 && !hasShownReady.current) {
      hasShownReady.current = true;
      setShowReady(true);
      const timeout = setTimeout(() => setShowReady(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loading, advice.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-8">
        {/* Notifications Style Section */}
        <section>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            Actionable Insights
            <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-md border border-indigo-200 dark:border-indigo-800">
              AI
            </span>
          </h3>
          <div className="space-y-6">
            {loading ? (
              <div className="relative">
                {/* Background skeleton loaders */}
                <div className="space-y-6 opacity-20">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-full bg-slate-50 dark:bg-slate-600 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Foreground loading text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 animate-in fade-in duration-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 animate-in slide-in-from-bottom-2 duration-300" key={loadingMessageIndex}>
                        {loadingMessages[loadingMessageIndex]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : showReady ? (
              <div className="flex items-center justify-center gap-2 py-8 animate-in zoom-in fade-out duration-300">
                <div className="w-5 h-5 bg-emerald-500 dark:bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">Insights ready!</p>
              </div>
            ) : (
              advice.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${i === 0 ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : i === 1 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    }`}>
                    {i === 0 ? <TrendingUp size={12} /> : i === 1 ? <Sparkles size={12} /> : <AlertCircle size={12} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-1">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.advice}
                    </p>
                    <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1.5 uppercase font-bold tracking-widest">Just now</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
