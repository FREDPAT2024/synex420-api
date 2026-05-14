// SYNEX420 GLOBAL LAW: All pages MUST be full-width workspace.
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Bell, Search, LogOut, Activity, Heart, ShieldCheck, Users, Lock, AlertCircle, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from './AuthProvider';
import { Footer } from './workspace/Footer';

function getInitials(user: any): string {
  if (user?.displayName) {
    const parts = user.displayName.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (user?.email) return user.email.slice(0, 2).toUpperCase();
  return 'US';
}

function getDisplayName(user: any): string {
  if (user?.displayName) return user.displayName;
  if (user?.email) return user.email.split('@')[0];
  return 'System User';
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, signInWithGoogle, signInWithEmail, logout, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSigningIn(true);
    await signInWithEmail(email, password);
    setSigningIn(false);
  };

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    await signInWithGoogle();
    setSigningIn(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex bg-[#F0F4F8] overflow-hidden font-sans">
        {/* LEFT PANEL */}
        <div className="hidden sm:flex sm:w-[40%] md:w-[45%] lg:w-[48%] relative flex-col bg-[#1E3A8A] overflow-hidden shrink-0 shadow-2xl z-20">
          <div className="relative h-2/3 w-full">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" 
              alt="Medical Professional" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
              <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#1E3A8A" className="opacity-40"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#1E3A8A"></path>
              </svg>
            </div>
          </div>
          <div className="flex-1 p-16 flex flex-col justify-between relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white tracking-tight leading-[1.1]">
                Compassionate Care.<br />
                <span className="text-blue-300">Connected Health.</span>
              </h2>
              <p className="text-blue-100/80 text-lg font-medium max-w-sm">Bridging lives to better health, every day.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-blue-800/50">
              {[
                { icon: Heart, label: 'Patient Centered\nCare' },
                { icon: ShieldCheck, label: 'Trusted\nExcellence' },
                { icon: Users, label: 'Stronger\nTogether' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/5"><Icon size={18} /></div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Login */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-[#E2E8F0]/30">
          <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-2xl shadow-slate-300/50 p-10 lg:p-14 border border-white text-center space-y-8 animate-in fade-in zoom-in duration-700">
            {/* Logo */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  <Activity size={28} className="relative z-10" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-black text-[#1E3A8A] italic uppercase tracking-tighter leading-none">
                    Synex<span className="text-[#3B82F6]">420</span>
                  </h1>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">HEALTH SYSTEM</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h3>
              <p className="text-sm text-slate-500 font-medium">Sign in to access your clinical workspace</p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-left animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <p className="text-xs font-semibold text-red-700">{authError}</p>
                <button onClick={clearAuthError} className="ml-auto text-red-400 hover:text-red-600"><X size={14} /></button>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-5 text-left">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); clearAuthError(); }}
                    placeholder="your@hospital.co.ke"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-[#3B82F6] transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); clearAuthError(); }}
                    placeholder="Enter your password"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={signingIn}
                className="w-full h-14 bg-[#1E3A8A] hover:bg-[#1e3271] disabled:opacity-60 text-white rounded-xl shadow-xl shadow-blue-900/20 flex items-center justify-center font-bold text-sm tracking-wide transition-all active:scale-[0.98]"
              >
                {signingIn ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full h-14 border-2 border-slate-100 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              <div className="h-6 w-6 bg-[#3B82F6] rounded-md flex items-center justify-center text-white">
                <ShieldCheck size={14} />
              </div>
              <span className="text-xs font-bold text-slate-700">Continue with Google / SSO</span>
            </button>

            <p className="text-[11px] font-medium text-slate-400">
              Need help? <a href="mailto:support@synex420.co.ke" className="text-[#3B82F6] font-bold hover:underline">Contact IT Support</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const initials = getInitials(user);
  const displayName = getDisplayName(user);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full z-50"><Sidebar onClose={() => setSidebarOpen(false)} /></aside>
        </div>
      )}

      {/* SIDEBAR (desktop) */}
      <aside className="hidden lg:flex w-[280px] shrink-0">
        <Sidebar />
      </aside>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-6 shrink-0 gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-all">
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-8 w-8 bg-[#3B82F6] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Activity size={16} />
              </div>
              <div>
                <h1 className="text-sm font-black text-slate-900 uppercase italic tracking-tighter">
                  Synex<span className="text-[#3B82F6]">420</span> <span className="text-slate-400 font-medium not-italic ml-1">Terminal</span>
                </h1>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">Executive Healthcare Workspace</p>
              </div>
            </div>
          </div>

          {/* CENTER SEARCH */}
          <div className="hidden xl:block flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search patients, encounters, billing..."
                className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#3B82F6] focus:bg-white"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-slate-600 transition hover:bg-slate-50 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3B82F6] font-semibold text-white text-xs shadow-sm ring-2 ring-[#3B82F6]/10">
                {initials}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900 leading-none truncate max-w-[120px]">{displayName}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium truncate max-w-[120px]">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="ml-1 p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 lg:px-8 py-8 min-h-full flex flex-col">
            <div className="flex-1 w-full">{children}</div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
