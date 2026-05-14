import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { 
  Zap, 
  Search, 
  Share2, 
  ShieldCheck, 
  Activity, 
  Wifi,
  Cloud,
  Terminal,
  Code2,
  FileCode2,
  Lock,
  RefreshCw,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Interoperability() {
  const [activeTab, setActiveTab] = useState<'feeds' | 'fhir' | 'hie'>('feeds');

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Interoperability Terminal" 
        subtitle="HL7 v2.x Message Routing, FHIR R4 APIs, and National HIE Connectivity."
        actions={
          <div className="flex gap-4">
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <Terminal className="mr-2 h-4 w-4" /> Message Debugger
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
              <RefreshCw className="mr-2 h-4 w-4" /> Restart Gateway
            </button>
          </div>
        }
      />

      <StatsBar>
        <StatItem label="Active Messages" value="1,240/hr" sub="HL7 v2.5 / ADT / ORU" icon={Zap} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatItem label="FHIR API Requests" value="8.4k" sub="99.9% Success Rate" icon={Code2} color="text-[#3B82F6]" bgColor="bg-blue-50" />
        <StatItem label="Security Events" value="0" sub="All handshakes valid" icon={Lock} color="text-slate-700" bgColor="bg-slate-100" />
        <StatItem label="HIE Availability" value="Connected" sub="MOH Health Gateway" icon={Globe} color="text-blue-600" bgColor="bg-blue-50" />
      </StatsBar>

      <div className="flex gap-4 border-b border-slate-200">
        <TabButton active={activeTab === 'feeds'} onClick={() => setActiveTab('feeds')} label="HL7 Messaging Streams" icon={Activity} />
        <TabButton active={activeTab === 'fhir'} onClick={() => setActiveTab('fhir')} label="FHIR R4 Resources" icon={FileCode2} />
        <TabButton active={activeTab === 'hie'} onClick={() => setActiveTab('hie')} label="HIE & External Nodes" icon={Globe} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
           <WorkspacePanel>
              <div className="border-b border-slate-100 px-8 py-6 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-3">
                    <Activity className="text-[#3B82F6]" size={20} />
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active MLLP Streams</h3>
                 </div>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    Real-time ingestion active
                 </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Feed Node</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Direction</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Current Load</th>
                      <th className="px-8 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { node: "LIS-Gateway-01", proto: "HL7 v2.5.1", dir: "INBOUND", load: "12 msg/sec", status: "Healthy" },
                      { node: "RIS-PACS-Bridge", proto: "DICOM C-FIND", dir: "BIDIRECTIONAL", load: "4 req/sec", status: "Healthy" },
                      { node: "External-Lab-Node", proto: "HL7 v2.3", dir: "OUTBOUND", load: "Idle", status: "Waiting" },
                      { node: "MOH-HIE-Registry", proto: "FHIR R4", dir: "OUTBOUND", load: "2 msg/sec", status: "Healthy" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-all font-mono">
                        <td className="px-8 py-5 text-sm font-black text-slate-700">{row.node}</td>
                        <td className="px-8 py-5 text-xs text-slate-500 font-bold">{row.proto}</td>
                        <td className="px-8 py-5">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black tracking-tight border",
                            row.dir === 'INBOUND' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>{row.dir}</span>
                        </td>
                        <td className="px-8 py-5 text-xs text-slate-600 font-black">{row.load}</td>
                        <td className="px-8 py-5 text-right">
                           <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">View Logs</button>
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
                FHIR R4 Capability
                <FileCode2 size={18} className="text-[#3B82F6]" />
              </h3>
              <div className="space-y-4">
                 <ResourceItem label="Patient" count="1.2M" />
                 <ResourceItem label="Observation" count="8.4M" />
                 <ResourceItem label="MedicationRequest" count="450k" />
                 <ResourceItem label="DiagnosticReport" count="320k" />
              </div>
              <button className="w-full h-10 border border-slate-200 text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Generate Sandbox Key
              </button>
           </WorkspacePanel>

           <WorkspacePanel className="p-8 space-y-6 bg-[#0F172A] border-none text-white overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="text-[#3B82F6]" />
                  <h3 className="text-lg font-black uppercase tracking-tight">MOH Proxy Hub</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">System is securely synchronized with the National Shared Health Record Registry.</p>
                <div className="pt-4 space-y-4">
                   <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold">Latency</span>
                      <span className="text-[#3B82F6] font-black">22ms</span>
                   </div>
                   <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="w-3/4 bg-[#3B82F6] h-full rounded-full"></div>
                   </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 blur-3xl -mr-16 -mt-16"></div>
           </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const ResourceItem = ({ label, count }: any) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
     <span className="text-xs font-black text-slate-900 font-mono tracking-tighter">{label}</span>
     <span className="text-[10px] font-bold text-slate-400">{count} records</span>
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
