/**
 * Synex420 API Client
 * Replaces Firebase/Firestore — all data goes through the Express/MongoDB backend.
 */

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ── Token management ───────────────────────────────────────
export const tokenStore = {
  get: () => sessionStorage.getItem('synex_token'),
  set: (t: string) => sessionStorage.setItem('synex_token', t),
  clear: () => sessionStorage.removeItem('synex_token'),
};

// ── Core fetch wrapper ─────────────────────────────────────
async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStore.get();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    tokenStore.clear();
    window.location.href = '/'; // force re-login
    throw new Error('Session expired. Please sign in again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
  return data as T;
}

// ── Auth ───────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, name: string, role?: string) =>
    apiFetch<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    }),

  me: () => apiFetch<{ user: any }>('/api/auth/me'),
};

// ── Patients ───────────────────────────────────────────────
export const patientApi = {
  list: () => apiFetch<any[]>('/api/patients'),
  get: (id: string) => apiFetch<any>(`/api/patients/${id}`),
  register: (data: any) =>
    apiFetch('/api/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiFetch(`/api/patients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ── MODULE 1: NHIF Claims ──────────────────────────────────
export const nhifApi = {
  list: (params?: { status?: string; patientId?: string; from?: string; to?: string }) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiFetch<any[]>(`/api/nhif-claims${qs}`);
  },
  get: (id: string) => apiFetch<any>(`/api/nhif-claims/${id}`),
  submit: (data: any) =>
    apiFetch('/api/nhif-claims', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, data: { status: string; approvedAmount?: number; rejectionReason?: string }) =>
    apiFetch(`/api/nhif-claims/${id}/status`, { method: 'PATCH', body: JSON.stringify(data) }),
  stats: () => apiFetch<any>('/api/nhif-claims/stats/summary'),
};

// ── MODULE 2: RPM Vitals ───────────────────────────────────
export const rpmApi = {
  list: (params?: { patientId?: string; hasAlerts?: string }) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiFetch<any[]>(`/api/rpm-vitals${qs}`);
  },
  alerts: () => apiFetch<any[]>('/api/rpm-vitals/alerts'),
  forPatient: (patientId: string) =>
    apiFetch<any[]>(`/api/rpm-vitals/patient/${patientId}`),
  submit: (data: any) =>
    apiFetch('/api/rpm-vitals', { method: 'POST', body: JSON.stringify(data) }),
  resolveAlert: (id: string) =>
    apiFetch(`/api/rpm-vitals/${id}/resolve`, { method: 'PATCH' }),
};

// ── MODULE 3: Care Gaps ────────────────────────────────────
export const careGapApi = {
  all: () => apiFetch<any[]>('/api/care-gaps'),
  forPatient: (patientId: string) =>
    apiFetch<any>(`/api/care-gaps/patient/${patientId}`),
  record: (data: { patientId: string; measureCode: string; notes?: string; result?: string; doneAt?: string }) =>
    apiFetch('/api/care-gaps/record', { method: 'POST', body: JSON.stringify(data) }),
  stats: () => apiFetch<any>('/api/care-gaps/stats/summary'),
};

// ── Health check ───────────────────────────────────────────
export const healthCheck = () => apiFetch<{ status: string }>('/api/health');
