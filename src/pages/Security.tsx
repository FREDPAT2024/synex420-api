import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Lock, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Fingerprint, 
  AlertTriangle, 
  History, 
  Key, 
  Eye, 
  Smartphone,
  Server,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Security() {
  const [activeTab, setActiveTab] = useState<'rbac' | 'audit' | 'compliance'>('rbac');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Security & Audit" 
        subtitle="Role-Based Access Control (RBAC), audit trails, and data encryption management."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <History className="mr-2 h-4 w-4 text-slate-400" /> View Audit Logs
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">
              <AlertTriangle className="mr-2 h-4 w-4" /> Emerg. Break-Glass
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Failed Logins" value="14" sub="Last 24 Hours" icon={AlertTriangle} color="text-red-600" bgColor="bg-red-50" />
        <StatItem label="Active Sessions" value="142" sub="83 Mobile / 59 Web" icon={Smartphone} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Compliance Score" value="99.2%" sub="HIPAA/GDPR Auditable" icon={ShieldCheck} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Encryption" value="AES-256" sub="At Rest & In Transit" icon={Lock} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'rbac'} onClick={() => setActiveTab('rbac')} label="Access Control (RBAC)" icon={UserCheck} />
        <TabButton active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} label="System Audit Trail" icon={Eye} />
        <TabButton active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} label="Compliance Center" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
           <WorkspacePanel>
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Access Control & Role Permissions</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search roles or users..." className="h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6] text-sm" />
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                       <tr>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Role Name</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Members</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Access Level</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                          <th className="px-8 py-4 text-right"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                       {[
                         { role: "Super Admin", members: 3, access: "Full System", status: "Permanent" },
                         { role: "Clinical Doctor", members: 42, access: "EH / Clinical Only", status: "Standard" },
                         { role: "Pharmacy Head", members: 2, access: "Inventory/Billing", status: "Restricted" },
                         { role: "External Auditor", members: 1, access: "Read-Only (Audit)", status: "Temporary" },
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer font-medium">
                            <td className="px-8 py-5 text-sm font-bold text-slate-900">{row.role}</td>
                            <td className="px-8 py-5 text-sm text-[#3B82F6]">{row.members} active</td>
                            <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">{row.access}</td>
                            <td className="px-8 py-5">
                               <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-slate-100 text-slate-500 border border-slate-200">{row.status}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <button className="text-[10px] font-black text-[#3B82F6] uppercase hover:underline">Edit Policy</button>
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
                Security Alerts
                <AlertTriangle size={18} className="text-red-500" />
              </h3>
              <div className="space-y-4">
                 <AlertRow label="Brute Force Attempt" time="12m ago" sev="High" />
                 <AlertRow label="New Admin Created" time="1h ago" sev="Critical" />
                 <AlertRow label="API Key Rotated" time="3h ago" sev="Info" />
                 <AlertRow label="Data Export Initiated" time="5h ago" sev="Warning" />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <Database className="text-[#3B82F6]" />
                    <h3 className="text-lg font-black uppercase tracking-tight">Recovery Plan</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed italic border-t border-slate-800 pt-4">Last full backup completed at 03:12 AM. Syncing to DR Site in London.</p>
                 <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">DR Site: Online</span>
                    <Server size={14} className="text-slate-600" />
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const AlertRow = ({ label, time, sev }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
     <div>
        <p className="text-xs font-black text-slate-900">{label}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{time}</p>
     </div>
     <span className={cn(
       "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
       sev === 'Critical' ? "bg-red-50 text-red-600 border-red-100" :
       sev === 'High' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-slate-100 text-slate-500 border-slate-100"
     )}>{sev}</span>
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
