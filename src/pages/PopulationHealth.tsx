import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { useToast } from '../components/ui/Toast';
import { careGapApi, patientApi } from '../lib/apiClient';
import { Heart, RefreshCw, AlertTriangle, CheckCircle2, Clock, Loader2, Send, Users, Activity, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const MEASURE_CODES = ['HBA1C','FOOT_EXAM','EYE_EXAM','BP_CHECK','STATIN_RX','DM_EDU'];
const MEASURE_LABELS: Record<string,string> = { HBA1C:'HbA1c Test', FOOT_EXAM:'Foot Examination', EYE_EXAM:'Retinal / Eye Screening', BP_CHECK:'Blood Pressure Check', STATIN_RX:'Statin Review', DM_EDU:'Diabetes Education' };
const PRIORITY_COLORS: Record<string,string> = { High:'bg-red-50 text-red-700 border-red-100', Medium:'bg-orange-50 text-orange-700 border-orange-100', Low:'bg-slate-50 text-slate-600 border-slate-100' };

export default function PopulationHealth() {
  const { toast } = useToast();
  const [gaps, setGaps] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecord, setShowRecord] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState<string|null>(null);
  const [recordForm, setRecordForm] = useState({ patientId:'', measureCode:'', notes:'', result:'', doneAt:'' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [g,s,p] = await Promise.all([careGapApi.all(), careGapApi.stats(), patientApi.list()]);
      setGaps(g); setStats(s); setPatients(p);
    } catch(err:any) { toast('error','Failed to load care gaps',err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await careGapApi.record(recordForm);
      toast('success','Care Measure Recorded', MEASURE_LABELS[recordForm.measureCode] + ' saved.');
      setRecordForm({ patientId:'', measureCode:'', notes:'', result:'', doneAt:'' });
      setShowRecord(false); load();
    } catch(err:any) { toast('error','Failed to record',err.message); }
    finally { setSubmitting(false); }
  };

  const inp = 'w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="Care Gap — Diabetes Programme"
        subtitle="Identify diabetic patients missing key care measures"
        icon={Heart} iconColor="text-rose-600" iconBg="bg-rose-50"
        actions={
          <div className="flex gap-3">
            <button onClick={load} className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setShowRecord(v => !v)}
              className="h-10 flex items-center gap-2 px-5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-sm">
              <Plus size={16} /> Record Care Measure
            </button>
          </div>
        }
      />

      {stats && (
        <StatsBar items={[
          { label:'Diabetic Patients', value:stats.diabeticPatients, icon:Users, color:'text-slate-700', bgColor:'bg-slate-100' },
          { label:'With Records', value:stats.patientsWithRecords, icon:CheckCircle2, color:'text-emerald-600', bgColor:'bg-emerald-50' },
          { label:'Patients With Gaps', value:gaps.length, icon:AlertTriangle, color:'text-orange-600', bgColor:'bg-orange-50' },
          { label:'High Priority Gaps', value:gaps.reduce((s,g)=>s+g.highPriorityGaps,0), icon:Activity, color:'text-red-600', bgColor:'bg-red-50' },
        ]} />
      )}

      {showRecord && (
        <WorkspacePanel title="Record Care Measure Completed" icon={Plus}>
          <form onSubmit={handleRecord} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Patient *</label>
                <select value={recordForm.patientId} onChange={e => setRecordForm(f=>({...f,patientId:e.target.value}))} required className={inp}>
                  <option value="">— Select Patient —</option>
                  {patients.map(p => <option key={p.patientId} value={p.patientId}>{p.firstName} {p.lastName} ({p.patientId})</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Care Measure *</label>
                <select value={recordForm.measureCode} onChange={e => setRecordForm(f=>({...f,measureCode:e.target.value}))} required className={inp}>
                  <option value="">— Select Measure —</option>
                  {MEASURE_CODES.map(c => <option key={c} value={c}>{MEASURE_LABELS[c]}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Date Done</label>
                <input type="date" value={recordForm.doneAt} onChange={e => setRecordForm(f=>({...f,doneAt:e.target.value}))} className={inp} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Result / Value</label>
                <input value={recordForm.result} onChange={e => setRecordForm(f=>({...f,result:e.target.value}))} placeholder="e.g. HbA1c: 7.2%" className={inp} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Notes</label>
                <input value={recordForm.notes} onChange={e => setRecordForm(f=>({...f,notes:e.target.value}))} placeholder="Clinical notes..." className={inp} />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="h-11 flex items-center gap-2 px-8 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 disabled:opacity-60 shadow-sm">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? 'Saving...' : 'Record Measure'}
              </button>
              <button type="button" onClick={() => setShowRecord(false)}
                className="h-11 px-6 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </WorkspacePanel>
      )}

      <WorkspacePanel title="Patients With Care Gaps" icon={AlertTriangle}>
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-rose-500" size={32} /></div>
        ) : gaps.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400" />
            <p className="font-bold text-emerald-600 text-lg">No care gaps detected</p>
            <p className="text-sm mt-1">All diabetic patients are up to date.</p>
            {stats?.diabeticPatients === 0 && (
              <p className="text-xs mt-3 text-orange-600 font-medium bg-orange-50 border border-orange-100 rounded-xl p-3 max-w-sm mx-auto">
                Tip: Tag patients with condition "Diabetes" or ICD code E11/E10 during registration to enable gap analysis.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {gaps.map(patient => (
              <div key={patient.patientId} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button onClick={() => setExpanded(expanded === patient.patientId ? null : patient.patientId)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-black text-sm shrink-0">
                      {patient.patientName.split(' ').map((n:string)=>n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{patient.patientName}</p>
                      <p className="text-xs text-slate-400">{patient.patientId} · Last contact: {patient.lastContact ? new Date(patient.lastContact).toLocaleDateString('en-KE') : 'Never'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {patient.highPriorityGaps > 0 && (
                      <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 text-[10px] font-black rounded-full">{patient.highPriorityGaps} HIGH</span>
                    )}
                    <span className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-black rounded-full">{patient.totalGaps} gap{patient.totalGaps !== 1 ? 's' : ''}</span>
                    <Clock size={16} className="text-slate-400" />
                  </div>
                </button>
                {expanded === patient.patientId && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-3 animate-in slide-in-from-top-1">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Outstanding Care Measures</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {patient.gaps.map((gap:any) => (
                        <div key={gap.code} className={cn('p-4 rounded-xl border', PRIORITY_COLORS[gap.priority])}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-bold text-sm">{gap.label}</p>
                            <span className={cn('px-2 py-0.5 text-[9px] font-black rounded-full border', PRIORITY_COLORS[gap.priority])}>{gap.priority}</span>
                          </div>
                          <p className="text-xs font-bold">⚠ Overdue by {gap.overdueDays} day{gap.overdueDays !== 1 ? 's' : ''}</p>
                          <p className="text-xs opacity-70 mt-1">Last done: {gap.lastDone ? new Date(gap.lastDone).toLocaleDateString('en-KE') : 'Never'}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setRecordForm(f=>({...f,patientId:patient.patientId})); setShowRecord(true); setExpanded(null); }}
                      className="mt-2 h-9 flex items-center gap-2 px-4 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm">
                      <Plus size={13} /> Record Measure for {patient.patientName.split(' ')[0]}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </WorkspacePanel>

      {stats?.gapsByMeasure?.length > 0 && (
        <WorkspacePanel title="Care Measure Coverage" icon={Activity}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.gapsByMeasure.map((m:any) => (
              <div key={m.code} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-2xl font-black text-slate-900">{m.totalRecorded}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </WorkspacePanel>
      )}
    </div>
  );
}
