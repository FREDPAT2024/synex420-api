import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center text-[#3B82F6]">
          <Activity size={32} />
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-8xl font-black text-slate-100 font-mono tracking-tighter">404</h1>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Module Not Found</h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">
          This clinical module does not exist or has not been activated in your Synex420 license.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-bold text-white shadow-sm hover:bg-blue-600 transition-all">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
        </Link>
        <Link to="/search">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <Search size={16} /> Search Patients
          </button>
        </Link>
      </div>
    </div>
  );
}
