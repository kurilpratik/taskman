'use client';

import api from '@/lib/api';
import { setAccessTokenStore } from '@/lib/token';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  accessToken: string | null;
  user: { id: string; email: string; fullName: string } | null;
  isAuthenticated: boolean;
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
  const [user, setUser] = useState<{
    id: string;
    email: string;
    fullName: string;
  } | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setAccessTokenState(res.data.accessToken);
    setAccessTokenStore(res.data.accessToken);
    try {
      const me = await api.get('/auth/getMe');
      setUser(me.data.user);
    } catch {
      setUser(null);
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const res = await api.post('/auth/register', { email, password, fullName });
    setAccessTokenState(res.data.accessToken);
    setAccessTokenStore(res.data.accessToken);
    try {
      const me = await api.get('/auth/getMe');
      setUser(me.data.user);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setAccessTokenState(null);
    setAccessTokenStore(null);
    setUser(null);
  };

  // Restore session on reload
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await api.post('/auth/refresh');
        setAccessTokenState(res.data.accessToken);
        setAccessTokenStore(res.data.accessToken);
        try {
          const me = await api.get('/auth/getMe');
          setUser(me.data.user);
        } catch {
          setUser(null);
        }
      } catch {
        setAccessTokenState(null);
        setAccessTokenStore(null);
      }
    };
    restore();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
