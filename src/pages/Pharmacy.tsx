import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Pill, 
  Search, 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Plus,
  Filter,
  Package,
  FileText,
  ShieldAlert,
  Archive,
  ArrowRightCircle,
  Hash
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState<'orders' | 'dispensing' | 'inventory'>('orders');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Pharmacy Management (PMS)" 
        subtitle="Medication order entry, interaction checking, and unit-dose inventory."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Archive className="mr-2 h-4 w-4 text-slate-400" /> Stock Procurement
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Medication Order
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Pending Dispense" value="24" sub="12 ICU / 8 Emergency" icon={ShoppingCart} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Out of Stock" value="8" sub="Reorder triggered" icon={Package} color="text-red-600" bgColor="bg-red-50" />
        <StatItem label="Controlled Drugs" value="142" sub="Daily NAC count done" icon={ShieldAlert} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Total SKU Count" value="2,840" sub="Across all stores" icon={Hash} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} label="CPOE Worklist" icon={FileText} />
        <TabButton active={activeTab === 'dispensing'} onClick={() => setActiveTab('dispensing')} label="Dispensing Terminal" icon={Pill} />
        <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Inventory & 340B" icon={Package} />
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="relative flex-1 max-w-md">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                   <input type="text" placeholder="Search order #, drug name..." className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#3B82F6] shadow-sm font-medium" />
                </div>
                <div className="flex items-center gap-3">
                  <StatusFilter label="New Orders" count={14} active />
                  <StatusFilter label="Verification" count={8} />
                  <StatusFilter label="Flagged" count={2} color="text-red-500 bg-red-50 shadow-red-100" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">Prescription #</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Medication</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Alerts</th>
                    <th className="px-8 py-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { id: "RX-9921", patient: "Alice Otieno", med: "Amoxicillin 500mg (7 Days)", priority: "ROUTINE", alerts: "None" },
                    { id: "RX-9922", patient: "Kevin Mutua", med: "Morphine Sulphate 10mg", priority: "STAT", alerts: "NARCOTIC", alertColor: "text-orange-600 bg-orange-50" },
                    { id: "RX-9923", patient: "Sarah Wanjiku", med: "Warfarin 5mg (Monthly)", priority: "ROUTINE", alerts: "INTERACTION", alertColor: "text-red-600 bg-red-50" },
                    { id: "RX-9924", patient: "Jane Doe", med: "Paracetamol 1g IV", priority: "URGENT", alerts: "None" }
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-black text-[#3B82F6]">{row.id}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-slate-900">{row.patient}</span>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.med}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          row.priority === 'STAT' ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                         {row.alerts !== 'None' ? (
                           <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border", row.alertColor)}>
                             {row.alerts}
                           </span>
                         ) : (
                           <span className="text-slate-300">——</span>
                         )}
                      </td>
                      <td className="px-8 py-5 text-right">
                         <button className="h-9 px-4 bg-slate-900 shadow-xl shadow-slate-900/10 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
                           Dispense <ArrowRightCircle size={14} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WorkspacePanel>
        </div>
      )}
    </div>
  );
}

const StatusFilter = ({ label, count, active, color }: any) => (
  <button className={cn(
    "px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm",
    active ? (color || "bg-[#3B82F6] text-white border-[#3B82F6]") : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
  )}>
    {label} <span className={cn("px-1.5 py-0.5 rounded-md text-[8px]", active ? "bg-black/10" : "bg-slate-100")}>{count}</span>
  </button>
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
