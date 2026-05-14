import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Check, Loader2, Database } from 'lucide-react';
import { cn } from '../../lib/utils';
import { searchICD, initICD, ICDCode } from '../../lib/icd-loader';

interface DiagnosisSelectorProps {
  onSelect: (diagnosis: ICDCode) => void;
}

export const DiagnosisSelector: React.FC<DiagnosisSelectorProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [system, setSystem] = useState<'ICD-10' | 'ICD-11'>('ICD-11');
  const [results, setResults] = useState<ICDCode[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initProgress, setInitProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupDB = async () => {
      setIsInitializing(true);
      try {
        await initICD((progress) => setInitProgress(progress));
      } finally {
        setIsInitializing(false);
      }
    };
    setupDB();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (query.length > 1 && !isInitializing) {
        const found = await searchICD(query, system);
        setResults(found);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [query, system, isInitializing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (diagnosis: ICDCode) => {
    onSelect(diagnosis);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full space-y-4 relative" ref={dropdownRef}>
      {/* INITIALIZATION OVERLAY */}
      {isInitializing && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-[110] flex flex-col items-center justify-center p-8 rounded-xl border border-slate-100 shadow-xl">
           <div className="h-12 w-12 bg-blue-50 text-[#3B82F6] rounded-2xl flex items-center justify-center animate-bounce mb-4 shadow-sm">
             <Database size={24} />
           </div>
           <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Setting up Synex420 Clinical Database...</p>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 italic">This happens once. Loading 69,841 clinical entities.</p>
           
           <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner border border-slate-200">
             <div 
               className="h-full bg-[#3B82F6] transition-all duration-500 rounded-full"
               style={{ width: `${initProgress}%` }}
             ></div>
           </div>
           <p className="mt-2 text-[10px] font-black text-[#3B82F6]">{initProgress}% - Processed</p>
        </div>
      )}

      {/* ICD SYSTEM TOGGLE */}
      <div className="flex items-center gap-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Code System:</label>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
          <button
            type="button"
            onClick={() => setSystem('ICD-10')}
            className={cn(
              "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
              system === 'ICD-10' ? "bg-white text-[#3B82F6] shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            ICD-10
          </button>
          <button
            type="button"
            onClick={() => setSystem('ICD-11')}
            className={cn(
              "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
              system === 'ICD-11' ? "bg-white text-[#3B82F6] shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            ICD-11
          </button>
        </div>
      </div>

      {/* SEARCH INPUT */}
      <div className="relative group">
        <Search className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
          isOpen ? "text-[#3B82F6]" : "text-slate-400"
        )} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Search by ICD-10, ICD-11, or Disease Name..."
          className={cn(
            "w-full h-12 pl-12 pr-4 bg-white border rounded-lg text-base transition-all",
            "border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]",
            "placeholder:text-slate-400 font-medium shadow-sm",
            isOpen && "rounded-b-none border-b-transparent ring-0"
          )}
        />
        
        {/* DROPDOWN RESULTS */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-slate-200 rounded-b-xl shadow-2xl z-[100] max-h-80 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {results.map((res, i) => (
              <button
                key={`${res.code}-${i}`}
                type="button"
                onClick={() => handleSelect(res)}
                className="w-full text-left px-6 py-4 hover:bg-blue-50/50 flex items-center justify-between group/item border-b border-slate-50 last:border-0 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-16 font-mono text-xs font-black text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-center">
                    {res.code}
                  </span>
                  <span className="text-sm font-bold text-slate-700 group-hover/item:text-slate-900">
                    {res.description}
                  </span>
                </div>
                <div className="h-6 w-6 rounded-full bg-blue-50 text-[#3B82F6] opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-opacity">
                  <Check size={14} />
                </div>
              </button>
            ))}
          </div>
        )}

        {isOpen && results.length === 0 && query.length > 1 && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-slate-200 rounded-b-xl shadow-2xl z-[100] px-6 py-8 text-center animate-in slide-in-from-top-2">
            <p className="text-sm font-bold text-slate-400 italic">No matching codes found in {system} database.</p>
          </div>
        )}
      </div>
    </div>
  );
};
