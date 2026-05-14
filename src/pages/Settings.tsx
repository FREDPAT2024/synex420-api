import React from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { 
  Users, 
  ShieldCheck, 
  Lock, 
  Settings as SettingsIcon, 
  Plus, 
  MoreVertical, 
  Search,
  CheckCircle2,
  XCircle,
  Database,
  Globe,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings() {
  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Terminal Settings" 
        subtitle="Configuration of system-wide clinical protocols and user management."
        actions={
          <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
            Apply Global Changes
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SETTINGS NAVIGATION */}
        <div className="lg:col-span-1 space-y-4">
           <NavCard icon={Users} label="User Management" active />
           <NavCard icon={Lock} label="Security & RBAC" />
           <NavCard icon={Database} label="System Database" />
           <NavCard icon={Globe} label="Localization & API" />
           <NavCard icon={Bell} label="Notification Rules" />
        </div>

        {/* SETTINGS CONTENT */}
        <div className="lg:col-span-3 space-y-8">
           <WorkspacePanel>
              <div className="border-b border-[#E2E8F0] px-8 py-6 flex items-center justify-between bg-slate-50/30">
                 <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active User Terminal</h2>
                    <p className="text-sm text-slate-500 mt-1">Management of clinical staff access and digital signatures.</p>
                 </div>
                 <button className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all gap-2">
                    <Plus size={14} /> Provision New User
                 </button>
              </div>

              <div className="p-0">
                 <div className="overflow-x-auto">
                    <table className="w-full">
                       <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <tr>
                             <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Officer</th>
                             <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Role / Designation</th>
                             <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Auth</th>
                             <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Access State</th>
                             <th className="px-8 py-4 text-center"></th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 bg-white">
                          {[
                            { name: "Dr. Daniel Kiama", role: "CEO / Chief Medical Officer", auth: "Level 4 (Full)", status: "Active" },
                            { name: "Nurse Sarah Wambui", role: "Head of Nursing", auth: "Level 2 (Ops)", status: "Active" },
                            { name: "Kevin Otieno", role: "Finance Manager", auth: "Level 4 (Ops)", status: "Active" },
                            { name: "Mercy Achieng", role: "General Practitioner", auth: "Level 2 (Ops)", status: "Suspended" },
                            { name: "John Musembi", role: "Lab Technician", auth: "Level 1 (Data)", status: "Active" }
                          ].map((user, i) => (
                            <tr key={i} className="group hover:bg-slate-50 transition-all">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all shadow-sm">
                                        {user.name.charAt(4)}
                                     </div>
                                     <span className="text-sm font-bold text-slate-900">{user.name}</span>
                                  </div>
                               </td>
                               <td className="px-8 py-5 text-sm font-medium text-slate-500">{user.role}</td>
                               <td className="px-8 py-5">
                                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black tracking-widest rounded-full uppercase border border-slate-200">{user.auth}</span>
                               </td>
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-2">
                                     {user.status === 'Active' ? (
                                       <CheckCircle2 className="text-emerald-500" size={14} />
                                     ) : (
                                       <XCircle className="text-red-500" size={14} />
                                     )}
                                     <span className={cn("text-[10px] font-black uppercase tracking-widest", user.status === 'Active' ? "text-emerald-600" : "text-red-600")}>
                                        {user.status}
                                     </span>
                                  </div>
                               </td>
                               <td className="px-8 py-5 text-center">
                                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
                                     <MoreVertical size={16} />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 bg-slate-900 border-none relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="text-[#3B82F6]" size={24} />
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Security Audit Protocol</h3>
                 </div>
                 <p className="text-sm text-slate-400 font-medium">All user modifications and access state changes are logged in the Synex420 Global Audit Trail. Rule 4.12 enforcement is active.</p>
                 <button className="h-10 px-6 bg-[#3B82F6] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                    View Access Logs
                 </button>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <SettingsIcon size={120} className="text-white" />
              </div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const NavCard = ({ icon: Icon, label, active }: any) => (
  <button className={cn(
    "w-full flex items-center h-14 px-6 rounded-2xl transition-all border group",
    active 
      ? "bg-[#3B82F6] border-[#3B82F6] text-white shadow-xl shadow-blue-500/20" 
      : "bg-white border-slate-200 text-slate-500 hover:border-[#3B82F6] hover:text-[#3B82F6]"
  )}>
     <Icon size={20} className={cn("mr-4", active ? "text-white" : "text-slate-300 group-hover:text-[#3B82F6]")} />
     <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
  </button>
);
