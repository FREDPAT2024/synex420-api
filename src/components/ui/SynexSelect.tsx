import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface SynexSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
}

export const SynexSelect = React.forwardRef<HTMLSelectElement, SynexSelectProps>(
  ({ label, required, error, options, className, id, placeholder, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        <label 
          htmlFor={selectId}
          className="text-sm font-medium text-slate-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-12 w-full appearance-none rounded-lg border bg-white px-4 pr-10 text-base ring-offset-white transition-all cursor-pointer",
              "border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
              error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SynexSelect.displayName = "SynexSelect";
