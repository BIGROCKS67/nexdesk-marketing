import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { allClients, allInvoices, formatMoney } from "@/data/portal/mock-data";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Payments" description="Invoices and payment status across all clients." />

      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-nx-grey">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((inv) => {
              const client = allClients.find((c) => c.id === inv.clientId);
              return (
                <tr key={inv.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white">{client?.company}</td>
                  <td className="px-4 py-3 font-mono text-xs text-nx-grey">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-nx-grey">{inv.productOrService}</td>
                  <td className="px-4 py-3 text-white">{formatMoney(inv.amount, inv.currency)}</td>
                  <td className="px-4 py-3 text-nx-grey">{inv.dueDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.paymentStatus} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
