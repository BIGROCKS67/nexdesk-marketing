"use client";

import { AlertCircle } from "lucide-react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { DEMO_CLIENT_ID, formatMoney, getClientData } from "@/data/portal/mock-data";
import type { PortalInvoice } from "@/data/portal/types";
import { useLivePortalData } from "@/hooks/useLivePortalData";

function isUpcoming(inv: PortalInvoice) {
  return inv.paymentStatus === "Due";
}

function isOverdue(inv: PortalInvoice) {
  return inv.paymentStatus === "Overdue" || inv.paymentStatus === "Failed";
}

function InvoiceTable({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: PortalInvoice[];
  empty: string;
}) {
  return (
    <section>
      <h2 className="mb-4 font-display text-lg font-bold text-white">{title}</h2>
      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-nx-grey">
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Product / Service</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Due Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((inv) => (
              <tr key={inv.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-white">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 text-nx-grey">{inv.productOrService}</td>
                <td className="px-4 py-3 text-white">{formatMoney(inv.amount, inv.currency)}</td>
                <td className="px-4 py-3 text-nx-grey">{inv.dueDate}</td>
                <td className="px-4 py-3"><StatusBadge status={inv.paymentStatus} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!inv.hostedInvoiceUrl || inv.hostedInvoiceUrl === "#"}
                      onClick={() => inv.hostedInvoiceUrl && window.open(inv.hostedInvoiceUrl, "_blank")}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={!inv.invoicePdf || inv.invoicePdf === "#"}
                      onClick={() => inv.invoicePdf && window.open(inv.invoicePdf, "_blank")}
                    >
                      Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-nx-grey">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function PaymentsPage() {
  const { session } = useClientPortal();
  const clientId = session?.clientId ?? DEMO_CLIENT_ID;
  const { data: live, loading } = useLivePortalData(clientId);
  const fallback = getClientData(clientId);
  const invoices = live?.invoices ?? fallback.invoices;
  const payments = live?.payments ?? fallback.payments ?? [];
  const refunds = live?.refunds ?? fallback.refunds ?? [];

  const overdue = invoices.filter(isOverdue);
  const upcoming = invoices.filter(isUpcoming);
  const completed = invoices.filter((i) => i.paymentStatus === "Paid");
  const failedNotices = payments.filter((p) => p.status === "failed");

  return (
    <div className="space-y-10">
      <PortalPageHeader
        title="Payments"
        description="View, download, and manage invoices. Synced from Stripe in real time."
      />

      {loading && !live && (
        <p className="text-xs text-nx-grey">Loading payment data…</p>
      )}

      {failedNotices.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/20 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-medium text-red-200">Failed payment notice</p>
            {failedNotices.map((p) => (
              <p key={p.id} className="mt-1 text-sm text-nx-grey">
                {formatMoney(p.amount, p.currency)} — {p.failureReason ?? "Payment failed"}.{" "}
                <a href="/client-portal/app/settings" className="text-nx-cyan hover:underline">
                  Update payment method
                </a>
              </p>
            ))}
          </div>
        </div>
      )}

      <InvoiceTable title="Overdue Payments" rows={overdue} empty="No overdue payments — you're all caught up." />
      <InvoiceTable title="Upcoming Payments" rows={upcoming} empty="No upcoming payments due." />
      <InvoiceTable title="Payment History" rows={completed} empty="No completed payments yet." />

      {refunds.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white">Refunds & Credits</h2>
          <div className="glass divide-y divide-white/5 rounded-xl">
            {refunds.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-nx-grey">{r.reason ?? "Refund processed"}</span>
                <span className="font-medium text-emerald-400">+{formatMoney(r.amount, r.currency)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
