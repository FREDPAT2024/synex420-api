import React from 'react';
import { cn } from '../lib/utils';
import { PageHeader } from '../components/workspace/PageHeader';
import { StatsBar } from '../components/workspace/StatsBar';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { 
  Users, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
  Search,
  Plus,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  Clock,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      {/* PAGE HEADER */}
      <PageHeader 
        title="Command Center" 
        subtitle="Real-time clinical operations and facility overview."
        actions={
          <>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Download Ops Report
            </button>
            <Link to="/registration">
              <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
                <UserPlus className="mr-2 h-4 w-4" />
                New Registration
              </button>
            </Link>
          </>
        }
      />

      {/* STATS OVERVIEW */}
      <StatsBar>
        <StatItem 
          label="Total Active Patients" 
          value="1,284" 
          change="+12.5%" 
          icon={Users} 
          color="text-[#3B82F6]" 
          bgColor="bg-blue-50" 
        />
        <StatItem 
          label="Average Wait Time" 
          value="18 min" 
          change="-4.2%" 
          icon={Clock} 
          color="text-emerald-600" 
          bgColor="bg-emerald-50" 
        />
        <StatItem 
          label="Live Consultations" 
          value="42" 
          change="+8.3%" 
          icon={Stethoscope} 
          color="text-[#3B82F6]" 
          bgColor="bg-blue-50" 
        />
        <StatItem 
          label="Facility Revenue MTD" 
          value="KES 1.4M" 
          change="+14.2%" 
          icon={TrendingUp} 
          color="text-slate-700" 
          bgColor="bg-slate-100" 
        />
      </StatsBar>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT CLINICAL ACTIVITY */}
        <div className="lg:col-span-2">
          <WorkspacePanel>
            <div className="border-b border-[#E2E8F0] px-8 py-6 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                  Clinical Activity Feed
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">Live monitoring of patient flow and triage status across all wards.</p>
              </div>
              <button className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-xs font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all">
                Refresh Live Feed
              </button>
            </div>
            
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Data</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Service</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Queue Time</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Triage Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { name: "Faith Njeri", service: "ANC Consultation", time: "12 min", status: "In Consultation", color: "bg-blue-50 text-blue-600 border-blue-100" },
                      { name: "Kevin Otieno", service: "Laboratory - CBC", time: "24 min", status: "Triage", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                      { name: "Sarah Wambui", service: "Pharma Refill", time: "4 min", status: "Bill Pending", color: "bg-orange-50 text-orange-600 border-orange-100" },
                      { name: "John Musembi", service: "Emergency - Stabilization", time: "1 min", status: "Critical", color: "bg-red-50 text-red-600 border-red-100" },
                      { name: "Mercy Achieng", service: "General OPD", time: "45 min", status: "Awaiting Vitals", color: "bg-slate-50 text-slate-500 border-slate-100" }
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all shadow-sm">
                              {row.name.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.service}</td>
                        <td className="px-8 py-5 text-sm font-mono font-bold text-slate-500">{row.time}</td>
                        <td className="px-8 py-5">
                          <span className={cn("inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm", row.color)}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50/50 border-t border-[#E2E8F0] text-center">
              <Link to="/search" className="text-sm font-bold text-[#3B82F6] hover:underline flex items-center justify-center gap-2">
                Access Universal Queue Management <ChevronRight size={14} />
              </Link>
            </div>
          </WorkspacePanel>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-8">
          {/* SYSTEM MESSAGES */}
          <WorkspacePanel className="p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Clinical Alerts</h3>
               <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                 <Activity size={18} />
               </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-5 bg-red-50 border border-red-100 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                <div className="relative z-10 flex items-center gap-4">
                  <div className="h-10 w-10 bg-red-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-red-900 uppercase tracking-widest">Inventory Breach</h5>
                    <p className="text-xs text-red-700 mt-1 font-bold italic">Critical shortage of Insulin Type-1 noticed.</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <AlertCircle size={80} className="text-red-900" />
                </div>
              </div>

              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                <div className="relative z-10 flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#3B82F6] text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Management Brief</h5>
                    <p className="text-xs text-blue-700 mt-1 font-bold italic">Executive clinical review in 15 mins.</p>
                  </div>
                </div>
              </div>
            </div>
          </WorkspacePanel>

          {/* FACILITY STATUS */}
          <WorkspacePanel className="p-8 bg-[#0F172A] text-white border-none shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black uppercase tracking-tight">Facility Capacity</h3>
                  <span className="px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-black tracking-widest">OPTIMAL OPS</span>
                </div>
                
                <div className="space-y-6">
                   <CapacityItem label="Ward A (Male Medical)" value={85} />
                   <CapacityItem label="Ward B (Female Medical)" value={42} />
                   <CapacityItem label="Maternity / Gynae" value={92} />
                   <CapacityItem label="ICU / High Dependency" value={10} />
                </div>

                <button className="w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#3B82F6]/20 transition-all border border-blue-400 group-hover:scale-105">
                  Launch Bed Management Module
                </button>
             </div>
             <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#3B82F6]/10 rounded-full blur-[100px] group-hover:bg-[#3B82F6]/20 transition-all"></div>
          </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ label, value, change, icon: Icon, color, bgColor }: any) => (
  <div className="flex h-[130px] items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white px-10 shadow-sm group hover:border-[#3B82F6] transition-all hover:shadow-xl cursor-default">
    <div>
      <div className="flex items-center gap-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <span className={cn("text-[10px] font-black px-1.5 py-0.5 rounded-full", change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
          {change}
        </span>
      </div>
      <h3 className={cn("mt-2 text-3xl font-black tracking-tight font-mono", color || "text-slate-900")}>
        {value}
      </h3>
    </div>
    <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg ring-1 ring-black/5", bgColor || "bg-slate-100", color)}>
      <Icon className="h-8 w-8" />
    </div>
  </div>
);

const CapacityItem = ({ label, value }: { label: string, value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
      <span>{label}</span>
      <span className="font-mono text-[#3B82F6]">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
      <div 
        className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", 
          value > 90 ? "bg-red-500" : value > 70 ? "bg-orange-500" : "bg-emerald-500"
        )} 
        style={{ width: `${value}%` }} 
      />
    </div>
  </div>
);
