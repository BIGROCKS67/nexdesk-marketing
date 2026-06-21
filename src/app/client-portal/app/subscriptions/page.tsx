"use client";

import { useState } from "react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, PortalStatCard, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import {
  DEMO_CLIENT_ID,
  calcAnnualSpend,
  calcMonthlySpend,
  formatMoney,
  getClientData,
} from "@/data/portal/mock-data";
import type { SubscriptionStatus } from "@/data/portal/types";
import { cn } from "@/lib/utils";

type TabKey = "all" | SubscriptionStatus;

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "cancelled", label: "Cancelled" },
];

const typeLabels: Record<string, string> = {
  hosting: "Hosting",
  crm: "CRM Licence",
  support: "Support",
  maintenance: "Maintenance",
  other: "Other",
};

export default function SubscriptionsPage() {
  const { session } = useClientPortal();
  const data = getClientData(session?.clientId ?? DEMO_CLIENT_ID);
  const [tab, setTab] = useState<TabKey>("all");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);

  const activeSubs = data.subscriptions.filter((s) => s.subscriptionStatus === "active" && !cancelled.includes(s.id));
  const monthlySpend = calcMonthlySpend(activeSubs);
  const annualSpend = calcAnnualSpend(activeSubs);

  const items = data.subscriptions.filter((s) => {
    if (cancelled.includes(s.id)) return false;
    if (tab === "all") return true;
    return s.subscriptionStatus === tab;
  });

  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Subscriptions"
        description="All recurring services across your businesses — hosting, CRM licences, support, and more."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <PortalStatCard label="Total Subscriptions" value={String(activeSubs.length)} sub={`${data.subscriptions.filter((s) => s.subscriptionStatus === "cancelled").length} cancelled`} />
        <PortalStatCard label="Monthly Spend" value={formatMoney(Math.round(monthlySpend))} />
        <PortalStatCard label="Annual Spend" value={formatMoney(Math.round(annualSpend))} />
      </div>

      <div className="flex gap-2 border-b border-white/5 pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              tab === t.key ? "bg-nx-cyan/10 text-nx-cyan" : "text-nx-grey hover:text-white",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((sub) => (
          <div key={sub.id} className="glass rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-nx-grey">
                  {typeLabels[sub.type] ?? sub.type}
                </span>
                <h3 className="mt-2 font-display font-bold text-white">{sub.productName}</h3>
              </div>
              <StatusBadge status={sub.subscriptionStatus} />
            </div>
            <p className="mt-3 font-display text-xl font-bold text-nx-cyan">
              {formatMoney(sub.amount, sub.currency)}
              <span className="text-sm font-normal text-nx-grey"> / {sub.billingFrequency}</span>
            </p>
            <p className="mt-2 text-xs text-nx-grey">Next payment: {sub.nextPaymentDate}</p>
            <p className="mt-1 font-mono text-[10px] text-nx-grey">{sub.stripeSubscriptionId}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Manage</Button>
              {sub.subscriptionStatus === "active" && (
                <Button size="sm" variant="destructive" onClick={() => setCancelId(sub.id)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
        {!items.length && (
          <p className="col-span-full py-12 text-center text-sm text-nx-grey">No subscriptions in this category.</p>
        )}
      </div>

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-nx-black/70 p-4">
          <div className="glass max-w-md rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-white">Cancel subscription?</h3>
            <p className="mt-2 text-sm text-nx-grey">
              This will cancel at the end of the current billing period. Contact support to reactivate.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setCancelId(null)}>
                Keep Subscription
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  setCancelled((c) => [...c, cancelId]);
                  setCancelId(null);
                }}
              >
                Confirm Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
