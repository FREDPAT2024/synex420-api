import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ICDCode } from '../../lib/icd-loader';

export type DiagnosisType = 'Primary' | 'Secondary' | 'Differential';

export interface SelectedDiagnosis extends ICDCode {
  type: DiagnosisType;
}

interface SelectedDiagnosesProps {
  diagnoses: SelectedDiagnosis[];
  onRemove: (code: string) => void;
  onUpdateType: (code: string, type: DiagnosisType) => void;
}

export const SelectedDiagnoses: React.FC<SelectedDiagnosesProps> = ({ diagnoses, onRemove, onUpdateType }) => {
  if (diagnoses.length === 0) {
    return (
      <div className="w-full p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/30">
        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm mb-3">
          <CheckCircle2 size={24} />
        </div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No diagnoses recorded for this encounter</p>
        <p className="text-[10px] text-slate-400 mt-1 italic">Clinical rule: At least one primary diagnosis is mandatory.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Selected Clinical Entities ({diagnoses.length})</h4>
      <div className="grid grid-cols-1 gap-3">
        {diagnoses.map((item) => (
          <div 
            key={item.code} 
            className={cn(
              "p-4 bg-white border rounded-xl flex items-center justify-between group transition-all hover:shadow-md",
              item.type === 'Primary' ? "border-[#3B82F6]/30 shadow-sm" : "border-slate-200"
            )}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center justify-center">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{item.code_system}</span>
                 <span className="font-mono text-xs font-black text-[#3B82F6] bg-blue-50 px-2 py-1 rounded border border-blue-100 min-w-[60px] text-center shadow-inner">
                   {item.code}
                 </span>
              </div>
              
              <div>
                <h5 className="text-sm font-bold text-slate-900 leading-tight">{item.description}</h5>
                <div className="flex items-center gap-2 mt-2">
                  <BadgeButton 
                    label="Primary" 
                    active={item.type === 'Primary'} 
                    onClick={() => onUpdateType(item.code, 'Primary')}
                    color="bg-blue-50 text-[#3B82F6] border-blue-100 hover:bg-blue-100"
                  />
                  <BadgeButton 
                    label="Secondary" 
                    active={item.type === 'Secondary'} 
                    onClick={() => onUpdateType(item.code, 'Secondary')}
                    color="bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  />
                  <BadgeButton 
                    label="Differential" 
                    active={item.type === 'Differential'} 
                    onClick={() => onUpdateType(item.code, 'Differential')}
                    color="bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => onRemove(item.code)}
              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const BadgeButton = ({ label, active, onClick, color }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
      active ? color : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"
    )}
  >
    {label}
  </button>
);
