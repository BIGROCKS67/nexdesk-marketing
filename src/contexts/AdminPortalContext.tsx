"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { isAdminLogin, demoAdminSession } from "@/data/client-portal-demo";

const SESSION_KEY = "nexdesk-admin-session";

export interface AdminSession {
  email: string;
  name: string;
  role: "admin";
}

interface AdminPortalContextValue {
  session: AdminSession | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isReady: boolean;
}

const AdminPortalContext = createContext<AdminPortalContextValue | null>(null);

export function AdminPortalProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw) as AdminSession);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
    setIsReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    if (!isAdminLogin(email, password)) return false;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(demoAdminSession));
    setSession(demoAdminSession);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  return (
    <AdminPortalContext.Provider value={{ session, login, logout, isReady }}>
      {children}
    </AdminPortalContext.Provider>
  );
}

export function useAdminPortal() {
  const ctx = useContext(AdminPortalContext);
  if (!ctx) throw new Error("useAdminPortal must be used within AdminPortalProvider");
  return ctx;
}

export function useRequireAdminAuth() {
  const { session, isReady } = useAdminPortal();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !session) {
      router.replace("/admin/login");
    }
  }, [isReady, session, router]);

  return { session, isReady };
}
