import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Building2, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Filter,
  DollarSign,
  TrendingUp,
  CreditCard,
  History,
  ArrowUpRight,
  PieChart
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Accounting() {
  const [activeTab, setActiveTab] = useState<'gl' | 'ap' | 'ar'>('gl');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="General Ledger & Accounting" 
        subtitle="Full-cycle financial management, expense tracking, and asset depreciation."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <PieChart className="mr-2 h-4 w-4 text-slate-400" /> Financial Reports
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Journal Entry
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Monthly Revenue" value="KES 48.2M" sub="+14% vs Budget" icon={TrendingUp} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Total Expenses" value="KES 32.4M" sub="Payroll, Supplies, Utility" icon={DollarSign} color="text-red-600" bgColor="bg-red-50" />
        <StatItem label="Net Margin" value="32.8%" sub="Profitability Index" icon={ActivityIcon} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Cash on Hand" value="KES 12.8M" sub="Liquid Assets" icon={CreditCard} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'gl'} onClick={() => setActiveTab('gl')} label="General Ledger" icon={Building2} />
        <TabButton active={activeTab === 'ar'} onClick={() => setActiveTab('ar')} label="Accounts Receivable" icon={TrendingUp} />
        <TabButton active={activeTab === 'ap'} onClick={() => setActiveTab('ap')} label="Accounts Payable" icon={History} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Financial Transactions</h3>
                <Filter size={18} className="text-slate-400" />
             </div>
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Account / Description</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Debit</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Credit</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white">
                      {[
                        { date: "12 May", account: "Cash at Bank", desc: "Patient Payment - Case #882", dr: "12,400", cr: "—" },
                        { date: "12 May", account: "Pharmaceutical Supplies", desc: "Batch Purchase #PX-99", dr: "—", cr: "150,000" },
                        { date: "11 May", account: "Insurance Clearing", desc: "Remittance Advice - AAR", dr: "840,000", cr: "—" },
                        { date: "11 May", account: "Staff Payroll", desc: "April Salary Disbursement", dr: "—", cr: "4.2M" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-all font-medium">
                           <td className="px-8 py-5 text-xs text-slate-400 font-mono">{row.date}</td>
                           <td className="px-8 py-5">
                              <p className="text-sm font-bold text-slate-900">{row.account}</p>
                              <p className="text-[10px] text-slate-500 font-medium italic">{row.desc}</p>
                           </td>
                           <td className="px-8 py-5 text-sm font-mono text-emerald-600">{row.dr}</td>
                           <td className="px-8 py-5 text-sm font-mono text-red-600">{row.cr}</td>
                           <td className="px-8 py-5 text-right">
                              <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Details</button>
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
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">AR Aging</h3>
              <div className="space-y-3">
                 <AgingRow label="0 - 30 Days" value="KES 12.4M" percentage={60} color="bg-emerald-500" />
                 <AgingRow label="31 - 60 Days" value="KES 4.2M" percentage={20} color="bg-[#3B82F6]" />
                 <AgingRow label="61 - 90 Days" value="KES 2.8M" percentage={12} color="bg-orange-500" />
                 <AgingRow label="91+ Days" value="KES 1.1M" percentage={8} color="bg-red-500" />
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <FileText className="text-[#3B82F6]" />
                    <h3 className="text-lg font-black uppercase tracking-tight">Audit Status</h3>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed italic">Last reconciled: Today at 08:45 AM. System verified against bank statement.</p>
                 <div className="pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">In Sync</span>
                    <button className="h-9 px-4 bg-slate-800 text-white rounded-lg text-[9px] font-black uppercase border border-slate-700 hover:bg-slate-700 transition-all">Reconcile Now</button>
                 </div>
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const AgingRow = ({ label, value, percentage, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}</span>
     </div>
     <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }}></div>
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
