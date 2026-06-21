"use client";

import Link from "next/link";
import { BarChart3, Building2 } from "lucide-react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, PortalStatCard, StatusBadge } from "@/components/portal/PortalUI";
import { ButtonLink } from "@/components/ui/button-link";
import { DEMO_CLIENT_ID, formatMoney, getClientData } from "@/data/portal/mock-data";
import { useLivePortalData } from "@/hooks/useLivePortalData";

const typeLabels: Record<string, string> = {
  website: "Website",
  crm: "CRM",
  hosting: "Hosting",
  booking: "Booking System",
  bespoke: "Bespoke",
  support: "Support",
};

export default function DashboardPage() {
  const { session } = useClientPortal();
  const clientId = session?.clientId ?? DEMO_CLIENT_ID;
  const { data: live, loading } = useLivePortalData(clientId);
  const fallback = getClientData(clientId);
  const data = live
    ? { ...fallback, ...live, hubProducts: fallback.hubProducts }
    : fallback;

  const activeSubs = data.subscriptions.filter((s) => s.subscriptionStatus === "active").length;
  const duePayments = data.invoices.filter((i) => i.paymentStatus === "Due" || i.paymentStatus === "Failed").length;
  const unreadSupport = data.tickets.reduce((s, t) => s + t.unreadByClient, 0);

  return (
    <div className="space-y-8">
      <PortalPageHeader
        title={`Welcome back, ${session?.name?.split(" ")[0] ?? "there"}`}
        description="Your central hub for all NexDesk products across every business you manage."
      />

      {loading && !live && (
        <p className="text-xs text-nx-grey">Syncing latest data…</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PortalStatCard label="Your Products" value={String(data.hubProducts.length)} />
        <PortalStatCard label="Active Subscriptions" value={String(activeSubs)} href="/client-portal/app/subscriptions" />
        <PortalStatCard label="Payments Due" value={String(duePayments)} sub={duePayments ? "Action required" : "All clear"} href="/client-portal/app/payments" />
        <PortalStatCard label="Unread Support" value={String(unreadSupport)} href="/client-portal/app/support" />
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-white">Your Products</h2>
        <p className="mt-1 text-sm text-nx-grey">
          Each product is linked to a company entity for billing and tax purposes.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.hubProducts.map((product) => (
            <div key={product.id} className="glass flex flex-col rounded-xl p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-nx-cyan">
                    {typeLabels[product.type] ?? product.type}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-white">{product.name}</h3>
                </div>
                <StatusBadge status={product.status} />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-nx-grey">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-nx-cyan/70" />
                <span>{product.companyName}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                {product.monthlyVisits !== undefined && (
                  <div>
                    <p className="text-nx-grey">Monthly visits</p>
                    <p className="font-semibold text-white">{product.monthlyVisits.toLocaleString()}</p>
                  </div>
                )}
                {product.totalLeads !== undefined && product.totalLeads > 0 && (
                  <div>
                    <p className="text-nx-grey">Leads (30d)</p>
                    <p className="font-semibold text-white">{product.totalLeads}</p>
                  </div>
                )}
                {product.monthlySpend !== undefined && product.monthlySpend > 0 && (
                  <div>
                    <p className="text-nx-grey">Monthly spend</p>
                    <p className="font-semibold text-white">{formatMoney(product.monthlySpend, product.currency)}</p>
                  </div>
                )}
                {product.nextPaymentDue && (
                  <div>
                    <p className="text-nx-grey">Next payment</p>
                    <p className="font-semibold text-white">{product.nextPaymentDue}</p>
                  </div>
                )}
              </div>

              <ButtonLink
                href={`/client-portal/app/products/${product.id}`}
                variant="outline"
                className="mt-5 w-full justify-center"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>

      {data.activity.length > 0 && (
        <div className="glass rounded-xl p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-white">Recent Activity</h2>
          <ul className="mt-4 divide-y divide-white/5">
            {data.activity.slice(0, 5).map((item) => (
              <li key={item.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-nx-grey">{item.description}</p>
                </div>
                <span className="text-xs text-nx-grey">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
