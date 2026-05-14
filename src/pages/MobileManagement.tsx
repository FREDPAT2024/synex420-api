import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Smartphone, 
  Search, 
  Bell, 
  RefreshCw, 
  Cloud, 
  Fingerprint, 
  Plus, 
  Filter,
  Users,
  Wifi,
  Package,
  CheckCircle2,
  Clock,
  QrCode
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function MobileManagement() {
  const [activeTab, setActiveTab] = useState<'doctor' | 'nurse' | 'patient'>('doctor');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Mobile Applications Ecosystem" 
        subtitle="Manage doctor, nurse, and patient mobile apps. Configure offline sync and push notifications."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <RefreshCw className="mr-2 h-4 w-4 text-slate-400" /> Force App Update
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all">
              <Bell className="mr-2 h-4 w-4" /> Global Notification
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Handhelds" value="284" sub="Nursing & Medical Staff" icon={Smartphone} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Push Deliverability" value="99.2%" sub="Active FCM/APNS" icon={Cloud} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Offline Syncs" value="1,240" sub="Last 12 Hours" icon={Wifi} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="App Crashes" value="0.02%" sub="Performance Stable" icon={CheckCircle2} color="text-emerald-600" bgColor="bg-emerald-50" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'doctor'} onClick={() => setActiveTab('doctor')} label="Doctor App" icon={Smartphone} />
        <TabButton active={activeTab === 'nurse'} onClick={() => setActiveTab('nurse')} label="Nurse App" icon={Smartphone} />
        <TabButton active={activeTab === 'patient'} onClick={() => setActiveTab('patient')} label="Patient App" icon={Users} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Clinical Dashboard", status: "Production", ver: "v2.4.1", users: 142, last: "2m ago" },
                { name: "eMAR / Scanning", status: "Production", ver: "v2.3.9", users: 110, last: "1h ago" },
                { name: "Virtual Consult", status: "Beta", ver: "v1.0.2", users: 32, last: "14m ago" },
              ].map((app, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                   <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                         <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all shadow-inner">
                            <Smartphone size={24} />
                         </div>
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border shadow-sm",
                           app.status === 'Production' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-[#3B82F6] border-blue-100"
                         )}>{app.status}</span>
                      </div>
                      
                      <h4 className="text-lg font-black text-slate-900 tracking-tight">{app.name}</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Version: {app.ver}</p>
                      
                      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Users size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-900">{app.users} Active</span>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] text-slate-400 font-bold uppercase">Last Sync</p>
                            <p className="text-[10px] font-black text-[#3B82F6] uppercase">{app.last}</p>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#3B82F6]/10 transition-all"></div>
                </div>
              ))}
           </div>
           
           <WorkspacePanel>
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Handheld Device Inventory</h3>
                 <button className="h-9 px-4 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm">
                    Assign Device
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                       <tr>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Device ID</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Model</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned To</th>
                          <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Battery</th>
                          <th className="px-8 py-4 text-right"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium">
                       {[
                         { id: "ZBR-4421", model: "Zebra TC52 (Clinical)", owner: "Sr. Alice Otieno", batt: "82%" },
                         { id: "IPAD-9912", model: "iPad Mini 6 (Surgery)", owner: "Dr. Kevin Mutua", batt: "34%" },
                         { id: "ZBR-8812", model: "Zebra TC52 (Pharmacy)", owner: "James K.", batt: "99%" },
                         { id: "IPH-14-01", model: "iPhone 14 (Admin)", owner: "John Musembi", batt: "65%" },
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-slate-50 transition-all cursor-pointer">
                            <td className="px-8 py-5 text-sm font-black font-mono text-slate-900">{row.id}</td>
                            <td className="px-8 py-5 text-xs font-black text-[#3B82F6] uppercase tracking-widest">{row.model}</td>
                            <td className="px-8 py-5 text-sm text-slate-600 font-bold">{row.owner}</td>
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "h-4 w-2 rounded-sm border border-slate-200 p-[1px] relative",
                                    parseInt(row.batt) < 40 ? "border-red-200" : "border-emerald-200"
                                  )}>
                                     <div className={cn(
                                       "w-full rounded-[1px] absolute bottom-0",
                                       parseInt(row.batt) < 40 ? "bg-red-500" : "bg-emerald-500"
                                     )} style={{ height: row.batt }}></div>
                                  </div>
                                  <span className="text-[10px] font-black text-slate-500">{row.batt}</span>
                               </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <QrCode size={16} className="text-slate-400 ml-auto" />
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
                MDM Profiles
                <Fingerprint size={18} className="text-[#3B82F6]" />
              </h3>
              <div className="space-y-4">
                 <MDMItem label="Clinician Restricted" status="Active" apps={12} />
                 <MDMItem label="Pharmacy (Kiosk Mode)" status="Active" apps={2} />
                 <MDMItem label="Nurse Duty (Shared)" status="Active" apps={8} />
                 <MDMItem label="Public Patient Terminal" status="Locked" apps={1} />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-slate-900 text-white border-none relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-2">
                    <Cloud className="text-[#3B82F6]" size={18} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Sync Gateway</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed border-t border-slate-800 pt-4">Internal WebSocket broker is stable. Average sync latency: 42ms.</p>
                 <div className="flex items-center gap-2 text-emerald-400">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Real-time Connected</span>
                 </div>
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const MDMItem = ({ label, status, apps }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
     <div>
        <p className="text-[10px] font-black text-slate-900 uppercase">{label}</p>
        <p className="text-[9px] text-[#3B82F6] font-bold mt-1">{apps} Whietlisted Apps</p>
     </div>
     <span className={cn(
       "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
       status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
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
