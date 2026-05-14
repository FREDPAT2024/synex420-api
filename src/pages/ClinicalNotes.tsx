import React from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Eye, 
  SearchIcon,
  ShieldCheck,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ClinicalNotes() {
  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-700">
      <PageHeader 
        title="Clinical Archive" 
        subtitle="Historical clinical records, research data, and patient longitudinal notes."
        actions={
          <>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" /> Bulk Export
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" /> New Archival Note
            </button>
          </>
        }
      />

      <WorkspacePanel>
        <div className="p-8 border-b border-[#E2E8F0] bg-slate-50/50">
          <div className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Advanced archive search (Diagnosis, Patient Name, Date Range)..." 
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#3B82F6] shadow-sm font-medium transition-all"
                />
             </div>
             <button className="h-14 px-6 border border-slate-200 bg-white rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-3">
                <Filter size={18} /> Detailed Filter
             </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive Record ID</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Entity</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Archival Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Lead</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Status</th>
                <th className="px-8 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                { id: "ARC-1092-A", patient: "Sarah Wambui", date: "22 May 2026", lead: "Dr. Kiama", status: "Verified", type: "SOAP-Note" },
                { id: "ARC-1093-A", patient: "John Musembi", date: "21 May 2026", lead: "Dr. Adhiambo", status: "Verified", type: "Lab Report" },
                { id: "ARC-1094-A", patient: "Kevin Otieno", date: "21 May 2026", lead: "Dr. Kiama", status: "Audit-Ready", type: "Radiology" },
                { id: "ARC-1095-A", patient: "Faith Njeri", date: "20 May 2026", lead: "Dr. Adhiambo", status: "Verified", type: "Discharge" },
                { id: "ARC-1096-A", patient: "Mercy Achieng", date: "19 May 2026", lead: "Dr. Kiama", status: "Verified", type: "SOAP-Note" }
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                    <span className="font-mono text-xs font-bold text-[#3B82F6]">{row.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{row.patient}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">{row.type}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Calendar size={14} className="text-[#3B82F6]" />
                      {row.date}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <span className="text-sm font-medium text-slate-700">{row.lead}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      row.status === 'Verified' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-[#3B82F6] border-blue-100"
                    )}>
                      <ShieldCheck size={12} />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 rounded-lg text-slate-400 hover:text-[#3B82F6] hover:bg-blue-50 transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WorkspacePanel>

      <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-inner">
         <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white shadow-lg">
               <FileText size={24} />
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Compliance & Auditing Rule 2.1 Active</h4>
               <p className="text-xs text-slate-500 font-medium">All clinical notes are immutable once signed and validated.</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
            Access Governance Protocol
         </button>
      </div>
    </div>
  );
}
