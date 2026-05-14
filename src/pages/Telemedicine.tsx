import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Video, 
  Search, 
  Activity, 
  Clock, 
  Plus, 
  Monitor,
  Wifi,
  Stethoscope,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Mic,
  Settings,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Telemedicine() {
  const [activeTab, setActiveTab] = useState<'waiting' | 'sessions' | 'monitoring'>('waiting');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Telemedicine & Virtual Care" 
        subtitle="Secure video consultation, remote patient monitoring (RPM), and e-Visit workflows."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Monitor className="mr-2 h-4 w-4 text-slate-400" /> Device Setup
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Video className="mr-2 h-4 w-4" /> Start Quick Consult
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Virtual Waiting Room" value="6" sub="Avg: 12m Queue Time" icon={Clock} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Consults Today" value="28" sub="Internal: 20 / Proxy: 8" icon={Video} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="RPM Active Alerts" value="4" sub="1 Critical BP Alert" icon={Activity} color="text-red-600" bgColor="bg-red-50" />
        <StatItem label="Connection Score" value="98%" sub="Uptime Verified" icon={Wifi} color="text-emerald-600" bgColor="bg-emerald-50" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'waiting'} onClick={() => setActiveTab('waiting')} label="Virtual Waiting Room" icon={Clock} />
        <TabButton active={activeTab === 'sessions'} onClick={() => setActiveTab('sessions')} label="Session History" icon={MessageSquare} />
        <TabButton active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} label="Remote Monitoring (RPM)" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Wanjiru", status: "Ready", wait: "4m", connection: "Excellent", purpose: "Routine Follow-up" },
                { name: "John Muthoni", status: "Waiting", wait: "12m", connection: "Good", purpose: "Diabetic Review" },
                { name: "Alice Otieno", status: "In Session", wait: "—", connection: "Excellent", purpose: "Post-Op Check" },
                { name: "Fred Mutua", status: "Ready", wait: "2m", connection: "Fair", purpose: "Mental Health" },
              ].map((patient, i) => (
                <div key={i} className={cn(
                  "p-6 rounded-2xl border transition-all group flex flex-col",
                  patient.status === 'Ready' ? "bg-white border-[#3B82F6]/30 shadow-lg shadow-blue-500/5 ring-1 ring-blue-50" : 
                  patient.status === 'In Session' ? "bg-slate-50 border-slate-200 opacity-60 pointer-events-none" :
                  "bg-white border-slate-100 hover:shadow-md"
                )}>
                   <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-black group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                         {patient.name.charAt(0)}
                      </div>
                      <div className="flex flex-col items-end">
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                           patient.status === 'Ready' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                           patient.status === 'In Session' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-orange-50 text-orange-600 border-orange-100"
                         )}>{patient.status}</span>
                         {patient.wait !== '—' && <span className="text-[9px] text-slate-400 font-bold mt-1">Wait: {patient.wait}</span>}
                      </div>
                   </div>
                   
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900">{patient.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">{patient.purpose}</p>
                   </div>
                   
                   <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Wifi size={12} className={cn(patient.connection === 'Excellent' ? "text-emerald-500" : "text-orange-500")} />
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{patient.connection} Link</span>
                      </div>
                      {patient.status !== 'In Session' && (
                        <button className="h-8 w-8 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center hover:scale-105 transition-all shadow-md shadow-blue-500/20">
                           <Video size={14} />
                        </button>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <WorkspacePanel className="p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4 flex items-center justify-between">
                RPM Alerts
                <Activity size={18} className="text-[#3B82F6]" />
              </h3>
              <div className="space-y-3">
                 <RPMAlert name="Sarah W." stat="BP: 162/110" date="2m ago" sev="Critical" />
                 <RPMAlert name="David M." stat="HR: 104 bpm" date="14m ago" sev="Warning" />
                 <RPMAlert name="Alice O." stat="Spo2: 94%" date="1h ago" sev="Routine" />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="text-[#3B82F6]" size={18} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Virtual SDK</h3>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed border-t border-slate-800 pt-4">Encryption active: AES-256 GCM using HIPAA-compliant relay.</p>
                 <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">End-to-End Secure</span>
                    <Settings className="text-slate-600" size={16} />
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const RPMAlert = ({ name, stat, date, sev }: any) => (
  <div className={cn(
    "p-3 rounded-xl border flex items-center justify-between group cursor-pointer transition-all",
    sev === 'Critical' ? "bg-red-50 border-red-100" : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md"
  )}>
     <div>
        <p className="text-xs font-bold text-slate-900">{name}</p>
        <p className={cn("text-[10px] font-black uppercase tracking-tight mt-0.5", sev === 'Critical' ? "text-red-600" : "text-[#3B82F6]")}>{stat}</p>
     </div>
     <div className="text-right">
        <p className="text-[8px] text-slate-400 font-bold uppercase">{date}</p>
        <ChevronRight size={14} className="text-slate-300 ml-auto mt-1" />
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
