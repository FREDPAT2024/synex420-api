import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';
import { PageHeader } from '../components/workspace/PageHeader';
import { StatsBar } from '../components/workspace/StatsBar';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { 
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Plus,
  Receipt,
  Search,
  Send,
  Shield,
  DollarSign
} from "lucide-react";

export default function Billing() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* PAGE HEADER */}
      <PageHeader 
        title="Billing Workspace" 
        subtitle="Manage patient billing, insurance reconciliation, M-Pesa collections, and revenue operations."
        actions={
          <>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Export Report
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </button>
          </>
        }
      />

      {/* FULL WIDTH STATS BAR */}
      <StatsBar>
        <StatItem 
          label="Today's Cash" 
          value="KES 482,000" 
          icon={Banknote} 
          color="text-[#3B82F6]" 
          bgColor="bg-blue-50" 
        />
        <StatItem 
          label="M-Pesa Collections" 
          value="KES 1.24M" 
          icon={CreditCard} 
          color="text-emerald-600" 
          bgColor="bg-emerald-50" 
        />
        <StatItem 
          label="Insurance Pool" 
          value="KES 3.12M" 
          icon={Shield} 
          color="text-[#3B82F6]" 
          bgColor="bg-blue-50" 
        />
        <StatItem 
          label="Cleared Claims" 
          value="184" 
          icon={CheckCircle2} 
          color="text-slate-700" 
          bgColor="bg-slate-100" 
        />
      </StatsBar>

      {/* MAIN BILLING WORKSPACE */}
      <WorkspacePanel>
        {/* PANEL HEADER */}
        <div className="flex flex-col gap-4 border-b border-[#E2E8F0] px-8 py-6 lg:flex-row lg:items-center lg:justify-between bg-slate-50/30">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              New Billing Batch
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create and process patient invoices, insurance claims, and mobile
              collections.
            </p>
          </div>
          <div className="relative w-full lg:w-[360px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search patient, invoice, NHIF..."
              className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#3B82F6] focus:bg-white shadow-inner"
            />
          </div>
        </div>

        {/* FORM BODY */}
        <div className="grid grid-cols-1 gap-8 p-8 xl:grid-cols-3">
          {/* LEFT FORM */}
          <div className="space-y-6 xl:col-span-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Patient Name
                </label>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                   <input
                    className="h-12 w-full rounded-xl border border-[#E2E8F0] pl-10 pr-4 outline-none focus:border-[#3B82F6] transition-colors bg-[#F8FAFC]/50"
                    placeholder="Search patient..."
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Invoice Type
                </label>
                <select className="h-12 w-full rounded-xl border border-[#E2E8F0] px-4 outline-none focus:border-[#3B82F6] transition-colors appearance-none bg-[#F8FAFC]/50 cursor-pointer">
                  <option>Outpatient Billing</option>
                  <option>Inpatient Billing</option>
                  <option>Insurance Claim</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Total Amount (KES)
                </label>
                <input
                  className="h-12 w-full rounded-xl border border-[#E2E8F0] px-4 outline-none focus:border-[#3B82F6] transition-colors font-mono font-bold bg-[#F8FAFC]/50"
                  placeholder="KES 0.00"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Payment Method
                </label>
                <select className="h-12 w-full rounded-xl border border-[#E2E8F0] px-4 outline-none focus:border-[#3B82F6] transition-colors appearance-none bg-[#F8FAFC]/50 cursor-pointer">
                  <option>M-Pesa (STK Push)</option>
                  <option>Cash</option>
                  <option>Insurance / NHIF</option>
                  <option>Debit/Credit Card</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Clinical & Billing Notes
              </label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-[#E2E8F0] p-4 outline-none focus:border-[#3B82F6] transition-colors resize-none bg-[#F8FAFC]/50"
                placeholder="Additional details for reconciliation..."
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row">
              <button className="flex-1 inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Save Draft
              </button>
              <button className="flex-1 inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-6 text-sm font-semibold text-white hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all">
                <Send className="mr-2 h-4 w-4" />
                Initialize Transaction
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="rounded-xl border border-[#E2E8F0] bg-slate-50 p-6 space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 font-display">
                  Revenue Snapshot
                </h3>
                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Pending Invoices
                  </span>
                  <span className="font-semibold text-slate-900 font-mono">
                    KES 2.8M
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    NHIF Claims
                  </span>
                  <span className="font-semibold text-slate-900 font-mono">
                    KES 860K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Daily Collections
                  </span>
                  <span className="font-semibold text-emerald-600 font-mono">
                    +18.4%
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#3B82F6]">
                  <Receipt className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    Active Batch
                  </p>
                  <h4 className="font-bold text-slate-900">
                    OPD-MAY-2026-014
                  </h4>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Quick Tools</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                  <Receipt className="h-4 w-4 mx-auto mb-2 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-600">Reprint</span>
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:border-[#3B82F6] hover:shadow-md transition-all">
                  <CheckCircle2 className="h-4 w-4 mx-auto mb-2 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-600">Verify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </WorkspacePanel>

      {/* RECENT TRANSACTIONS */}
      <WorkspacePanel>
        <div className="border-b border-[#E2E8F0] px-8 py-5 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Transactions
          </h2>
          <Button variant="secondary" size="sm" className="h-8 text-[10px] uppercase font-bold px-4">View All Activity</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoice ID
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Method
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                {
                  id: "INV-2401",
                  patient: "Jane Wanjiku",
                  method: "M-Pesa",
                  amount: "12,400",
                  status: "Completed",
                },
                {
                  id: "INV-2402",
                  patient: "David Otieno",
                  method: "Insurance",
                  amount: "48,900",
                  status: "Pending",
                },
                {
                  id: "INV-2403",
                  patient: "Samuel Kamau",
                  method: "NHIF Rebate",
                  amount: "5,200",
                  status: "Completed",
                },
              ].map((row) => (
                <tr
                  key={row.id}
                  className="transition hover:bg-slate-50 group"
                >
                  <td className="px-8 py-5 font-bold text-slate-900 text-sm">
                    {row.id}
                  </td>
                  <td className="px-8 py-5 text-slate-700 text-sm group-hover:text-[#3B82F6] transition-colors">
                    {row.patient}
                  </td>
                  <td className="px-8 py-5 text-slate-600 text-sm">
                    {row.method}
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-900 text-sm font-mono tracking-tight">
                    KES {row.amount}
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tight shadow-sm border",
                      row.status === 'Completed' 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-orange-50 text-orange-600 border-orange-100"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WorkspacePanel>
    </div>
  );
}

const StatItem = ({ label, value, icon: Icon, color, bgColor }: any) => (
  <div className="flex h-[120px] items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-8 shadow-sm group hover:border-[#3B82F6] transition-all hover:shadow-md cursor-default">
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>
      <h3 className={cn("mt-2 text-3xl font-bold tracking-tight font-mono", color || "text-slate-900")}>
        {value}
      </h3>
    </div>
    <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 shadow-sm ring-1 ring-black/5", bgColor || "bg-slate-100", color)}>
      <Icon className="h-7 w-7" />
    </div>
  </div>
);

