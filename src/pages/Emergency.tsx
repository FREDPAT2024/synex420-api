import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Zap, 
  Activity, 
  Clock, 
  AlertTriangle, 
  Plus, 
  LayoutDashboard,
  Timer,
  Users,
  AlertCircle,
  Siren,
  Hospital,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Emergency() {
  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Emergency Department" 
        subtitle="ESI Triage, live tracking board, and disaster response management."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all animate-pulse">
              <Siren className="mr-2 h-4 w-4" /> Trauma Team Activation
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-black transition-all">
              <Plus className="mr-2 h-4 w-4" /> Quick Patient Triage
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Wait Time (Avg)" value="22m" sub="Target: <15m" icon={Timer} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="ESI 1 (Critical)" value="2" sub="Immediate care active" icon={AlertCircle} color="text-red-600" bgColor="bg-red-50" />
        <StatItem label="ED Occupancy" value="18/20" sub="Beds available: 2" icon={Hospital} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Fast Track" value="6" sub="Minor injuries" icon={Activity} color="text-emerald-600" bgColor="bg-emerald-50" />
      </StatsBar>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-[#0F172A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <LayoutDashboard className="text-[#3B82F6]" size={20} />
                 <h3 className="text-lg font-black uppercase tracking-tight">Live Tracking Board</h3>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acuity Map:</span>
                 <div className="flex gap-1">
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                    <div className="w-4 h-4 rounded bg-emerald-500"></div>
                    <div className="w-4 h-4 rounded bg-slate-500"></div>
                 </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1E293B] border-b border-slate-700">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Bed</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">ESI</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Data</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Chief Complaint</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Time In</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-[#0F172A]">
                  {[
                    { bed: "ER-01", esi: 1, patient: "Peter Njoroge", complaint: "Cardiac Arrest / CPR", time: "08:12", status: "Critical Care", color: "bg-red-500" },
                    { bed: "ER-05", esi: 2, patient: "Sarah Wambui", complaint: "Severe Respiratory Distress", time: "08:34", status: "Intubated", color: "bg-orange-500" },
                    { bed: "ER-03", esi: 3, patient: "John Musembi", complaint: "Abdominal Pain (Suspected Appy)", time: "08:45", status: "Labs/Imaging", color: "bg-yellow-500" },
                    { bed: "FT-02", esi: 4, patient: "Grace Otieno", complaint: "Laceration (Wrist)", time: "09:12", status: "Waiting for Sutures", color: "bg-emerald-500" },
                    { bed: "FT-05", esi: 5, patient: "David Mwangi", case: "Cough / Medication Refill", time: "09:44", status: "Fast Track", color: "bg-slate-500" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-800 transition-all cursor-pointer border-b border-slate-800">
                      <td className="px-8 py-6 text-sm font-black text-[#3B82F6] font-mono">{row.bed}</td>
                      <td className="px-8 py-6">
                         <div className={cn("w-6 h-6 rounded flex items-center justify-center text-[10px] font-black text-white", row.color)}>
                           {row.esi}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-200">{row.patient}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-400">{row.complaint}</td>
                      <td className="px-8 py-6 text-xs font-mono font-bold text-slate-500">{row.time}</td>
                      <td className="px-8 py-6">
                         <span className="text-[9px] font-black text-white uppercase tracking-widest px-2 py-0.5 border border-slate-700 rounded bg-slate-800/50">
                            {row.status}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <ChevronRight className="text-slate-600 group-hover:text-white transition-all ml-auto" size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WorkspacePanel>
        </div>

        <div className="space-y-8">
           <WorkspacePanel className="p-8 space-y-6 bg-red-50/30 border-red-100">
              <h3 className="text-lg font-black text-red-600 uppercase tracking-tight border-b border-red-100 pb-4 flex items-center justify-between">
                Mass Casualty
                <AlertTriangle size={18} className="text-red-500" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold italic">Standard Operating Procedure (SOP) for Disaster Mode Activation is locked under Admin privileges.</p>
              <button className="w-full h-12 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20">Initialize Code Black</button>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4 flex items-center justify-between">
                RRT Alerts
                <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                 <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">RRT Activated: Ward 4C</p>
                    <p className="text-sm font-bold text-slate-900">Patient: Sarah W.</p>
                    <p className="text-[10px] text-slate-500 mt-1">GCS Drop: 14 &rarr; 9</p>
                 </div>
              </div>
           </WorkspacePanel>
        </div>
      </div>
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
