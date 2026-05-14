import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Bed, 
  Users, 
  ArrowRightLeft, 
  LogOut, 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  AlertCircle,
  Activity,
  UserPlus
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Inpatient() {
  const [activeWard, setActiveWard] = useState('General Ward A');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Inpatient & Bed Management" 
        subtitle="Real-time bed census, ADT tracking, and ward occupancy monitoring."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <ArrowRightLeft className="mr-2 h-4 w-4 text-slate-400" /> Ward Transfer
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <UserPlus className="mr-2 h-4 w-4" /> New Admission
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Total Occupancy" value="84%" sub="142/170 Beds" icon={Bed} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Pending Discharges" value="12" sub="Awaiting clearance" icon={LogOut} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Isolation Beds" value="4" sub="2 Available" icon={AlertCircle} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Avg. Stay (ALOS)" value="4.2" sub="Days per patient" icon={Activity} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {['General Ward A', 'General Ward B', 'ICU / Critical Care', 'Maternity Wing', 'Pediatrics'].map((ward) => (
          <button
            key={ward}
            onClick={() => setActiveWard(ward)}
            className={cn(
              "px-6 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm",
              activeWard === ward ? "bg-[#3B82F6] text-white border-[#3B82F6]" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
            )}
          >
            {ward}
          </button>
        ))}
      </div>

      <WorkspacePanel>
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{activeWard} Census</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-[#3B82F6] text-[9px] font-black rounded uppercase tracking-widest">32 active patients</span>
           </div>
           <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Find bed or patient..." className="h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6] text-sm" />
              </div>
              <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <Filter size={14} /> View Layout
              </button>
           </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { bed: "101-A", patient: "John Muthoni", status: "Occupied", type: "General" },
            { bed: "101-B", patient: "Empty", status: "Cleaning", type: "General" },
            { bed: "102-A", patient: "Sarah Wanjiku", status: "Occupied", type: "Isolation" },
            { bed: "102-B", patient: "Empty", status: "Available", type: "General" },
            { bed: "103-C", patient: "Fred Mutua", status: "Occupied", type: "Telemetry" },
            { bed: "104-D", patient: "Alice Otieno", status: "Occupied", type: "General" },
            { bed: "105-A", patient: "Empty", status: "Maintenance", type: "Specialized" },
            { bed: "106-B", patient: "Peter Njoroge", status: "Occupied", type: "General" },
          ].map((item, i) => (
            <div key={i} className={cn(
              "p-5 rounded-2xl border transition-all group relative overflow-hidden",
              item.status === 'Occupied' ? "bg-white border-slate-200 shadow-sm" : 
              item.status === 'Available' ? "bg-emerald-50/30 border-emerald-100 border-dashed" :
              "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{item.bed}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
              </div>
              
              <div className="space-y-4">
                {item.status === 'Occupied' ? (
                  <>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.patient}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Adm: 12 May 2026</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">Stable Condition</span>
                    </div>
                  </>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      item.status === 'Available' ? "text-emerald-500" : "text-slate-400"
                    )}>{item.status}</p>
                    <button className="mt-4 text-[9px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Select Patient</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </WorkspacePanel>
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
