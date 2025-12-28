
import React from 'react';
import { Campaign, CampaignStatus } from '../types';
import { Search, ChevronRight, ArrowUpDown, Download, X, ChevronDown, Check, LayoutGrid, PlayCircle, PauseCircle, CheckCircle2 } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface CampaignTableProps {
  campaigns: Campaign[];
  onSelect: (campaign: Campaign) => void;
  onExport: () => void;
  isLoading: boolean;
  externalSearch?: string;
  onSearchChange?: (val: string) => void;
}

type SortKey = 'name' | 'status' | 'budget' | 'platforms' | 'created_at';
type SortOrder = 'asc' | 'desc' | 'none';

export const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const p = platform.toLowerCase();

  // Use meta.png for meta-tagged platforms
  if (p.includes('meta')) {
    return (
      <img src="/meta.png" alt="Meta" className="w-5 h-5" />
    );
  }

  // Use Facebook SVG only when platform is explicitly "facebook"
  if (p === 'facebook') {
    return (
      <svg className="w-5 h-5 text-[#0668E1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  }
  if (p.includes('google')) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    );
  }
  if (p.includes('linkedin')) {
    return (
      <svg className="w-5 h-5 text-[#0077B5]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (p.includes('tiktok')) {
    return (
      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.72.51-1.1 1.4-1.04 2.27.02 1.1.92 2.1 2.02 2.16 1.07.12 2.22-.5 2.65-1.48.16-.36.2-.74.21-1.13.01-4.48 0-8.96.01-13.44z" />
      </svg>
    );
  }
  return <span className="text-[10px] font-bold text-slate-400 uppercase">{platform}</span>;
}

const StatusFilterDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const options = [
    { value: 'all', label: 'All Campaigns', icon: <LayoutGrid size={16} className="text-slate-600" /> },
    { value: 'active', label: 'Active', icon: <PlayCircle size={16} className="text-emerald-600" /> },
    { value: 'paused', label: 'Paused', icon: <PauseCircle size={16} className="text-amber-500" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 size={16} className="text-slate-500" /> }
  ];

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 min-w-[180px] shadow-sm hover:shadow-md"
      >
        <span className="flex items-center gap-2">
          {selectedOption.icon}
          <span className="font-semibold">{selectedOption.label}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-indigo-600 dark:text-indigo-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1.5">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${value === option.value
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
              >
                <span className="flex items-center gap-3">
                  {option.icon}
                  <span className="font-semibold">{option.label}</span>
                </span>
                {value === option.value && (
                  <Check size={16} className="text-indigo-600 dark:text-indigo-400 font-bold" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onSelect, onExport, isLoading, externalSearch, onSearchChange }) => {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; order: SortOrder }>({ key: 'status', order: 'asc' });

  const effectiveSearch = externalSearch ?? "";

  const handleSort = (key: SortKey) => {
    let order: SortOrder = 'desc';
    if (sortConfig.key === key) {
      if (sortConfig.order === 'desc') order = 'asc';
      else if (sortConfig.order === 'asc') order = 'none';
    }
    setSortConfig({ key, order });
  };

  const getSortIconColor = (key: SortKey) => sortConfig.key === key && sortConfig.order !== 'none' ? 'text-indigo-600' : 'text-slate-300';

  const statusWeight = (s: CampaignStatus) => {
    switch (s) {
      case 'active': return 0;
      case 'paused': return 1;
      case 'draft': return 2;
      case 'completed': return 3;
      default: return 4;
    }
  }

  const filtered = React.useMemo(() => {
    let result = campaigns.filter(c => {
      const s = effectiveSearch.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(s) || c.platforms.some(p => p.toLowerCase().includes(s));
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.order !== 'none') {
      result.sort((a, b) => {
        let valA: any, valB: any;
        switch (sortConfig.key) {
          case 'name': valA = a.name; valB = b.name; break;
          case 'status': valA = statusWeight(a.status); valB = statusWeight(b.status); break;
          case 'budget': valA = a.budget; valB = b.budget; break;
          case 'platforms': valA = a.platforms.length; valB = b.platforms.length; break;
          case 'created_at': valA = new Date(a.created_at).getTime(); valB = new Date(b.created_at).getTime(); break;
        }

        if (typeof valA === 'string') {
          return sortConfig.order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortConfig.order === 'asc' ? valA - valB : valB - valA;
      });
    }
    return result;
  }, [campaigns, effectiveSearch, statusFilter, sortConfig]);

  const getStatusDot = (status: CampaignStatus) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'paused': return 'bg-amber-400';
      case 'completed': return 'bg-slate-300';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-slate-900 shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#141414] border-b border-slate-50 dark:border-slate-900">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <SearchBar
            value={effectiveSearch}
            onChange={(val) => onSearchChange?.(val)}
            placeholder="Search campaigns, platforms..."
            className="w-full md:w-80"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onExport}
            disabled={campaigns.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800 transition-all uppercase tracking-widest disabled:opacity-50 h-9"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <StatusFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white dark:bg-[#141414] border-b border-slate-100 dark:border-slate-900">
            <tr>
              <th className="px-6 py-3">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Name <ArrowUpDown size={10} className={getSortIconColor('name')} />
                </button>
              </th>
              <th className="px-6 py-3">
                <button onClick={() => handleSort('status')} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Status <ArrowUpDown size={10} className={getSortIconColor('status')} />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button onClick={() => handleSort('budget')} className="flex items-center gap-1.5 ml-auto text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Budget <ArrowUpDown size={10} className={getSortIconColor('budget')} />
                </button>
              </th>
              <th className="px-6 py-3">
                <button onClick={() => handleSort('platforms')} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Platforms <ArrowUpDown size={10} className={getSortIconColor('platforms')} />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button onClick={() => handleSort('created_at')} className="flex items-center gap-1.5 ml-auto text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Date <ArrowUpDown size={10} className={getSortIconColor('created_at')} />
                </button>
              </th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-6 py-5 h-12 bg-slate-50/10 dark:bg-slate-700/10"></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400 dark:text-slate-500 text-sm italic">No campaigns found</td>
              </tr>
            ) : (
              filtered.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
                  onClick={() => onSelect(campaign)}
                >
                  <td className="px-6 py-5">
                    <div className="text-[13px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(campaign.status)}`} />
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                        {campaign.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-slate-100 text-[13px]">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-4 items-center">
                      {campaign.platforms.map(p => (
                        <div key={p} className="flex items-center justify-center transition-transform hover:scale-110" title={p}>
                          <PlatformIcon platform={p} />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <ChevronRight size={14} className="text-slate-200 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-slate-300" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
