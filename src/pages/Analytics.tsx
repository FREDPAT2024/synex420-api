import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  PieChart, 
  Plus, 
  Filter,
  BarChart,
  LineChart,
  Database,
  Download,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'clinical' | 'operational'>('dashboards');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Analytics & Business Intelligence" 
        subtitle="Executive dashboards, clinical performance metrics, and predictive analytics."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Download className="mr-2 h-4 w-4 text-slate-400" /> Export Data
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <RefreshCw className="mr-2 h-4 w-4" /> Recalculate Models
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Readmission Risk" value="12.4%" sub="Predictive Index" icon={TrendingDown} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="OPD Throughput" value="142/hr" sub="Active Flow Rate" icon={Activity} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Revenue per Visit" value="KES 14k" sub="+8% MoM" icon={TrendingUp} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Data Health" value="99.9%" sub="Verified Sync" icon={Database} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'dashboards'} onClick={() => setActiveTab('dashboards')} label="Executive Board" icon={PieChart} />
        <TabButton active={activeTab === 'clinical'} onClick={() => setActiveTab('clinical')} label="Clinical Stats" icon={BarChart} />
        <TabButton active={activeTab === 'operational'} onClick={() => setActiveTab('operational')} label="Ops Efficiency" icon={LineChart} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <WorkspacePanel className="p-8 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Revenue vs Target (Monthly)</h3>
               <div className="flex gap-2">
                  <div className="h-2 w-2 bg-[#3B82F6] rounded-full"></div>
                  <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
               </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-4">
               {[65, 45, 85, 30, 90, 60, 75, 55, 95, 40].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-50 flex flex-col items-center gap-2 group cursor-pointer">
                     <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all group-hover:bg-[#2563EB]" style={{ height: `${h}%` }}></div>
                     <span className="text-[10px] font-black text-slate-400 font-mono">M{i+1}</span>
                  </div>
               ))}
            </div>
         </WorkspacePanel>

         <WorkspacePanel className="p-8 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Patient Satisfaction Index</h3>
               <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">AI Powered Insights</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
               <div className="h-48 w-48 rounded-full border-[16px] border-slate-100 flex items-center justify-center border-t-[#3B82F6] border-r-[#3B82F6] -rotate-45">
                  <div className="rotate-45 text-center">
                     <p className="text-4xl font-black text-slate-900 tracking-tighter">4.8</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Excellent</p>
                  </div>
               </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded bg-[#3B82F6]"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Wait Time Score</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded bg-slate-200"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase">Clinician Empathy</span>
               </div>
            </div>
         </WorkspacePanel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <WorkspacePanel className="p-8 space-y-6 xl:col-span-2">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center justify-between border-b border-slate-100 pb-4">
               Operational Hotspots
               <Terminal size={18} className="text-slate-400" />
            </h3>
            <div className="space-y-4">
               <HotspotRow label="Radiology MRI Wait Time" value="+22%" status="High Load" color="bg-red-500" />
               <HotspotRow label="Pharmacy Med Pass Rate" value="98%" status="Optimal" color="bg-emerald-500" />
               <HotspotRow label="Ward 4C Handover Duration" value="12m" status="Low Efficiency" color="bg-orange-500" />
               <HotspotRow label="Emergency Fast Track Flow" value="Average" status="Standard" color="bg-slate-300" />
            </div>
         </WorkspacePanel>

         <WorkspacePanel className="p-8 bg-slate-900 text-white flex flex-col h-full border-none relative overflow-hidden">
            <div className="relative z-10 space-y-4">
               <h3 className="text-lg font-black uppercase tracking-tight">Data Intelligence</h3>
               <p className="text-xs text-slate-400 leading-relaxed font-bold italic">
                 "Predicted 12% increase in ED admissions for the next 48 hours based on regional health trends."
               </p>
               <div className="pt-8 space-y-6">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Confidence Level</p>
                     <p className="text-2xl font-black text-[#3B82F6]">92%</p>
                  </div>
                  <button className="w-full h-12 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Prepare Staffing Model</button>
               </div>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3B82F6]/5 blur-3xl -mb-24 -mr-24"></div>
         </WorkspacePanel>
      </div>
    </div>
  );
}

const HotspotRow = ({ label, value, status, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
     <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{status}</p>
     </div>
     <div className="flex items-center gap-4">
        <span className="text-sm font-black text-slate-900 font-mono">{value}</span>
        <div className={cn("h-4 w-4 rounded-full", color)}></div>
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
