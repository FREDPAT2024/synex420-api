import React, { useState, useEffect } from 'react';
import { patientApi } from '../lib/apiClient';
import { Search, User, Phone, MapPin, Filter, ArrowUpDown, Shield, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { cn } from '../lib/utils';

export default function PatientSearch() {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await patientApi.list();
      setPatients(data);
    } catch (err) {
      console.error('Failed to load patients', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filteredPatients = patients.filter(p =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.patientId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.opNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.phone || '').includes(searchTerm)
  );

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-700">
      <PageHeader
        title="Master Patient Index"
        subtitle="Universal search and management of all hospital clinical records."
        actions={
          <div className="flex gap-3">
            <button onClick={load} className="h-12 w-12 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-all">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link to="/registration">
              <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
                <User className="mr-2 h-4 w-4" /> New Patient Registration
              </button>
            </Link>
          </div>
        }
      />

      <WorkspacePanel>
        <div className="p-8 border-b border-[#E2E8F0] bg-slate-50/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by Name, Health ID, OP Number, or Phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#3B82F6] transition-all shadow-sm font-medium"
              />
            </div>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {['Patient Details','Identifiers','Registration Status','Contact Information','Current Status',''].map(h => (
                  <th key={h} className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center">
                    <Loader2 className="animate-spin text-[#3B82F6] mx-auto" size={28} />
                    <p className="text-slate-400 font-medium mt-3 text-sm">Loading patient records...</p>
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center text-slate-400 italic font-medium">
                    {patients.length === 0 ? 'No patients registered yet.' : 'No matching records found.'}
                  </td>
                </tr>
              ) : filteredPatients.map(p => (
                <tr key={p._id || p.patientId} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#3B82F6] group-hover:text-white transition-all shadow-sm ring-1 ring-black/5">
                        {(p.firstName?.[0] || '?')}{(p.lastName?.[0] || '?')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">{p.firstName} {p.middleName} {p.lastName}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                          <MapPin size={10} className="text-[#3B82F6]" /> {p.residence || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-mono font-bold text-[#3B82F6]">{p.patientId}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">OP: {p.opNo || 'N/A'} · IP: {p.ipNo || 'N/A'}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-black uppercase border w-fit',
                        p.patientType === 'ER' ? 'bg-red-50 text-red-600 border-red-100' :
                        p.patientType === 'IPD' ? 'bg-blue-50 text-[#3B82F6] border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      )}>{p.patientType} CASE</span>
                      {p.insuranceProvider && (
                        <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <Shield size={10} className="text-[#3B82F6]" /> {p.insuranceProvider}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold font-mono">
                      <Phone size={12} className="text-[#3B82F6]" /> {p.phone}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Validated
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 rounded-lg text-slate-400 hover:text-[#3B82F6] hover:bg-blue-50 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WorkspacePanel>

      <div className="flex items-center gap-4 p-6 bg-slate-900 rounded-2xl shadow-xl overflow-hidden relative border border-slate-800">
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-10 w-10 bg-[#3B82F6] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Clinical Audit Protocol Active</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium">Access to the Master Patient Index is logged. Every viewing of clinical records is strictly monitored per HIPAA/KMPDC regulations.</p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
