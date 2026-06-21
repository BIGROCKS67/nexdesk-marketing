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
import { portalLogin } from "@/lib/os-api-client";
import {
  isDemoLogin,
  demoClientSessionWithId,
} from "@/data/client-portal-demo";

const SESSION_KEY = "nexdesk-client-session";

export interface ClientSession {
  email: string;
  name: string;
  company: string;
  clientId: string;
}

interface ClientPortalContextValue {
  session: ClientSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isReady: boolean;
}

const ClientPortalContext = createContext<ClientPortalContextValue | null>(null);

export function ClientPortalProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ClientSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw) as ClientSession);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
    setIsReady(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const liveSession = await portalLogin(email, password);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(liveSession));
      setSession(liveSession);
      return true;
    } catch {
      if (!isDemoLogin(email, password)) return false;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(demoClientSessionWithId));
      setSession(demoClientSessionWithId);
      return true;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  return (
    <ClientPortalContext.Provider value={{ session, login, logout, isReady }}>
      {children}
    </ClientPortalContext.Provider>
  );
}

export function useClientPortal() {
  const ctx = useContext(ClientPortalContext);
  if (!ctx) throw new Error("useClientPortal must be used within ClientPortalProvider");
  return ctx;
}

export function useRequireClientAuth() {
  const { session, isReady } = useClientPortal();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !session) {
      router.replace("/client-portal/login");
    }
  }, [isReady, session, router]);

  return { session, isReady };
}
