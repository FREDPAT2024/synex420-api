import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, subtitle, className, children, ...props }: CardProps) => {
  return (
    <div className={cn('card p-6 bg-bg-card', className)} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-bold text-mali-slate leading-tight">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 font-normal mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
