/**
 * Synex420 API Client — Vercel Serverless Edition
 * All routes are relative (/api/...) so they work on any domain.
 */

export const tokenStore = {
  get: () => sessionStorage.getItem('synex_token'),
  set: (t: string) => sessionStorage.setItem('synex_token', t),
  clear: () => sessionStorage.removeItem('synex_token'),
};

async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStore.get();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(path, { ...options, headers });
  if (res.status === 401) { tokenStore.clear(); window.location.href = '/'; throw new Error('Session expired.'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
  return data as T;
}

export const authApi = {
  login:    (email: string, password: string) => apiFetch<{ token: string; user: any }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string, name: string, role?: string) => apiFetch<{ token: string; user: any }>('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name, role }) }),
  me:       () => apiFetch<{ user: any }>('/api/auth/me'),
};

export const patientApi = {
  list:     () => apiFetch<any[]>('/api/patients'),
  get:      (id: string) => apiFetch<any>(`/api/patients/${id}`),
  register: (data: any) => apiFetch('/api/patients', { method: 'POST', body: JSON.stringify(data) }),
  update:   (id: string, data: any) => apiFetch(`/api/patients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

export const nhifApi = {
  list:         (params?: any) => { const qs = params ? '?' + new URLSearchParams(params).toString() : ''; return apiFetch<any[]>(`/api/nhif-claims${qs}`); },
  get:          (id: string) => apiFetch<any>(`/api/nhif-claims/${id}`),
  submit:       (data: any) => apiFetch('/api/nhif-claims', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, data: any) => apiFetch(`/api/nhif-claims/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  stats:        () => apiFetch<any>('/api/nhif-claims/stats'),
};

export const rpmApi = {
  list:         (params?: any) => { const qs = params ? '?' + new URLSearchParams(params).toString() : ''; return apiFetch<any[]>(`/api/rpm-vitals${qs}`); },
  alerts:       () => apiFetch<any[]>('/api/rpm-vitals/alerts'),
  forPatient:   (patientId: string) => apiFetch<any[]>(`/api/rpm-vitals?patientId=${patientId}`),
  submit:       (data: any) => apiFetch('/api/rpm-vitals', { method: 'POST', body: JSON.stringify(data) }),
  resolveAlert: (id: string) => apiFetch(`/api/rpm-vitals/${id}`, { method: 'PATCH' }),
};

export const careGapApi = {
  all:       () => apiFetch<any[]>('/api/care-gaps'),
  forPatient:(id: string) => apiFetch<any>(`/api/care-gaps?patientId=${id}`),
  record:    (data: any) => apiFetch('/api/care-gaps/record', { method: 'POST', body: JSON.stringify(data) }),
  stats:     () => apiFetch<any>('/api/care-gaps/stats'),
};

export const healthCheck = () => apiFetch<{ status: string }>('/api/health');
