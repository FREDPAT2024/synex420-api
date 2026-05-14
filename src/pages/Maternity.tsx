import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Baby, 
  Heart, 
  Activity, 
  Clock, 
  Plus, 
  FileText,
  ShieldCheck,
  UserPlus,
  Stethoscope,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Maternity() {
  const [activeTab, setActiveTab] = useState<'anc' | 'labour' | 'newborn'>('labour');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Maternity & Newborn Care" 
        subtitle="Antenatal care tracking, partograph management, and neonatal clinical records."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <ClipboardList className="mr-2 h-4 w-4 text-slate-400" /> Partograph Tool
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-pink-600 px-5 text-sm font-semibold text-white shadow-xl shadow-pink-500/20 hover:bg-pink-700 transition-all">
              <Baby className="mr-2 h-4 w-4" /> New Birth Registration
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Labour" value="6" sub="2 High Risk Cases" icon={Activity} color="text-pink-600" bgColor="bg-pink-50" />
        <StatItem label="Deliveries Today" value="14" sub="+4 vs yesterday" icon={Baby} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Postnatal Beds" value="12/15" sub="80% Occupancy" icon={Heart} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="NICU Census" value="4" sub="2 on Ventilators" icon={Stethoscope} color="text-orange-600" bgColor="bg-orange-50" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'anc'} onClick={() => setActiveTab('anc')} label="Antenatal (ANC)" icon={ClipboardList} />
        <TabButton active={activeTab === 'labour'} onClick={() => setActiveTab('labour')} label="Labour & Delivery" icon={Activity} />
        <TabButton active={activeTab === 'newborn'} onClick={() => setActiveTab('newborn')} label="Newborn / NICU" icon={Baby} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
           <WorkspacePanel>
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Activity className="text-pink-600" size={20} />
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Labour Monitors</h3>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: WHO Partograph v2</span>
              </div>
              
              <div className="p-8 space-y-6">
                {[
                  { patient: "Mercy Wambui", ga: "39+2 Weeks", stage: "Stage 2 (Active)", fetalHR: "142 bpm", risk: "Low", bed: "MW-01" },
                  { patient: "Sarah Odhiambo", ga: "38+5 Weeks", stage: "Stage 1 (Latent)", fetalHR: "138 bpm", risk: "High (BP)", riskColor: "text-red-600", bed: "MW-04" },
                  { patient: "Jane Muthoni", ga: "40+0 Weeks", stage: "Stage 3 (Delivery)", fetalHR: "145 bpm", risk: "Low", bed: "DR-01" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl group hover:shadow-lg transition-all border-l-4 border-l-pink-500">
                     <div className="flex items-center gap-6">
                        <div className="h-12 w-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center font-black text-xl">
                           {row.patient.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-slate-900">{row.patient}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{row.ga} • Bed {row.bed}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-12 mt-4 md:mt-0">
                        <div className="text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Labour Stage</p>
                           <span className="text-xs font-bold text-pink-600 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full">{row.stage}</span>
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fetal HR</p>
                           <p className="text-lg font-black text-slate-900 tracking-tight">{row.fetalHR}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Profile</p>
                           <p className={cn("text-xs font-black uppercase tracking-widest", row.riskColor || "text-emerald-500")}>{row.risk}</p>
                        </div>
                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-all opacity-0 group-hover:opacity-100">
                           <ChevronRight size={20} />
                        </button>
                     </div>
                  </div>
                ))}
              </div>
           </WorkspacePanel>
        </div>

        <div className="space-y-8">
           <WorkspacePanel className="p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Neonatal Census (NICU)</h3>
              <div className="space-y-4">
                 <NewbornItem name="Baby Mercy" weight="2.4kg" ga="36 Weeks" status="Stable" />
                 <NewbornItem name="Baby Jane" weight="3.2kg" ga="40 Weeks" status="Observation" />
                 <NewbornItem name="Baby Sarah" weight="1.8kg" ga="32 Weeks" status="Critical" color="bg-red-50 text-red-600" />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-pink-50 border-pink-100">
              <h3 className="text-lg font-black text-pink-700 uppercase tracking-tight border-b border-pink-200 pb-4">ANC Analytics</h3>
              <div className="space-y-2">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-pink-700 font-bold">Protocol Adherence</span>
                    <span className="text-pink-800 font-black">94%</span>
                 </div>
                 <div className="w-full bg-pink-200/50 h-2 rounded-full overflow-hidden">
                    <div className="w-[94%] bg-pink-500 h-full rounded-full"></div>
                 </div>
                 <p className="text-[10px] text-pink-600 font-bold mt-3 italic tracking-tight">System suggests Vitamin K & Oxytocin readiness check for current shift.</p>
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const NewbornItem = ({ name, weight, ga, status, color }: any) => (
  <div className={cn("p-4 rounded-xl border flex items-center justify-between", color || "bg-slate-50 border-slate-100")}>
     <div>
        <p className="text-sm font-bold text-slate-900">{name}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{weight} • {ga}</p>
     </div>
     <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
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
        ? "text-pink-600 border-pink-600 bg-pink-50/30" 
        : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"
    )}
  >
    <Icon size={16} />
    {label}
  </button>
);
