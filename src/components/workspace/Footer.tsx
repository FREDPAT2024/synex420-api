import React from 'react';

export function Footer() {
  return (
    <footer className="flex h-10 items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] px-8 text-xs text-slate-500 shrink-0">
      <span>
        Kiama Medical Center | Synex420 HIMS v1.0
      </span>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>System Online</span>
      </div>

      <span>support@synex420.co.ke</span>
    </footer>
  );
}
