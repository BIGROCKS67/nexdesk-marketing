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

export interface PortalPayment {
  id: string;
  clientId: string;
  amount: number;
  currency: string;
  status: string;
  paymentType: string;
  stripeFee: number;
  netAmount: number;
  paidAt?: string;
  failedAt?: string;
  failureReason?: string | null;
  invoiceId?: string;
}

export interface PortalRefund {
  id: string;
  clientId: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason?: string;
  createdAt: string;
}

export interface LivePortalData {
  buildProgress: number;
  portalSync: string;
  client?: {
    id: string;
    customerId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    stripeCustomerId: string;
    paymentMethodStatus?: string;
  };
  projects: PortalProject[];
  subscriptions: PortalSubscription[];
  invoices: PortalInvoice[];
  payments: PortalPayment[];
  refunds: PortalRefund[];
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
        client: payload.client,
        projects: payload.projects,
        subscriptions: payload.subscriptions,
        invoices: payload.invoices,
        payments: payload.payments ?? [],
        refunds: payload.refunds ?? [],
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
