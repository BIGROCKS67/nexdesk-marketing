import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { allClients, allWebsites } from "@/data/portal/mock-data";

export default function AdminWebsitesPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Websites" description="Managed sites across all clients." />

      <div className="grid gap-4 md:grid-cols-2">
        {allWebsites.map((site) => {
          const client = allClients.find((c) => c.id === site.clientId);
          return (
            <div key={site.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-white">{site.name}</h3>
                  <p className="text-sm text-nx-cyan">{site.url}</p>
                  <p className="mt-1 text-xs text-nx-grey">{client?.company}</p>
                </div>
                <StatusBadge status={site.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-nx-grey">
                <span>Hosting: {site.hostingStatus}</span>
                <span>SSL: {site.sslStatus}</span>
                <span>Backup: {site.lastBackup}</span>
                <span>Uptime: {site.uptime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
