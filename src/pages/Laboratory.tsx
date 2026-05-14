import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { SynexInput } from '../components/ui/SynexInput';
import { SynexSelect } from '../components/ui/SynexSelect';
import { 
  Beaker, 
  Search, 
  FlaskConical, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Plus,
  Filter,
  ArrowUpRight,
  ClipboardList,
  History,
  Barcode
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Laboratory() {
  const [activeTab, setActiveTab] = useState<'worklist' | 'catalog' | 'inventory'>('worklist');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Laboratory Information System (LIS)" 
        subtitle="Specimen tracking, results validation, and diagnostic analytics."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Barcode className="mr-2 h-4 w-4" /> Lab Labels
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Test Order
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Pending Samples" value="18" sub="4 Critical" icon={FlaskConical} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Processed Today" value="142" sub="+12% vs yesterday" icon={CheckCircle2} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Avg. Turnaround" value="45m" sub="Across all tests" icon={Clock} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="QC Compliance" value="100%" sub="All controls passed" icon={ShieldCheck} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'worklist'} onClick={() => setActiveTab('worklist')} label="Active Worklist" icon={ClipboardList} />
        <TabButton active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} label="Test Catalog" icon={Activity} />
        <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Reagents & Supply" icon={Beaker} />
      </div>

      {activeTab === 'worklist' && (
        <div className="space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="relative flex-1 max-w-md">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                   <input type="text" placeholder="Search speciment ID, patient name..." className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#3B82F6] shadow-sm font-medium" />
                </div>
                <button className="h-12 px-6 border border-slate-200 bg-white rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3">
                  <Filter size={18} /> Filter List
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">Order ID</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Data</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Requested Test</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Specimen Status</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Time Elasped</th>
                    <th className="px-8 py-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { id: "LAB-9921", patient: "Jane W. Kamau", test: "Full Hemogram (CBC)", status: "In Analysis", time: "14 min", priority: "Routine" },
                    { id: "LAB-9922", patient: "Fredrick Mutua", test: "Liver Function Tests", status: "Sample Collected", time: "22 min", priority: "Urgent" },
                    { id: "LAB-9923", patient: "Sarah Wambui", test: "HBA1C Monitoring", status: "Awaiting Sample", time: "4 min", priority: "Routine" },
                    { id: "LAB-9924", patient: "John Musembi", test: "Troponin I (Cardiac)", status: "Processing", time: "2 min", priority: "STAT" }
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-black text-[#3B82F6]">{row.id}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                            {row.patient.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{row.patient}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.test}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          row.status === 'Processing' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-xs font-mono font-bold text-slate-400">{row.time}</td>
                      <td className="px-8 py-5 text-right">
                         <button className="h-9 px-4 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#3B82F6] hover:bg-blue-50 transition-all">
                           Enter Results
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WorkspacePanel>
        </div>
      )}
    </div>
  );
}

const StatItem = ({ label, value, sub, icon: Icon, color, bgColor }: any) => (
  <div className="flex h-[110px] items-center justify-between rounded-2xl border border-slate-200 bg-white px-8 shadow-sm group hover:border-[#3B82F6] transition-all">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className={cn("mt-1 text-2xl font-black font-mono tracking-tight", color)}>{value}</h3>
      <p className="text-[9px] font-bold text-slate-400 mt-0.5">{sub}</p>
    </div>
    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", bgColor, color)}>
      <Icon className="h-6 w-6" />
    </div>
  </div>
);

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative border-b-2",
      active 
        ? "text-[#3B82F6] border-[#3B82F6] bg-blue-50/30" 
        : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"
    )}
  >
    <Icon size={16} />
    {label}
  </button>
);

const ShieldCheck = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);
