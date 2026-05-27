'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'coordinator' | 'user';
  phone?: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMe = useCallback(async () => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) { setLoading(false); return; }
      const { data } = await api.get('/auth/me');
      setUser(data.data);
    } catch {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    Cookies.set('accessToken',  data.data.accessToken,  { expires: 7,  secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', data.data.refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
    setUser(data.data.user);
    router.push(data.data.user.role === 'admin' ? '/admin' : '/');
  };

  const register = async (formData: { name: string; email: string; password: string; phone?: string }) => {
    const { data } = await api.post('/auth/register', formData);
    Cookies.set('accessToken',  data.data.accessToken,  { expires: 7,  secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', data.data.refreshToken, { expires: 30, secure: true, sameSite: 'strict' });
    setUser(data.data.user);
    router.push('/');
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, register, logout,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
