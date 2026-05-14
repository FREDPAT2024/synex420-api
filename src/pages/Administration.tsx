import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Settings, 
  Search, 
  Users, 
  Layout, 
  Database, 
  Activity, 
  Plus, 
  Filter,
  Terminal,
  RefreshCw,
  Globe,
  HardDrive,
  Cpu,
  Key
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Administration() {
  const [activeTab, setActiveTab] = useState<'users' | 'systems' | 'config'>('users');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="System Administration" 
        subtitle="Manage users, master data, workflow engines, and multi-facility configurations."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Terminal className="mr-2 h-4 w-4 text-slate-400" /> System CLI
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all">
              <Plus className="mr-2 h-4 w-4" /> Add New Facility
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Facilities" value="4" sub="Regional Hospital Center" icon={Globe} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="DB Health" value="Healthy" sub="Latency: 12ms" icon={Database} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="CPU Usage" value="24%" sub="8 Core Instance" icon={Cpu} color="text-slate-700" bgColor="bg-slate-100" />
        <StatItem label="Storage" value="1.2 TB" sub="NVMe High Speed" icon={HardDrive} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} label="User Management" icon={Users} />
        <TabButton active={activeTab === 'systems'} onClick={() => setActiveTab('systems')} label="System Health" icon={Activity} />
        <TabButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} label="Workflow Config" icon={Settings} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">System User Accounts</h3>
                <div className="flex items-center gap-4">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" placeholder="Search accounts..." className="h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6] text-sm bg-white" />
                   </div>
                   <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6] transition-all"><Filter size={18} /></button>
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">User Identification</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Role / Department</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Facility</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Activity</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {[
                        { name: "John Musembi", mail: "j.musembi@hospital.org", role: "Super Admin", dept: "IT & Admin", facility: "Main HQ", activity: "Online Now" },
                        { name: "Alice Otieno", mail: "a.otieno@hospital.org", role: "Nurse Head", dept: "Nursing", facility: "Ward 4C", activity: "2h ago" },
                        { name: "Kevin Mutua", mail: "k.mutua@hospital.org", role: "Surgeon", dept: "Surgery", facility: "Surgical Unit", activity: "1d ago" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer group">
                           <td className="px-8 py-5">
                              <p className="text-sm font-bold text-slate-900">{row.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono tracking-tighter">{row.mail}</p>
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-xs font-black text-[#3B82F6] uppercase tracking-tighter">{row.role}</p>
                              <p className="text-[10px] text-slate-500">{row.dept}</p>
                           </td>
                           <td className="px-8 py-5 text-sm text-slate-600 font-bold">{row.facility}</td>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                 <div className={cn("h-1.5 w-1.5 rounded-full", row.activity === 'Online Now' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")}></div>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{row.activity}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button className="p-2 text-slate-400 hover:text-[#3B82F6]"><Settings size={16} /></button>
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
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">API Management</h3>
              <div className="space-y-4">
                 <APIKeyItem label="Mobile App Gateway" hash="8f42...a921" status="Active" />
                 <APIKeyItem label="Interoperability (FHIR)" hash="219a...118c" status="Active" />
                 <APIKeyItem label="Payment (M-Pesa)" hash="991a...ee21" status="Rotating" />
              </div>
              <button className="w-full h-10 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Generate New API Key</button>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-slate-900 text-white border-none relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <RefreshCw className="text-[#3B82F6]" />
                    <h3 className="text-lg font-black uppercase tracking-tight">Updates Center</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed border-t border-slate-800 pt-4">System v14.2.1 is available. Release notes includes new OCR engine for Documents.</p>
                 <button className="w-full h-10 bg-[#3B82F6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Install Update</button>
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const APIKeyItem = ({ label, hash, status }: any) => (
  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all group">
     <div>
        <p className="text-xs font-black text-slate-900">{label}</p>
        <p className="text-[10px] text-slate-400 font-mono italic group-hover:text-[#3B82F6]">SHA256: {hash}</p>
     </div>
     <span className={cn(
       "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
       status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
     )}>{status}</span>
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
