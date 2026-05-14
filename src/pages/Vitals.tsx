import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { useToast } from '../components/ui/Toast';
import { rpmApi, patientApi } from '../lib/apiClient';
import {
  HeartPulse, Plus, RefreshCw, Search, Activity,
  AlertTriangle, CheckCircle2, Thermometer, Loader2, Send, Eye, Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

const EMPTY = {
  patientId: '', bp: '', hr: '', temp: '', spO2: '',
  rbs: '', weight: '', height: '', pain: '', notes: '', device: 'Manual',
};

const DEVICES = ['Manual', 'Pulse Oximeter', 'Digital BP Monitor', 'IoT Sensor', 'Wearable', 'Other'];

export default function Vitals() {
  const { toast } = useToast();
  const [vitals, setVitals] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'alerts'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [v, a, p] = await Promise.all([
        rpmApi.list(),
        rpmApi.alerts(),
        patientApi.list(),
      ]);
      setVitals(v); setAlerts(a); setPatients(p);
    } catch (err: any) {
      toast('error', 'Failed to load vitals', err.message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const calcBmi = () => {
    if (form.weight && form.height) {
      const h = Number(form.height) / 100;
      return (Number(form.weight) / (h * h)).toFixed(1);
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientId) { toast('error', 'Select a patient first', ''); return; }
    setSubmitting(true);
    try {
      const res = await rpmApi.submit(form);
      if (res.alerts?.length > 0) {
        toast('warning', `${res.alerts.length} Clinical Alert(s)`, res.alerts.join(' | '));
      } else {
        toast('success', 'Vitals Recorded', 'Reading saved to patient record.');
      }
      setForm(EMPTY); setShowForm(false); load();
    } catch (err: any) {
      toast('error', 'Failed to save vitals', err.message);
    } finally { setSubmitting(false); }
  };

  const resolveAlert = async (id: string) => {
    try {
      await rpmApi.resolveAlert(id);
      toast('success', 'Alert Resolved', 'Marked as reviewed.');
      load();
    } catch (err: any) {
      toast('error', 'Failed to resolve', err.message);
    }
  };

  const filtered = vitals.filter(v =>
    !search ||
    v.patientId?.toLowerCase().includes(search.toLowerCase()) ||
    patients.find(p => p.patientId === v.patientId && `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()))
  );

  const inp = 'w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]';

  const patientName = (id: string) => {
    const p = patients.find(x => x.patientId === id);
    return p ? `${p.firstName} ${p.lastName}` : id;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="RPM Vitals" subtitle="Remote Patient Monitoring — Record and track clinical vitals with auto-alerting"
        icon={HeartPulse} iconColor="text-rose-600" iconBg="bg-rose-50"
        actions={
          <div className="flex gap-3">
            <button onClick={load} className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setShowForm(v => !v)}
              className="h-10 flex items-center gap-2 px-5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-sm">
              <Plus size={16} /> Record Vitals
            </button>
          </div>
        }
      />

      <StatsBar items={[
        { label: 'Total Readings', value: vitals.length, icon: Activity, color: 'text-slate-700', bgColor: 'bg-slate-100' },
        { label: 'Active Alerts', value: alerts.length, icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { label: 'Patients Monitored', value: new Set(vitals.map(v => v.patientId)).size, icon: HeartPulse, color: 'text-rose-600', bgColor: 'bg-rose-50' },
        { label: 'Today\'s Readings', value: vitals.filter(v => new Date(v.recordedAt).toDateString() === new Date().toDateString()).length, icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
      ]} />

      {/* Vitals Form */}
      {showForm && (
        <WorkspacePanel title="Record Patient Vitals" icon={Plus}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Patient *</label>
                <select value={form.patientId} onChange={e => set('patientId', e.target.value)} required className={inp}>
                  <option value="">— Select Patient —</option>
                  {patients.map(p => <option key={p.patientId} value={p.patientId}>{p.firstName} {p.lastName} ({p.patientId})</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Device</label>
                <select value={form.device} onChange={e => set('device', e.target.value)} className={inp}>
                  {DEVICES.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {([
                ['Blood Pressure (mmHg)', 'bp', '120/80', 'e.g. 120/80'],
                ['Heart Rate (bpm)', 'hr', '72', '50–110'],
                ['Temperature (°C)', 'temp', '36.8', '36.0–38.5'],
                ['SpO2 (%)', 'spO2', '98', '94–100'],
                ['RBS (mmol/L)', 'rbs', '5.5', '3.9–11.1'],
                ['Weight (kg)', 'weight', '70', ''],
                ['Height (cm)', 'height', '170', ''],
                ['Pain Score (0–10)', 'pain', '0', '0 = no pain'],
              ] as [string, string, string, string][]).map(([label, key, ph, hint]) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                  <input value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                    placeholder={ph} className={inp} />
                  {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
                </div>
              ))}
            </div>

            {form.weight && form.height && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-sm">
                <Activity size={14} className="text-blue-500" />
                <span className="font-medium text-blue-700">Calculated BMI: <strong>{calcBmi()}</strong></span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Clinical Notes</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
                placeholder="Any observations or context for this reading..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] resize-none" />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="h-11 flex items-center gap-2 px-8 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 disabled:opacity-60 shadow-sm">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? 'Saving...' : 'Save Vitals'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); }}
                className="h-11 px-6 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </WorkspacePanel>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-100">
        {([['all', 'All Readings'], ['alerts', `Unresolved Alerts (${alerts.length})`]] as [string, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key as any)}
            className={cn('px-5 py-3 text-sm font-bold border-b-2 transition-colors',
              activeTab === key ? 'border-rose-500 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-700')}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'alerts' ? (
        <WorkspacePanel title="Unresolved Clinical Alerts" icon={Bell}>
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="animate-spin text-rose-500" size={28} /></div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-400" />
              <p className="font-bold text-emerald-600">All clear — no active alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map(a => (
                <div key={a._id} className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                  <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm">{patientName(a.patientId)} <span className="text-slate-400 font-normal">· {a.patientId}</span></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {a.alerts.map((alert: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-orange-100 text-orange-800 text-[11px] font-bold rounded-full">{alert}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{new Date(a.recordedAt).toLocaleString('en-KE')} · Recorded by {a.recordedBy}</p>
                  </div>
                  <button onClick={() => resolveAlert(a._id)}
                    className="shrink-0 h-9 px-4 rounded-xl bg-white border border-orange-200 text-orange-700 text-xs font-bold hover:bg-orange-50 transition-all">
                    Resolve
                  </button>
                </div>
              ))}
            </div>
          )}
        </WorkspacePanel>
      ) : (
        <WorkspacePanel title="Vitals Register" icon={Activity}>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient ID or name..."
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3B82F6]" />
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-rose-500" size={32} /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <HeartPulse size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No vitals recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Patient', 'BP', 'HR', 'Temp °C', 'SpO2 %', 'RBS', 'Device', 'Alerts', 'Recorded', 'By'].map(h => (
                      <th key={h} className="text-left pb-3 pr-4 text-[11px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(v => (
                    <tr key={v._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-slate-900">{patientName(v.patientId)}</p>
                        <p className="text-[10px] text-slate-400">{v.patientId}</p>
                      </td>
                      <td className="py-3 pr-4 font-mono text-sm font-bold text-slate-700">{v.bp || '—'}</td>
                      <td className="py-3 pr-4 font-mono text-sm">{v.hr || '—'}</td>
                      <td className="py-3 pr-4 font-mono text-sm">{v.temp || '—'}</td>
                      <td className="py-3 pr-4 font-mono text-sm">{v.spO2 || '—'}</td>
                      <td className="py-3 pr-4 font-mono text-sm">{v.rbs || '—'}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{v.device}</td>
                      <td className="py-3 pr-4">
                        {v.alerts?.length > 0 ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-full">
                            <AlertTriangle size={10} /> {v.alerts.length} alert{v.alerts.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Normal</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-400 whitespace-nowrap">{new Date(v.recordedAt).toLocaleString('en-KE')}</td>
                      <td className="py-3 text-xs text-slate-400">{v.recordedBy?.split('@')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </WorkspacePanel>
      )}
    </div>
  );
}
