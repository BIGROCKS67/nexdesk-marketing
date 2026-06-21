import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { allClients, allSubscriptions, formatMoney } from "@/data/portal/mock-data";

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Subscriptions" description="All client subscriptions across accounts." />

      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-nx-grey">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Next payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Stripe ID</th>
            </tr>
          </thead>
          <tbody>
            {allSubscriptions.map((sub) => {
              const client = allClients.find((c) => c.id === sub.clientId);
              return (
                <tr key={sub.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white">{client?.company}</td>
                  <td className="px-4 py-3 text-nx-grey">{sub.productName}</td>
                  <td className="px-4 py-3 text-white">
                    {formatMoney(sub.amount, sub.currency)}/{sub.billingFrequency}
                  </td>
                  <td className="px-4 py-3 text-nx-grey">{sub.nextPaymentDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={sub.subscriptionStatus} /></td>
                  <td className="px-4 py-3 font-mono text-[10px] text-nx-grey">{sub.stripeSubscriptionId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
