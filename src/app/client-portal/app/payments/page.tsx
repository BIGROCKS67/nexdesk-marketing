"use client";

import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { DEMO_CLIENT_ID, formatMoney, getClientData } from "@/data/portal/mock-data";

function InvoiceTable({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: ReturnType<typeof getClientData>["invoices"];
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
                    <Button size="sm" variant="outline" onClick={() => inv.hostedInvoiceUrl && window.open(inv.hostedInvoiceUrl, "_blank")}>
                      View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => inv.invoicePdf && window.open(inv.invoicePdf, "_blank")}>
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
  const data = getClientData(session?.clientId ?? DEMO_CLIENT_ID);

  const overdue = data.invoices.filter((i) => i.paymentStatus === "Failed");
  const upcoming = data.invoices.filter((i) => i.paymentStatus === "Due");
  const completed = data.invoices.filter((i) => i.paymentStatus === "Paid");

  return (
    <div className="space-y-10">
      <PortalPageHeader
        title="Payments"
        description="View, download, and manage invoices across all your businesses. Stripe integration ready."
      />

      <InvoiceTable title="Overdue Payments" rows={overdue} empty="No overdue payments — you're all caught up." />
      <InvoiceTable title="Upcoming Payments" rows={upcoming} empty="No upcoming payments due." />
      <InvoiceTable title="Payment History" rows={completed} empty="No completed payments yet." />
    </div>
  );
}
