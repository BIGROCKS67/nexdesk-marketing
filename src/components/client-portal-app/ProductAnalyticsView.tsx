"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Sparkles } from "lucide-react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { DEMO_CLIENT_ID, formatMoney, getClientData, getHubProductById } from "@/data/portal/mock-data";

const typeLabels: Record<string, string> = {
  website: "Website",
  crm: "CRM Platform",
  hosting: "Hosting",
  booking: "Booking System",
  bespoke: "Bespoke System",
  support: "Support Plan",
};

export function ProductAnalyticsView({ productId }: { productId: string }) {
  const { session } = useClientPortal();
  const product = getHubProductById(productId);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-nx-grey">Product not found.</p>
        <Link href="/client-portal/app/dashboard" className="mt-4 inline-block text-nx-cyan hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const clientId = session?.clientId ?? DEMO_CLIENT_ID;
  const { invoices } = getClientData(clientId);
  const productInvoices = invoices.filter(
    (inv) => inv.productId === product.id || product.relatedInvoiceIds.includes(inv.id),
  );

  const showVisits = product.type === "website" || product.type === "booking";
  const showLeads =
    product.leads.length > 0 ||
    product.type === "website" ||
    product.type === "booking" ||
    product.type === "crm";

  return (
    <div className="space-y-8">
      <Link
        href="/client-portal/app/dashboard"
        className="inline-flex items-center text-sm text-nx-grey hover:text-nx-cyan"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to dashboard
      </Link>

      <PortalPageHeader
        title={product.name}
        description={`${typeLabels[product.type]} · ${product.companyName}`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={product.status} />
        <span className="flex items-center gap-1.5 text-sm text-nx-grey">
          <Building2 className="h-4 w-4 text-nx-cyan/70" />
          Billed to: <span className="text-white">{product.companyName}</span>
        </span>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-nx-cyan hover:underline"
          >
            {product.url}
          </a>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {showVisits && (
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-nx-grey">Monthly visits</p>
            <p className="mt-1 font-display text-2xl font-bold text-nx-cyan">
              {(product.monthlyVisits ?? 0).toLocaleString()}
            </p>
          </div>
        )}
        {showLeads && (
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-nx-grey">Leads (30 days)</p>
            <p className="mt-1 font-display text-2xl font-bold text-nx-cyan">
              {product.totalLeads ?? product.leads.length}
            </p>
          </div>
        )}
        {product.monthlySpend !== undefined && (
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-nx-grey">Monthly subscription</p>
            <p className="mt-1 font-display text-2xl font-bold text-white">
              {formatMoney(product.monthlySpend, product.currency)}
            </p>
          </div>
        )}
        {product.nextPaymentDue && (
          <div className="glass rounded-xl p-4">
            <p className="text-xs text-nx-grey">Next payment due</p>
            <p className="mt-1 font-display text-lg font-bold text-white">{product.nextPaymentDue}</p>
          </div>
        )}
      </div>

      {showLeads && product.leads.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white">Lead Breakdown</h2>
          <div className="glass overflow-x-auto rounded-xl">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-nx-grey">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {product.leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-nx-grey">{lead.date}</td>
                    <td className="px-4 py-3 text-white">{lead.name}</td>
                    <td className="px-4 py-3 text-nx-grey">{lead.email}</td>
                    <td className="px-4 py-3 text-nx-grey">{lead.phone}</td>
                    <td className="px-4 py-3 text-nx-grey">{lead.source}</td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-4 py-3 text-xs text-nx-grey">{lead.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-white">Invoices</h2>
        <div className="glass overflow-x-auto rounded-xl">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-nx-grey">
                <th className="px-4 py-3 font-medium">Invoice</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-white">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-nx-grey">{inv.productOrService}</td>
                  <td className="px-4 py-3 text-white">{formatMoney(inv.amount, inv.currency)}</td>
                  <td className="px-4 py-3 text-nx-grey">{inv.dueDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.paymentStatus} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="ghost">Download</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!productInvoices.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-nx-grey">
                    No invoices for this product yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {product.upsells.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-nx-cyan" />
            <h2 className="font-display text-lg font-bold text-white">Suggested For You</h2>
          </div>
          <p className="mb-4 text-sm text-nx-grey">
            AI-powered recommendations based on your current products and usage patterns.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {product.upsells.map((upsell) => (
              <div key={upsell.id} className="glass rounded-xl border border-nx-cyan/10 p-5">
                <h3 className="font-medium text-white">{upsell.title}</h3>
                <p className="mt-2 text-sm text-nx-grey">{upsell.description}</p>
                <p className="mt-2 text-xs text-nx-cyan">{upsell.estimatedCost}</p>
                <p className="mt-3 rounded-lg bg-white/5 p-3 text-xs text-nx-grey">
                  <span className="font-semibold text-nx-cyan">Why: </span>
                  {upsell.reason}
                </p>
                <Button size="sm" className="mt-4 bg-nx-cyan text-nx-black hover:bg-nx-aqua">
                  Enquire Now
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
