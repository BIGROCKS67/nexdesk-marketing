"use client";

import Link from "next/link";
import { PortalPageHeader, PortalStatCard } from "@/components/portal/PortalUI";
import {
  allClients,
  allInvoices,
  allProjects,
  allSubscriptions,
  allSupportTickets,
} from "@/data/portal/mock-data";

export default function AdminDashboardPage() {
  const activeSubs = allSubscriptions.filter((s) => s.subscriptionStatus === "active").length;
  const dueInvoices = allInvoices.filter((i) => i.paymentStatus === "Due").length;
  const openProjects = allProjects.filter((p) => p.status !== "Completed").length;
  const openSupport = allSupportTickets.filter((t) => t.status !== "Resolved").length;

  return (
    <div className="space-y-8">
      <PortalPageHeader title="Admin Dashboard" description="Overview of all clients and operations." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Clients" value={String(allClients.length)} href="/admin/clients" />
        <PortalStatCard label="Active Subscriptions" value={String(activeSubs)} href="/admin/subscriptions" />
        <PortalStatCard label="Open Projects" value={String(openProjects)} href="/admin/projects" />
        <PortalStatCard label="Open Support" value={String(openSupport)} href="/admin/support" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Upcoming Payments</h2>
            <Link href="/admin/payments" className="text-xs text-nx-cyan hover:underline">View all</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {allInvoices.filter((i) => i.paymentStatus === "Due").slice(0, 5).map((inv) => (
              <li key={inv.id} className="flex justify-between text-sm">
                <span className="text-nx-grey">{inv.productOrService}</span>
                <span className="text-white">{inv.dueDate}</span>
              </li>
            ))}
            {!dueInvoices && <li className="text-sm text-nx-grey">No due invoices</li>}
          </ul>
        </div>

        <div className="glass rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white">Recent Clients</h2>
            <Link href="/admin/clients" className="text-xs text-nx-cyan hover:underline">View all</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {allClients.map((c) => (
              <li key={c.id}>
                <Link href={`/admin/clients/${c.id}`} className="flex justify-between text-sm hover:text-nx-cyan">
                  <span className="text-white">{c.company}</span>
                  <span className="text-nx-grey">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
