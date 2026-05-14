import { useToast } from '../components/ui/Toast';
import React, { useState } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { Button } from '../components/Button';
import { 
  Stethoscope, 
  FileText, 
  History, 
  Plus, 
  Search, 
  User, 
  Clipboard, 
  Pill, 
  Activity, 
  Save, 
  Send,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';
import { DiagnosisSelector } from '../components/clinical/DiagnosisSelector';
import { SelectedDiagnoses, SelectedDiagnosis, DiagnosisType } from '../components/clinical/SelectedDiagnoses';
import { ICDCode } from '../lib/icd-loader';

export default function Consultations() {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<SelectedDiagnosis[]>([]);
  const { toast } = useToast();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleAddDiagnosis = (diagnosis: ICDCode) => {
    // Check if already selected
    if (selectedDiagnoses.find(d => d.code === diagnosis.code)) return;

    const newDiagnosis: SelectedDiagnosis = {
      ...diagnosis,
      type: selectedDiagnoses.length === 0 ? 'Primary' : 'Secondary'
    };
    setSelectedDiagnoses(prev => [...prev, newDiagnosis]);
    setSaveError(null);
  };

  const handleRemoveDiagnosis = (code: string) => {
    setSelectedDiagnoses(prev => prev.filter(d => d.code !== code));
  };

  const handleUpdateType = (code: string, type: DiagnosisType) => {
    setSelectedDiagnoses(prev => prev.map(d => 
      d.code === code ? { ...d, type } : d
    ));
  };

  const handleSave = () => {
    const hasPrimary = selectedDiagnoses.some(d => d.type === 'Primary');
    if (!hasPrimary) {
      setSaveError("Clinical Error: At least one diagnosis must be marked as 'Primary' before saving.");
      return;
    }
    
    // Simulate save logic
    toast("success", "Clinical Record Saved", "Record signed and encrypted successfully.");
    setSaveError(null);
  };

  return (
    <div className="w-full h-full space-y-8 animate-in fade-in duration-700 pb-20">
      <PageHeader 
        title="Consultation Terminal" 
        subtitle="MOH-Kenya Standardized Electronic Health Record (SOAP 2.1)"
        actions={
          <>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <History className="mr-2 h-4 w-4 text-slate-400" /> Patient History
            </button>
            <button 
              onClick={handleSave}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-600 active:scale-95"
            >
              <Save className="mr-2 h-4 w-4" /> Sign & Encrypt Record
            </button>
          </>
        }
      />

      {/* PATIENT HEADER - FULL WIDTH */}
      <WorkspacePanel className="bg-[#0F172A] border-none shadow-2xl overflow-hidden relative group">
        <div className="p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-[#3B82F6] rounded-3xl flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-blue-500/20 ring-4 ring-slate-800 transition-transform group-hover:scale-105">
               FK
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white tracking-tight">Fredrick K. Mutua</h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest rounded-full border border-emerald-500/30">VALIDATED ID</span>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="text-slate-600">Patient ID:</span> 
                  <span className="font-mono text-[#3B82F6]">SYN-8921-26</span>
                </p>
                <div className="h-1 w-1 bg-slate-700 rounded-full"></div>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="text-slate-600">Vitals:</span> 
                  <span className="text-white">Normal (128/84)</span>
                </p>
                <div className="h-1 w-1 bg-slate-700 rounded-full"></div>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 text-red-400">
                  <AlertCircle size={14} /> 
                  Allergy: Penicillin
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
             <SnapshotDataDark label="Visit Type" value="GP Consultation" />
             <SnapshotDataDark label="Scheme" value="NHIF Corporate" />
             <SnapshotDataDark label="Duration" value="14:22" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
      </WorkspacePanel>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          {/* DIAGNOSIS SECTION - FULL WIDTH OF CONTENT AREA */}
          <WorkspacePanel>
            <div className="border-b border-slate-100 px-8 py-6 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <Database className="text-[#3B82F6]" size={20} />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Clinical Diagnosis & Coding</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Protocol:</span>
                <span className="px-2 py-0.5 bg-blue-50 text-[#3B82F6] text-[9px] font-black tracking-widest rounded uppercase border border-blue-100 italic">ICD-10/11 Dual Coding</span>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500">Search ICD database for diagnosis:</p>
                <DiagnosisSelector onSelect={handleAddDiagnosis} />
              </div>

              <div className="pt-4">
                <SelectedDiagnoses 
                  diagnoses={selectedDiagnoses} 
                  onRemove={handleRemoveDiagnosis}
                  onUpdateType={handleUpdateType}
                />
              </div>

              {saveError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold animate-pulse">
                  <AlertCircle size={18} />
                  {saveError}
                </div>
              )}
            </div>
          </WorkspacePanel>

          {/* SOAP CLINICAL NOTES */}
          <WorkspacePanel>
            <div className="border-b border-slate-100 px-8 py-6 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <Clipboard className="text-[#3B82F6]" size={20} />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">SOAP Documentation</h3>
              </div>
              <button className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline flex items-center gap-1">
                <FileText size={12} /> Load Clinical Template
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SOAPSection label="Subjective" placeholder="Patient's reports and symptoms..." />
                <SOAPSection label="Objective" placeholder="Clinical findings and examination data..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SOAPSection label="Assessment" placeholder="Clinical reasoning and diagnostic summary..." />
                <SOAPSection label="Plan" placeholder="Treatment strategy and follow-up plan..." />
              </div>
            </div>
          </WorkspacePanel>

          {/* PRESCRIPTION & LABS RE-ORDERED */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WorkspacePanel>
              <div className="border-b border-slate-100 px-8 py-5 bg-blue-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Pill className="text-[#3B82F6]" size={18} />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Electronic Prescription</h3>
                </div>
              </div>
              <div className="p-8 flex flex-col gap-4">
                <button className="w-full h-12 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all flex items-center justify-center gap-2 group">
                  <Plus size={16} className="transition-transform group-hover:rotate-90" /> Add New Medication
                </button>
                <div className="space-y-3">
                  <MedicationEntry name="Paracetamol 500mg" dose="1 tab x 3 x 5 Days" />
                  <MedicationEntry name="Cetirizine 10mg" dose="1 cap x 1 x 3 Days" />
                </div>
              </div>
            </WorkspacePanel>

            <WorkspacePanel>
              <div className="border-b border-slate-100 px-8 py-5 bg-emerald-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="text-emerald-500" size={18} />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Diagnostic Requests</h3>
                </div>
              </div>
              <div className="p-8 flex flex-col gap-4">
                <button className="w-full h-12 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center justify-center gap-2 group">
                  <Plus size={16} className="transition-transform group-hover:rotate-90" /> Request New Lab/X-Ray
                </button>
                <div className="space-y-3">
                  <TestEntry name="Full Hemogram (CBC)" status="Pending" />
                </div>
              </div>
            </WorkspacePanel>
          </div>
        </div>

        {/* WORKFLOW GUIDANCE SIDEBAR */}
        <div className="space-y-8">
          <WorkspacePanel className="p-8 space-y-6">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4 flex items-center justify-between">
              Clinical Support
              <ShieldAlert size={18} className="text-[#3B82F6]" />
            </h3>
            <div className="space-y-4">
              <GuideItem label="ICD Browser" icon={Search} color="bg-slate-100 text-slate-600" />
              <GuideItem label="Interaction Checker" icon={ShieldAlert} color="bg-orange-50 text-orange-600" />
              <GuideItem label="Specialist Referral" icon={Send} color="bg-blue-50 text-[#3B82F6]" />
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Decision Aids:</p>
                <button className="w-full h-10 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Launch BMJ Best Practice</button>
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel className="p-8 space-y-6">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
              <HistoryVisit date="12 Apr 2026" diagnosis="Upper Respiratory Infection" />
              <HistoryVisit date="04 Feb 2026" diagnosis="Hypertension Checkup" />
              <HistoryVisit date="22 Oct 2025" diagnosis="Malaria Treatment" />
            </div>
            <button className="w-full h-10 border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
              Load Longitudinal EMR
            </button>
          </WorkspacePanel>
        </div>
      </div>
    </div>
  );
}

const SnapshotDataDark = ({ label, value }: any) => (
  <div className="px-5 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl shadow-inner min-w-[140px]">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-white tracking-tight">{value}</p>
  </div>
);

const SOAPSection = ({ label, placeholder }: any) => (
  <div className="space-y-3">
     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
       <div className="h-2 w-2 bg-[#3B82F6] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
       {label} Segment
     </label>
     <textarea 
       className="w-full h-32 bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 shadow-sm transition-all resize-none"
       placeholder={placeholder}
     ></textarea>
  </div>
);

const MedicationEntry = ({ name, dose }: any) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl group transition-all hover:bg-blue-50/30 hover:shadow-md hover:border-blue-100">
     <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-blue-50 text-[#3B82F6] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
           <Pill size={20} />
        </div>
        <div>
           <p className="text-sm font-bold text-slate-900">{name}</p>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{dose}</p>
        </div>
     </div>
     <button className="text-slate-200 hover:text-red-500 transition-colors">
        <MoreVertical size={16} />
     </button>
  </div>
);

const TestEntry = ({ name, status }: any) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl group transition-all hover:bg-emerald-50/30 hover:shadow-md hover:border-emerald-100">
     <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
           <Activity size={20} />
        </div>
        <p className="text-sm font-bold text-slate-900">{name}</p>
     </div>
     <span className="text-[9px] font-black px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-400 uppercase tracking-widest shadow-sm">{status}</span>
  </div>
);

const GuideItem = ({ label, icon: Icon, color }: any) => (
  <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 text-left group">
     <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm shadow-black/5", color)}>
        <Icon size={18} />
     </div>
     <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{label}</span>
  </button>
);

const HistoryVisit = ({ date, diagnosis }: any) => (
  <div className="flex items-start gap-4 group cursor-pointer relative z-10 pl-1">
     <div className="h-1.5 w-1.5 bg-[#3B82F6] rounded-full mt-[6px] shrink-0 group-hover:scale-150 transition-all shadow-[0_0_8px_rgba(59,130,246,0.6)] ring-4 ring-white"></div>
     <div className="pb-4">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{date}</p>
        <p className="text-xs font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-[#3B82F6] transition-colors">{diagnosis}</p>
     </div>
  </div>
);

