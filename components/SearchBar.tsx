import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (e: React.FormEvent) => void;
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    onSubmit,
    placeholder = "Search...",
    className = ""
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative group ${className}`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 pointer-events-none transition-colors duration-200"
            />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 shadow-sm focus:shadow-md"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-150 group/clear"
                >
                    <X size={16} className="group-hover/clear:rotate-90 transition-transform duration-200" />
                </button>
            )}
        </form>
    );
};
