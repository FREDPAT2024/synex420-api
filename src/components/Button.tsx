import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'mpesa' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'btn-primary',
      secondary: 'bg-slate-200 hover:bg-slate-300 text-mali-slate',
      danger: 'btn-danger',
      mpesa: 'btn-mpesa',
      ghost: 'bg-transparent hover:bg-bg-hover text-mali-slate',
    };
    
    const sizes = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4',
      lg: 'py-3 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
