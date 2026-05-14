import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { StatsBar } from '../components/workspace/StatsBar';
import { useToast } from '../components/ui/Toast';
import { nhifApi, patientApi } from '../lib/apiClient';
import {
  ShieldCheck, Plus, RefreshCw, Search, CheckCircle2,
  XCircle, Clock, DollarSign, FileText, Loader2, Send, Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

const SCHEMES = ['NHIF', 'SHA', 'NHIF-Civil Servant', 'NHIF-Linda Mama', 'Private Insurance'];
const ADMISSION_TYPES = ['Outpatient', 'Inpatient', 'Emergency', 'Maternity'];
const WARD_TYPES = ['General', 'Private', 'ICU', 'HDU', 'Maternity'];
const STATUS_COLORS: Record<string, string> = {
  'Submitted': 'bg-blue-50 text-blue-700 border-blue-100',
  'Under Review': 'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Partially Approved': 'bg-teal-50 text-teal-700 border-teal-100',
  'Rejected': 'bg-red-50 text-red-700 border-red-100',
  'Paid': 'bg-purple-50 text-purple-700 border-purple-100',
};

const EMPTY = {
  patientId: '', patientName: '', nhifNumber: '', membershipNo: '',
  scheme: 'NHIF', facilityCode: '', facilityName: '',
  diagnosisCodes: '', procedureCodes: '',
  serviceDate: '', dischargeDate: '',
  claimedAmount: '', admissionType: 'Outpatient', wardType: 'General',
  attendingDoctor: '',
  items: [{ description: '', code: '', amount: '' }],
};

export default function Insurance() {
  const { toast } = useToast();
  const [claims, setClaims] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, s, p] = await Promise.all([
        nhifApi.list(filterStatus ? { status: filterStatus } : undefined),
        nhifApi.stats(),
        patientApi.list(),
      ]);
      setClaims(c); setStats(s); setPatients(p);
    } catch (err: any) {
      toast('error', 'Failed to load', err.message);
    } finally { setLoading(false); }
  }, [filterStatus]);

  useEffect(() => { load(); }, [load]);

  const totalFromItems = form.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = patients.find(x => x.patientId === e.target.value);
    if (p) setForm(f => ({ ...f, patientId: p.patientId, patientName: `${p.firstName} ${p.lastName}` }));
  };

  const handleItemChange = (idx: number, field: string, val: string) =>
    setForm(f => ({ ...f, items: f.items.map((item, i) => i === idx ? { ...item, [field]: val } : item) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await nhifApi.submit({
        ...form,
        diagnosisCodes: form.diagnosisCodes.split(',').map(s => s.trim()).filter(Boolean),
        procedureCodes: form.procedureCodes.split(',').map(s => s.trim()).filter(Boolean),
        claimedAmount: Number(form.claimedAmount) || totalFromItems,
        items: form.items.filter(i => i.description && i.amount),
      });
      toast('success', 'Claim Submitted', `Claim ID: ${res.claimId}`);
      setForm(EMPTY); setShowForm(false); load();
    } catch (err: any) {
      toast('error', 'Submission Failed', err.message);
    } finally { setSubmitting(false); }
  };

  const filtered = claims.filter(c =>
    !search ||
    c.claimId?.toLowerCase().includes(search.toLowerCase()) ||
    c.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    c.nhifNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const inp = 'w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader title="NHIF / SHA Claims" subtitle="Submit and track insurance claims — NHIF · SHA · Linda Mama"
        icon={ShieldCheck} iconColor="text-emerald-600" iconBg="bg-emerald-50"
        actions={
          <div className="flex gap-3">
            <button onClick={load} className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setShowForm(v => !v)}
              className="h-10 flex items-center gap-2 px-5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-sm">
              <Plus size={16} /> New Claim
            </button>
          </div>
        }
      />

      {stats && (
        <StatsBar items={[
          { label: 'Total Claims', value: stats.total, icon: FileText, color: 'text-slate-700', bgColor: 'bg-slate-100' },
          { label: 'Pending', value: stats.submitted, icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Approved', value: stats.approved, icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
          { label: 'Paid', value: stats.paid, icon: DollarSign, color: 'text-purple-600', bgColor: 'bg-purple-50' },
          { label: 'Total Claimed', value: `KES ${((stats.totalClaimedAmount || 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-teal-600', bgColor: 'bg-teal-50' },
        ]} />
      )}

      {showForm && (
        <WorkspacePanel title="Submit New NHIF / SHA Claim" icon={Plus}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Patient *</label>
                <select onChange={handlePatientSelect} required className={inp}>
                  <option value="">— Select Patient —</option>
                  {patients.map(p => <option key={p.patientId} value={p.patientId}>{p.firstName} {p.lastName} ({p.patientId})</option>)}
                </select>
              </div>
              {([
                ['NHIF / SHA Number *', 'nhifNumber', '12345678'],
                ['Membership No', 'membershipNo', 'NH-001234'],
                ['Facility Code *', 'facilityCode', 'KNH001'],
                ['Facility Name', 'facilityName', 'Kenyatta National Hospital'],
                ['Attending Doctor', 'attendingDoctor', 'Dr. Otieno'],
              ] as [string, string, string][]).map(([label, key, ph]) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                  <input value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                    placeholder={ph} required={label.includes('*')} className={inp} />
                </div>
              ))}
              {([
                ['Scheme', 'scheme', SCHEMES],
                ['Admission Type', 'admissionType', ADMISSION_TYPES],
                ['Ward Type', 'wardType', WARD_TYPES],
              ] as [string, string, string[]][]).map(([label, key, opts]) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                  <select value={(form as any)[key]} onChange={e => set(key, e.target.value)} className={inp}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Date *</label>
                <input type="date" value={form.serviceDate} onChange={e => set('serviceDate', e.target.value)} required className={inp} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Discharge Date</label>
                <input type="date" value={form.dischargeDate} onChange={e => set('dischargeDate', e.target.value)} className={inp} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ICD-10 Diagnosis Codes * (comma-separated)</label>
                <input value={form.diagnosisCodes} onChange={e => set('diagnosisCodes', e.target.value)} placeholder="E11.9, I10, J18.9" required className={inp} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">CPT / Procedure Codes (comma-separated)</label>
                <input value={form.procedureCodes} onChange={e => set('procedureCodes', e.target.value)} placeholder="99213, 85025" className={inp} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Line Items</label>
                <button type="button" onClick={() => setForm(f => ({ ...f, items: [...f.items, { description: '', code: '', amount: '' }] }))}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"><Plus size={12} /> Add Item</button>
              </div>
              {form.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2">
                  <input value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)}
                    placeholder="Service description" className="col-span-6 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
                  <input value={item.code} onChange={e => handleItemChange(idx, 'code', e.target.value)}
                    placeholder="Code" className="col-span-3 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
                  <input type="number" value={item.amount} onChange={e => handleItemChange(idx, 'amount', e.target.value)}
                    placeholder="KES" className="col-span-2 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
                  {form.items.length > 1 && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))}
                      className="col-span-1 h-10 flex items-center justify-center text-red-400 hover:text-red-600"><XCircle size={16} /></button>
                  )}
                </div>
              ))}
              <p className="text-right text-sm font-bold text-slate-700">Total: KES {totalFromItems.toLocaleString()}</p>
            </div>

            <div className="w-64 space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Claimed Amount (KES) *</label>
              <input type="number" value={form.claimedAmount} onChange={e => set('claimedAmount', e.target.value)}
                placeholder={totalFromItems ? String(totalFromItems) : '0.00'} required className={inp} />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="h-11 flex items-center gap-2 px-8 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-60 shadow-sm">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); }}
                className="h-11 px-6 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </WorkspacePanel>
      )}

      <WorkspacePanel title="Claims Register" icon={FileText}>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search claim ID, patient, NHIF number..."
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500">
            <option value="">All Statuses</option>
            {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-emerald-500" size={32} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ShieldCheck size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No claims found</p>
            <p className="text-xs mt-1">Submit your first NHIF claim above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Claim ID', 'Patient', 'NHIF No.', 'Scheme', 'Service Date', 'Claimed (KES)', 'Status', ''].map(h => (
                    <th key={h} className="text-left pb-3 pr-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs font-bold text-[#3B82F6]">{c.claimId}</td>
                    <td className="py-3 pr-4 font-medium">{c.patientName}</td>
                    <td className="py-3 pr-4 font-mono text-xs">{c.nhifNumber}</td>
                    <td className="py-3 pr-4 text-slate-600">{c.scheme}</td>
                    <td className="py-3 pr-4 text-xs text-slate-600">{new Date(c.serviceDate).toLocaleDateString('en-KE')}</td>
                    <td className="py-3 pr-4 font-bold">KES {Number(c.claimedAmount).toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className={cn('px-2.5 py-1 rounded-full text-[10px] font-bold border', STATUS_COLORS[c.status] || 'bg-slate-50 text-slate-600 border-slate-100')}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => setSelectedClaim(selectedClaim?._id === c._id ? null : c)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#3B82F6] hover:bg-blue-50 transition-all">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedClaim && (
          <div className="mt-6 border border-blue-100 rounded-2xl bg-blue-50/30 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Claim — {selectedClaim.claimId}</h3>
              <button onClick={() => setSelectedClaim(null)} className="text-slate-400 hover:text-slate-700 text-lg">✕</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                ['Patient', selectedClaim.patientName], ['NHIF No.', selectedClaim.nhifNumber],
                ['Facility', selectedClaim.facilityName || selectedClaim.facilityCode], ['Doctor', selectedClaim.attendingDoctor],
                ['Admission', selectedClaim.admissionType], ['Ward', selectedClaim.wardType],
                ['Diagnoses', (selectedClaim.diagnosisCodes || []).join(', ')],
                ['Claimed', `KES ${Number(selectedClaim.claimedAmount).toLocaleString()}`],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="font-medium text-slate-800">{val || '—'}</p>
                </div>
              ))}
            </div>
            {selectedClaim.timeline?.length > 0 && (
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Timeline</p>
                {selectedClaim.timeline.map((t: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-600 py-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-medium">{t.event}</span>
                    <span className="text-slate-400">· {t.by} · {new Date(t.at).toLocaleString('en-KE')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </WorkspacePanel>
    </div>
  );
}
