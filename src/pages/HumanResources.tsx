import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Users, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Filter,
  DollarSign,
  Briefcase,
  Clock,
  History,
  FileText,
  CalendarCheck,
  Plane
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function HumanResources() {
  const [activeTab, setActiveTab] = useState<'payroll' | 'scheduling' | 'staff'>('payroll');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Human Resources & Payroll" 
        subtitle="Staff scheduling, automated payroll processing, and leave management."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <CalendarCheck className="mr-2 h-4 w-4 text-slate-400" /> Duty Roster
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-black transition-all">
              <Plus className="mr-2 h-4 w-4" /> Run Payroll (Batch)
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Total Employees" value="284" sub="Clinical: 142 / Admin: 142" icon={Users} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="On Leave Today" value="18" sub="12 Annual / 6 Sick" icon={Plane} color="text-orange-600" bgColor="bg-orange-50" />
        <StatItem label="Shift Coverage" value="98%" sub="Target: 100%" icon={Clock} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="Monthly Payout" value="KES 42.8M" sub="Next Cycle: 25 May" icon={DollarSign} color="text-slate-700" bgColor="bg-slate-100" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} label="Payroll Processing" icon={DollarSign} />
        <TabButton active={activeTab === 'scheduling'} onClick={() => setActiveTab('scheduling')} label="Staff Scheduling" icon={Clock} />
        <TabButton active={activeTab === 'staff'} onClick={() => setActiveTab('staff')} label="Employee Directory" icon={Users} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <WorkspacePanel>
             <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Duty Roster (Nursing Dept)</h3>
                <Filter size={18} className="text-slate-400" />
             </div>
             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead className="bg-[#F8FAFC] border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Shift</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Ward / Unit</th>
                         <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Hours</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {[
                        { name: "Sr. Alice Otieno", shift: "Day Shift", ward: "Ward 4C (Medical)", hours: "07:00 - 15:00", status: "On Duty" },
                        { name: "Sr. Mercy Wambui", shift: "Day Shift", ward: "Maternity", hours: "07:00 - 15:00", status: "On Duty" },
                        { name: "Dr. Kevin Mutua", shift: "On Call", ward: "Surgery / OR", hours: "24 Hrs", status: "Available" },
                        { name: "John Musembi", shift: "Night Shift", ward: "Emergency", hours: "19:00 - 07:00", status: "Off Duty" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                                    {row.name.charAt(0)}
                                 </div>
                                 <span className="text-sm font-bold text-slate-900">{row.name}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5 text-sm font-black text-[#3B82F6] uppercase tracking-tighter">{row.shift}</td>
                           <td className="px-8 py-5 text-sm text-slate-600">{row.ward}</td>
                           <td className="px-8 py-5 text-xs text-slate-400 font-mono italic">{row.hours}</td>
                           <td className="px-8 py-5 text-right">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                                row.status === 'On Duty' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                                row.status === 'Available' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                "bg-slate-50 text-slate-400 border-slate-200"
                              )}>{row.status}</span>
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
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Statutory Disbursal</h3>
              <div className="space-y-4">
                 <PayrollBar label="PAYE (Tax)" value="12.4M" percentage={75} />
                 <PayrollBar label="NHIF Contribution" value="2.8M" percentage={45} />
                 <PayrollBar label="NSSF Savings" value="1.2M" percentage={30} />
                 <PayrollBar label="Housing Levy" value="0.9M" percentage={20} />
              </div>
           </WorkspacePanel>

           <WorkspacePanel>
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Payslips</h3>
              </div>
              <div className="p-8 pt-0 space-y-4">
                 <PayslipItem date="Apr 2026" amount="KES 142,400" status="Generated" />
                 <PayslipItem date="Mar 2026" amount="KES 142,400" status="Paid" />
                 <PayslipItem date="Feb 2026" amount="KES 138,200" status="Paid" />
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const PayrollBar = ({ label, value, percentage }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}</span>
     </div>
     <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
        <div className="h-full bg-[#3B82F6] rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
     </div>
  </div>
);

const PayslipItem = ({ date, amount, status }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 group cursor-pointer hover:bg-slate-50/50 rounded-lg px-2 transition-all">
     <div>
        <p className="text-xs font-bold text-slate-900">{date}</p>
        <p className="text-[10px] text-slate-500 font-mono">{amount}</p>
     </div>
     <span className={cn(
       "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
       status === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-[#3B82F6] border-blue-100"
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
