import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalPageHeader, ProgressBar, StatusBadge } from "@/components/portal/PortalUI";
import { allClients, getClientData } from "@/data/portal/mock-data";

export function generateStaticParams() {
  return allClients.map((c) => ({ id: c.id }));
}

export default async function AdminClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = allClients.find((c) => c.id === id);
  if (!client) notFound();

  const data = getClientData(id);

  return (
    <div className="space-y-8">
      <PortalPageHeader title={client.company} description={`${client.name} · ${client.email}`} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-nx-grey">Projects</p>
          <p className="font-display text-2xl font-bold text-white">{data.projects.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-nx-grey">Subscriptions</p>
          <p className="font-display text-2xl font-bold text-white">{data.subscriptions.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-nx-grey">Support tickets</p>
          <p className="font-display text-2xl font-bold text-white">{data.tickets.length}</p>
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-white">Projects</h2>
        <div className="space-y-3">
          {data.projects.map((p) => (
            <div key={p.id} className="glass rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-white">{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <ProgressBar value={p.progress} className="mt-3" />
              <p className="mt-2 text-xs text-nx-grey">{p.currentStage} · {p.progress}%</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-white">Subscriptions & Invoices</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white">Subscriptions</h3>
            <ul className="mt-3 space-y-2 text-sm text-nx-grey">
              {data.subscriptions.map((s) => (
                <li key={s.id}>{s.productName} — {s.subscriptionStatus}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white">Recent Invoices</h3>
            <ul className="mt-3 space-y-2 text-sm text-nx-grey">
              {data.invoices.slice(0, 5).map((i) => (
                <li key={i.id}>{i.invoiceNumber} — {i.paymentStatus}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-white">Websites & Support</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white">Websites</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {data.websites.map((w) => (
                <li key={w.id} className="text-nx-grey">{w.name} — <StatusBadge status={w.status} /></li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {data.tickets.map((t) => (
                <li key={t.id} className="text-nx-grey">{t.subject} — <StatusBadge status={t.status} /></li>
              ))}
            </ul>
            <Link href="/admin/support" className="mt-3 inline-block text-xs text-nx-cyan hover:underline">
              Manage support →
            </Link>
          </div>
        </div>
      </section>

      <Link href="/admin/clients" className="text-sm text-nx-cyan hover:underline">← Back to clients</Link>
    </div>
  );
}
