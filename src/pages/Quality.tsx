import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Filter,
  FileSearch,
  BookOpen,
  ClipboardCheck,
  Activity,
  UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Quality() {
  const [activeTab, setActiveTab] = useState<'incidents' | 'audits' | 'policies'>('incidents');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Quality & Compliance" 
        subtitle="Incident reporting, clinical audits, and regulatory compliance tracking."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <BookOpen className="mr-2 h-4 w-4 text-slate-400" /> Policy Library
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all">
              <Plus className="mr-2 h-4 w-4" /> Log Incident (RCA)
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Open Incidents" value="6" sub="2 Critical / 4 Routine" icon={AlertCircle} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Audit Compliance" value="94.2%" sub="Target: 95%" icon={ClipboardCheck} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Active Policies" value="142" sub="8 Due for review" icon={FileText} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Accreditation" value="JCI / MoH" sub="Valid through 2027" icon={ShieldCheck} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'incidents'} onClick={() => setActiveTab('incidents')} label="Incident Management" icon={AlertCircle} />
        <TabButton active={activeTab === 'audits'} onClick={() => setActiveTab('audits')} label="Clinical Audits" icon={FileSearch} />
        <TabButton active={activeTab === 'policies'} onClick={() => setActiveTab('policies')} label="Policy & SOPs" icon={BookOpen} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
           <WorkspacePanel>
              <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Quality Incidents</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-2 w-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
                    Monitoring Active
                 </span>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                       <tr>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">ID</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Severity</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Owner</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                          <th className="px-8 py-4 text-right"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium bg-white">
                       {[
                         { id: "INC-2024-001", cat: "Medication Error", sev: "Moderate", owner: "Sr. Alice O.", status: "In Investigation" },
                         { id: "INC-2024-002", cat: "Patient Fall", sev: "Minor", owner: "Dr. L. Mutua", status: "Closed (CAPA)" },
                         { id: "INC-2024-003", cat: "Diagnostic Delay", sev: "Critical", owner: "James K.", status: "RCA Required" },
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                            <td className="px-8 py-5 text-sm font-black text-[#3B82F6] font-mono">{row.id}</td>
                            <td className="px-8 py-5 text-sm text-slate-900">{row.cat}</td>
                            <td className="px-8 py-5">
                               <span className={cn(
                                 "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tight border",
                                 row.sev === 'Critical' ? "bg-red-50 text-red-600 border-red-100" : "bg-orange-50 text-orange-600 border-orange-100"
                               )}>{row.sev}</span>
                            </td>
                            <td className="px-8 py-5 text-sm text-slate-500">{row.owner}</td>
                            <td className="px-8 py-5">
                               <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200">{row.status}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Analysis</button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </WorkspacePanel>
        </div>

        <div className="space-y-8">
           <WorkspacePanel className="p-8 space-y-6 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <Activity className="text-emerald-400" />
                    <h3 className="text-lg font-black uppercase tracking-tight">Compliance Score</h3>
                 </div>
                 <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-slate-400 font-bold">JCI Standards</span>
                       <span className="text-emerald-400 font-black">98.2%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="w-[98%] bg-emerald-500 h-full rounded-full"></div>
                    </div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Audit Schedule</h3>
              <div className="space-y-4">
                 <AuditItem label="Hygiene & Sterilization" date="Tomorrow" status="Pending" />
                 <AuditItem label="Narcotic Handling" date="15 May" status="Scheduled" />
                 <AuditItem label="Patient Identification" date="22 May" status="Scheduled" />
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const AuditItem = ({ label, date, status }: any) => (
  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
     <div>
        <p className="text-xs font-black text-slate-900">{label}</p>
        <p className="text-[10px] text-slate-500 mt-1">{date}</p>
     </div>
     <span className="text-[9px] font-black text-[#3B82F6] uppercase">{status}</span>
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
