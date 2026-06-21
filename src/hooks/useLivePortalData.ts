"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPortalData } from "@/lib/os-api-client";
import type {
  ActivityItem,
  PortalInvoice,
  PortalProduct,
  PortalProject,
  PortalSubscription,
  PortalWebsite,
  SupportTicket,
} from "@/data/portal/types";

export interface LivePortalData {
  buildProgress: number;
  portalSync: string;
  projects: PortalProject[];
  subscriptions: PortalSubscription[];
  invoices: PortalInvoice[];
  websites: PortalWebsite[];
  products: PortalProduct[];
  tickets: SupportTicket[];
  activity: ActivityItem[];
}

export function useLivePortalData(clientId: string | undefined, refreshKey = 0) {
  const [data, setData] = useState<LivePortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!clientId) return;
    setLoading(true);
    setError(null);
    try {
      const payload = await fetchPortalData(clientId);
      setData({
        buildProgress: payload.buildProgress,
        portalSync: payload.portalSync,
        projects: payload.projects,
        subscriptions: payload.subscriptions,
        invoices: payload.invoices,
        websites: payload.websites,
        products: payload.products,
        tickets: payload.tickets,
        activity: payload.activity,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    reload();
  }, [reload, refreshKey]);

  useEffect(() => {
    if (!clientId) return;
    const id = window.setInterval(reload, 15000);
    return () => window.clearInterval(id);
  }, [clientId, reload]);

  return { data, loading, error, reload };
}
