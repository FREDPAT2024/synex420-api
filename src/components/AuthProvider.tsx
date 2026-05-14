import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi, tokenStore } from '../lib/apiClient';
import { Loader2 } from 'lucide-react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  displayName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) { setLoading(false); return; }
    authApi.me()
      .then(({ user: u }) => setUser({ ...u, displayName: u.name }))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const { token, user: u } = await authApi.login(email, password);
      tokenStore.set(token);
      setUser({ ...u, displayName: u.name });
    } catch (err: any) {
      setAuthError(
        err.message?.includes('Invalid') ? 'Invalid email or password.' :
        err.message?.includes('locked') ? 'Account locked. Contact IT Support.' :
        err.message || 'Sign-in failed. Check your connection.'
      );
    }
  };

  const signInWithGoogle = async () => {
    setAuthError('Google SSO requires Firebase. Use email + password for this deployment.');
  };

  const logout = () => { tokenStore.clear(); setUser(null); };
  const clearAuthError = () => setAuthError(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#3B82F6]" size={40} />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, authError, clearAuthError, signInWithEmail, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
