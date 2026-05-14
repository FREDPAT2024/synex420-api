import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Camera, 
  Search, 
  Monitor, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Plus,
  Filter,
  Layers,
  FileText,
  User,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Radiology() {
  const [activeTab, setActiveTab] = useState<'worklist' | 'viewer' | 'archive'>('worklist');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Radiology & Imaging (RIS/PACS)" 
        subtitle="DICOM worklist, diagnostic reporting, and modality management."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Layers className="mr-2 h-4 w-4" /> Batch Reporting
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Add Modality Order
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Worklist" value="12" sub="3 Stats Overdue" icon={Monitor} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Imaging Today" value="48" sub="CT: 12, MRI: 8, XR: 28" icon={Camera} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Draft Reports" value="5" sub="Awaiting radiologist" icon={FileText} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="PACS Connectivity" value="Online" sub="10.1.34.12:104" icon={Activity} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'worklist'} onClick={() => setActiveTab('worklist')} label="DICOM Worklist" icon={Monitor} />
        <TabButton active={activeTab === 'viewer'} onClick={() => setActiveTab('viewer')} label="Web Viewer (Light)" icon={Camera} />
        <TabButton active={activeTab === 'archive'} onClick={() => setActiveTab('archive')} label="Digital Archive" icon={Layers} />
      </div>

      {activeTab === 'worklist' && (
        <div className="space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="relative flex-1 max-w-md">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                   <input type="text" placeholder="Search accession #, patient name..." className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#3B82F6] shadow-sm font-medium" />
                </div>
                <div className="flex gap-2">
                  <ModalityChip label="X-RAY" count={12} active />
                  <ModalityChip label="CT" count={4} />
                  <ModalityChip label="MRI" count={2} />
                  <ModalityChip label="US" count={8} />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">Accession #</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Data</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Study Type</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Requesting Physician</th>
                    <th className="px-8 py-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { acc: "RAD-2024-001", patient: "James Odhiambo", study: "Chest X-Ray (PA View)", status: "COMPLETED", physician: "Dr. K. Njuguna", priority: "Routine" },
                    { acc: "RAD-2024-002", patient: "Alice Wanjiru", study: "CT Brain (Non-Contrast)", status: "IN PROGRESS", physician: "Dr. M. Kamau", priority: "Urgent" },
                    { acc: "RAD-2024-003", patient: "David Kariuki", study: "MRI Lumbar Spine", status: "SCHEDULED", physician: "Dr. S. Okello", priority: "Routine" },
                    { acc: "RAD-2024-004", patient: "Mary Mumbua", study: "US Abdomen/Pelvis", status: "AWAITING REPORT", physician: "Dr. L. Mutua", priority: "Urgent" }
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-black text-[#3B82F6]">{row.acc}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center text-[10px] font-black">
                            {row.patient.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{row.patient}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                           <Camera size={14} className="text-slate-400" />
                           <span className="text-sm font-medium text-slate-600">{row.study}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                          row.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                          row.status === 'IN PROGRESS' ? "bg-orange-50 text-orange-600 border-orange-100" :
                          "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-500">{row.physician}</td>
                      <td className="px-8 py-5 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button className="p-2 text-slate-400 hover:text-[#3B82F6] transition-colors"><ExternalLink size={16} /></button>
                           <button className="h-9 px-4 bg-[#3B82F6] text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                             View Study
                           </button>
                         </div>
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

const ModalityChip = ({ label, count, active }: any) => (
  <button className={cn(
    "px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm",
    active ? "bg-[#3B82F6] text-white border-[#3B82F6]" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
  )}>
    {label} <span className={cn("px-1.5 py-0.5 rounded-md text-[8px]", active ? "bg-white/20" : "bg-slate-100")}>{count}</span>
  </button>
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
