import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Plus, 
  Filter,
  CreditCard,
  History,
  Smartphone,
  BookOpen,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState<'applets' | 'records' | 'messages'>('applets');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Patient Portal & Engagement" 
        subtitle="Secure message gateway, medical record access, and self-service scheduling."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Smartphone className="mr-2 h-4 w-4 text-slate-400" /> App Config
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Register New Account
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Users" value="12.4k" sub="Mobile: 82% / Web: 18%" icon={Users} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Pending Refills" value="48" sub="Awaiting Pharmacy" icon={History} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Security Score" value="98/100" sub="MFA Enforcement Active" icon={ShieldCheck} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="New Message" value="12" sub="Response avg: 14m" icon={MessageSquare} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'applets'} onClick={() => setActiveTab('applets')} label="Engagement Dashboard" icon={Smartphone} />
        <TabButton active={activeTab === 'records'} onClick={() => setActiveTab('records')} label="Shared Records" icon={FileText} />
        <TabButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} label="Patient Comms" icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
           <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Portal Users</h3>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input type="text" placeholder="Search patient name or ID..." className="h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6] text-sm" />
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Data</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Portal Status</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Last Login</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Verification</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {[
                        { name: "Alice Otieno", status: "Active", login: "Today, 08:42", ver: "Verified (MFA)" },
                        { name: "John Muthoni", status: "Locked", login: "2 days ago", ver: "Identity Check Req." },
                        { name: "Sarah Wanjiku", status: "Active", login: "1 hour ago", ver: "Verified (SAML)" },
                        { name: "Fred Mutua", status: "Pending", login: "Never", ver: "Invitation Sent" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer group">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-black group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                                    {row.name.charAt(0)}
                                 </div>
                                 <span className="text-sm font-bold text-slate-900">{row.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border shadow-sm",
                                row.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                row.status === 'Locked' ? "bg-red-50 text-red-600 border-red-100" : "bg-slate-100 text-slate-500 border-slate-200"
                              )}>{row.status}</span>
                           </td>
                           <td className="px-8 py-5 text-xs text-slate-500 font-mono tracking-tight italic">{row.login}</td>
                           <td className="px-8 py-5 text-sm font-bold text-slate-700">{row.ver}</td>
                           <td className="px-8 py-5 text-right">
                              <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Manage Account</button>
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
                Engagement Tasks
                <Bell size={18} className="text-[#3B82F6]" />
              </h3>
              <div className="space-y-4">
                 <PortalTask label="Educational Material Send" count={12} />
                 <PortalTask label="Lab Result Notifications" count={42} />
                 <PortalTask label="Bill Payment Overdue Alerts" count={8} />
                 <PortalTask label="Satisfaction Surveys" count={110} />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-slate-900 text-white border-none relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-2">
                    <Activity className="text-[#3B82F6]" size={18} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Health Library</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed">System-generated health literature synchronized with patient conditions.</p>
                 <div className="pt-4 border-t border-slate-800">
                    <button className="w-full h-10 bg-[#3B82F6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Update Library</button>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const PortalTask = ({ label, count }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
     <span className="text-xs font-black text-slate-900">{label}</span>
     <span className="text-[10px] font-black text-[#3B82F6]">{count}</span>
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
