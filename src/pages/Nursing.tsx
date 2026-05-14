import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  ClipboardCheck, 
  Users, 
  Clock, 
  Activity, 
  Plus, 
  FileText,
  UserCheck,
  History,
  AlertCircle,
  Thermometer,
  ShieldCheck,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Nursing() {
  const [activeTab, setActiveTab] = useState<'assessments' | 'handoff' | 'vitals'>('assessments');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Nursing Management Terminal" 
        subtitle="Clinical assessments, automated care plans, and shift handoff documentation."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <ArrowRightLeft className="mr-2 h-4 w-4 text-slate-400" /> Shift Handoff
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Assessment
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Assigned Patients" value="6" sub="Ward 4C / ICU 1" icon={Users} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Next Med Pass" value="10:00" sub="4 Pending" icon={Clock} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Acuity Score (Avg)" value="3.4/5" sub="Moderate Load" icon={Activity} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Safety Checks" value="100%" sub="All hourly checks done" icon={ShieldCheck} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'assessments'} onClick={() => setActiveTab('assessments')} label="Clinical Assessments" icon={ClipboardCheck} />
        <TabButton active={activeTab === 'handoff'} onClick={() => setActiveTab('handoff')} label="Shift Handoffs" icon={History} />
        <TabButton active={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')} label="Flowsheet / Vitals" icon={Thermometer} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <UserCheck className="text-[#3B82F6]" size={20} />
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pending Nursing Tasks</h3>
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: Nursing Care Plan 4.1</span>
            </div>
            
            <div className="p-8 space-y-4">
              <TaskEntry label="Intake & Output Tracking" patient="Alice Otieno" priority="High" time="Overdue: 12min" />
              <TaskEntry label="Wound Dressing Change" patient="Kevin Mutua" priority="Routine" time="Due: 14:00" />
              <TaskEntry label="Pain Assessment (VAS)" patient="Sarah Wambui" priority="High" time="Due: Now" />
              <TaskEntry label="Fall Risk Re-evaluation" patient="John Musembi" priority="Routine" time="Due: End of Shift" />
            </div>
          </WorkspacePanel>

          <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <FileText className="text-[#3B82F6]" size={20} />
                   <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Nursing Plans</h3>
                </div>
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <CarePlan label="Post-Op Care Plan" patient="James O." progress={80} />
                <CarePlan label="Fluid Management" patient="Mercy W." progress={45} />
                <CarePlan label="Pain Management" patient="David K." progress={92} />
                <CarePlan label="Respiratory Supp." patient="Sarah W." progress={30} />
             </div>
          </WorkspacePanel>
        </div>

        <div className="space-y-8">
           <WorkspacePanel className="p-8 space-y-6 bg-blue-50/50 border-blue-100">
              <h3 className="text-lg font-black text-[#3B82F6] uppercase tracking-tight border-b border-blue-100 pb-4 flex items-center justify-between">
                Nurse Acuity
                <Activity size={18} />
              </h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">System monitoring of workload balance across the current ward shift.</p>
              <div className="space-y-4">
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold">Shift Progress</span>
                    <span className="text-[#3B82F6] font-black">6/8 hrs</span>
                 </div>
                 <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="w-3/4 bg-[#3B82F6] h-full rounded-full"></div>
                 </div>
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Clinical Alerts</h3>
              <div className="space-y-3">
                 <div className="flex items-start gap-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                    <div>
                       <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Pain Score 8/10</p>
                       <p className="text-xs font-bold text-slate-900">Bed 402 - Kevin M.</p>
                       <p className="text-[9px] text-slate-500 mt-1 italic">Intervention Required</p>
                    </div>
                 </div>
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const TaskEntry = ({ label, patient, priority, time }: any) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl group hover:shadow-md transition-all">
     <div className="flex items-center gap-4">
        <div className={cn("h-1.5 w-1.5 rounded-full", priority === 'High' ? "bg-red-500" : "bg-blue-500")}></div>
        <div>
           <p className="text-sm font-bold text-slate-900">{label}</p>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{patient}</p>
        </div>
     </div>
     <div className="text-right">
        <p className="text-xs font-black text-[#3B82F6] tracking-tight">{time}</p>
        <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#3B82F6] mt-1">Mark Done</button>
     </div>
  </div>
);

const CarePlan = ({ label, patient, progress }: any) => (
  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
     <div className="flex items-center justify-between mb-3">
        <div>
           <p className="text-xs font-black text-slate-900 uppercase tracking-wide">{label}</p>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{patient}</p>
        </div>
        <span className="text-[10px] font-black text-[#3B82F6]">{progress}%</span>
     </div>
     <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: `${progress}%` }}></div>
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
