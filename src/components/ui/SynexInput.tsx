import React from 'react';
import { cn } from '../../lib/utils';

interface SynexInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const SynexInput = React.forwardRef<HTMLInputElement, SynexInputProps>(
  ({ label, required, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        <label 
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-lg border bg-white px-4 text-base ring-offset-white transition-all",
            "border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]",
            "placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SynexInput.displayName = "SynexInput";
