import Link from "next/link";
import { PortalPageHeader } from "@/components/portal/PortalUI";
import { allClients } from "@/data/portal/mock-data";

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Clients" description="All client accounts." />

      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs text-nx-grey">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Stripe Customer</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {allClients.map((c) => (
              <tr key={c.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 font-medium text-white">{c.company}</td>
                <td className="px-4 py-3 text-nx-grey">{c.name}</td>
                <td className="px-4 py-3 text-nx-grey">{c.email}</td>
                <td className="px-4 py-3 font-mono text-[10px] text-nx-grey">{c.stripeCustomerId}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${c.id}`} className="text-nx-cyan hover:underline">
                    Open profile →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
