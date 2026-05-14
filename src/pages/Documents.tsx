import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  FileText, 
  Search, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Filter,
  Scan,
  Database,
  Eye,
  Download,
  Share2,
  Lock,
  Signature
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Documents() {
  const [activeTab, setActiveTab] = useState<'capture' | 'archive' | 'consents'>('capture');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Document Management (DMS)" 
        subtitle="Electronic document capture, indexing, OCR processing, and secure records release."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Scan className="mr-2 h-4 w-4 text-slate-400" /> Start OCR Scan
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Upload Document
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Total Records" value="2.4M" sub="Verified digital archive" icon={Database} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Scanning Queue" value="142" sub="8 high priority docs" icon={Scan} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Shared Lately" value="84" sub="Records release requests" icon={Share2} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Storage Vol" value="4.2 TB" sub="NVMe Optimized Store" icon={FileText} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'capture'} onClick={() => setActiveTab('capture')} label="Document Capture" icon={Scan} />
        <TabButton active={activeTab === 'archive'} onClick={() => setActiveTab('archive')} label="Medical Archive" icon={Database} />
        <TabButton active={activeTab === 'consents'} onClick={() => setActiveTab('consents')} label="Consent Forms" icon={Signature} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
           <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Captured Documents</h3>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input type="text" placeholder="Search by patient ID or tag..." className="h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6] text-sm bg-white" />
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Document Type</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Captured At</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">OCR Result</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {[
                        { type: "Surgical Consent", patient: "Alice Otieno", date: "12 May, 14:20", ocr: "Success (100%)" },
                        { type: "Referral Note", patient: "John Muthoni", date: "12 May, 11:45", ocr: "Review Needed" },
                        { type: "ID Proof (Front)", patient: "Sarah Wanjiku", date: "11 May, 09:30", ocr: "Success (98%)" },
                        { type: "Lab Result (Legacy)", patient: "Fred Mutua", date: "10 May, 16:21", ocr: "Awaiting OCR" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <FileText className="text-[#3B82F6]" size={18} />
                                 <span className="text-sm font-bold text-slate-900">{row.type}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5 text-sm text-slate-600 font-bold">{row.patient}</td>
                           <td className="px-8 py-5 text-xs text-slate-400 font-mono tracking-tight">{row.date}</td>
                           <td className="px-8 py-5">
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border shadow-sm",
                                row.ocr.includes('Success') ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                row.ocr.includes('Review') ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-slate-100 text-slate-400 border-slate-200"
                              )}>{row.ocr}</span>
                           </td>
                           <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                              <button className="p-2 text-slate-400 hover:text-[#3B82F6]"><Eye size={16} /></button>
                              <button className="p-2 text-slate-400 hover:text-[#3B82F6]"><Download size={16} /></button>
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
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Version Control</h3>
              <div className="space-y-4">
                 <VersionItem label="Hospital Policy v4.2" mod="Alice O. (Admin)" date="2h ago" />
                 <VersionItem label="Consent Form v1.1" mod="System" date="1d ago" />
                 <VersionItem label="Billing Template v2.0" mod="John M. (Finance)" date="3d ago" />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-slate-900 text-white border-none relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-2">
                    <Lock className="text-[#3B82F6]" size={18} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Security Vault</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed border-t border-slate-800 pt-4 italic">Encryption keys rotated successfully. Legal hold active on 14 records.</p>
                 <button className="w-full h-10 bg-[#3B82F6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Audit Access Logs</button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const VersionItem = ({ label, mod, date }: any) => (
  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
     <p className="text-xs font-black text-slate-900">{label}</p>
     <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-slate-400 font-bold truncate">By: {mod}</span>
        <span className="text-[10px] text-[#3B82F6] font-mono italic">{date}</span>
     </div>
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
