'use client';

import api from '@/lib/api';
import { setAccessTokenStore } from '@/lib/token';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setAccessTokenState(res.data.accessToken);
    setAccessTokenStore(res.data.accessToken);
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const res = await api.post('/auth/register', { email, password, fullName });
    setAccessTokenState(res.data.accessToken);
    setAccessTokenStore(res.data.accessToken);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setAccessTokenState(null);
    setAccessTokenStore(null);
  };

  // Restore session on reload
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await api.post('/auth/refresh');
        setAccessTokenState(res.data.accessToken);
        setAccessTokenStore(res.data.accessToken);
      } catch {
        setAccessTokenState(null);
        setAccessTokenStore(null);
      }
    };
    restore();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
