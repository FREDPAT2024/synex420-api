import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Filter,
  ShoppingCart,
  Box,
  ClipboardList,
  History,
  TrendingDown,
  Building,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Procurement() {
  const [activeTab, setActiveTab] = useState<'requisitions' | 'vendors' | 'inventory'>('requisitions');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Procurement & Supply Chain" 
        subtitle="Vendor management, requisition workflows, and multi-location inventory tracking."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <ClipboardList className="mr-2 h-4 w-4 text-slate-400" /> Par Level Review
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Create Purchase Order
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="PO's Pending" value="12" sub="Awaiting approval" icon={ShoppingCart} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Items Below Par" value="84" sub="Auto-reorder enabled" icon={Box} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Lead Time (Avg)" value="3.2d" sub="Vendor Performance" icon={Truck} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Inventory Value" value="18.2M" sub="KES Current Assets" icon={TrendingDown} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'requisitions'} onClick={() => setActiveTab('requisitions')} label="Requisitions & POs" icon={ShoppingCart} />
        <TabButton active={activeTab === 'vendors'} onClick={() => setActiveTab('vendors')} label="Vendor Directory" icon={Building} />
        <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Store Management" icon={Package} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <WorkspacePanel>
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Purchase Orders</h3>
                 <span className="px-2 py-0.5 bg-blue-100 text-[#3B82F6] text-[9px] font-black rounded uppercase tracking-widest">12 active</span>
              </div>
              <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#3B82F6] hover:bg-blue-50">
                 Filter List
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">PO #</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Vendor</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Value (KES)</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium">
                  {[
                    { po: "PO-4421", vendor: "Missionpharma", value: "840,000", status: "Awaiting Receipt" },
                    { po: "PO-4422", vendor: "KEMSA", value: "2,400,000", status: "Pending Approval" },
                    { po: "PO-4423", vendor: "MedSource Ltd", value: "110,000", status: "Partially Received" },
                    { po: "PO-4424", vendor: "Surgipharm", value: "45,000", status: "Delivered" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                      <td className="px-8 py-5 text-sm font-black text-[#3B82F6] font-mono">{row.po}</td>
                      <td className="px-8 py-5 text-sm text-slate-900 font-bold">{row.vendor}</td>
                      <td className="px-8 py-5 text-sm text-slate-600 font-mono tracking-tight">{row.value}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                          row.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                          row.status === 'Pending Approval' ? "bg-orange-50 text-orange-600 border-orange-100" :
                          "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Track Delivery</button>
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
                Inventory Health
                <ActivityIcon size={18} className="text-[#3B82F6]" />
              </h3>
              <div className="space-y-4">
                 <HealthItem label="Pharmaceuticals" value={92} color="bg-emerald-500" />
                 <HealthItem label="Laboratory Reagents" value={78} color="bg-[#3B82F6]" />
                 <HealthItem label="Surgical Supplies" value={45} color="bg-orange-500" />
                 <HealthItem label="Ward Consumables" value={88} color="bg-[#3B82F6]" />
              </div>
              <button className="w-full h-10 border border-slate-200 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Generate Inventory Audit
              </button>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <History className="text-[#3B82F6]" />
                    <h3 className="text-lg font-black uppercase tracking-tight">Cycle Count</h3>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed italic">Scheduled cycle count for Theatre Store starts in 2 hours.</p>
                 <button className="w-full h-10 bg-[#3B82F6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Launch Mobile Count</button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const HealthItem = ({ label, value, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}% Stocked</span>
     </div>
     <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${value}%` }}></div>
     </div>
  </div>
);

const ActivityIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>
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
