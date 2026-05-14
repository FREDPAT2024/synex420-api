import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Scissors, 
  Clock, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  History,
  Activity,
  Box,
  ClipboardCheck,
  Stethoscope
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Surgery() {
  const [activeWard, setActiveWard] = useState('OR Worklist');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Surgery & Operation Theater" 
        subtitle="Surgical scheduling, OR resource management, and intra-operative documentation."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700">
              <ClipboardCheck className="mr-2 h-4 w-4" /> Instrument Count
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Schedule Surgery
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Procedures" value="4" sub="OR 1, 2, 4, 6" icon={Activity} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Scheduled Today" value="18" sub="1 STAT / 4 Ortho" icon={Calendar} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="OR Utilization" value="92%" sub="Target: 85%" icon={Clock} color="text-slate-700" bgColor="bg-slate-100" />
        <StatItem label="Post-Op Recovery" value="6" sub="Beds occupied" icon={Stethoscope} color="text-orange-600" bgColor="bg-orange-50" />
      </StatsBar>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Scissors className="text-[#3B82F6]" size={20} />
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Operation Theater Worklist</h3>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">OR #</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient / Case</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Surgeon</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { time: "08:30", or: "OR 1", patient: "James Odhiambo", case: "Appendectomy", surgeon: "Dr. L. Mutua", status: "In Progress" },
                    { time: "09:45", or: "OR 4", patient: "Mary Mumbua", case: "C-Section", surgeon: "Dr. S. Kalu", status: "Preparation" },
                    { time: "11:00", or: "OR 2", patient: "David Mwangi", case: "Total Hip Replacement", surgeon: "Dr. P. Njuguna", status: "Scheduled" },
                    { time: "14:15", or: "OR 6", patient: "Alice Wanjiru", case: "Laparoscopic Cholecystectomy", surgeon: "Dr. M. Kamau", status: "Scheduled" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-5 text-sm font-black text-slate-700">{row.time}</td>
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-black text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{row.or}</span>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-900">{row.patient}</span>
                           <span className="text-[10px] text-slate-500 font-medium italic">{row.case}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-500">{row.surgeon}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className={cn(
                             "h-1.5 w-1.5 rounded-full animate-pulse",
                             row.status === 'In Progress' ? "bg-[#3B82F6]" : 
                             row.status === 'Preparation' ? "bg-orange-500" : "bg-slate-300"
                           )}></div>
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{row.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <button className="h-9 px-4 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#3B82F6] hover:bg-blue-50">
                           Open Intra-Op
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WorkspacePanel>
        </div>

        <div className="space-y-8">
          <WorkspacePanel className="p-8 space-y-6">
             <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4 flex items-center justify-between">
               Sterile Supply
               <Box size={18} className="text-[#3B82F6]" />
             </h3>
             <div className="space-y-4">
                <SupplyItem label="Basic Laps Set" count={12} status="Ready" />
                <SupplyItem label="Major Ortho Set" count={4} status="Sterilizing" color="text-orange-500" />
                <SupplyItem label="Vascular Tray" count={2} status="Out of Stock" color="text-red-500" />
                <SupplyItem label="Suture Packs (Ethicon)" count={84} status="In Stock" />
             </div>
          </WorkspacePanel>

          <WorkspacePanel className="p-8 space-y-6 bg-[#0F172A] border-none text-white overflow-hidden relative">
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <Clock className="text-[#3B82F6]" />
                   <h3 className="text-lg font-black uppercase tracking-tight">OR Turnaround</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cleaning</p>
                      <p className="text-xl font-black text-white mt-1">18m</p>
                   </div>
                   <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Setup</p>
                      <p className="text-xl font-black text-white mt-1">12m</p>
                   </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16"></div>
          </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const SupplyItem = ({ label, count, status, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
     <div>
       <p className="text-xs font-black text-slate-900">{label}</p>
       <p className={cn("text-[9px] font-bold uppercase tracking-widest mt-0.5", color || "text-emerald-500")}>{status}</p>
     </div>
     <span className="text-xs font-black text-slate-400">x{count}</span>
  </div>
);

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
