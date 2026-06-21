import { PortalPageHeader } from "@/components/portal/PortalUI";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Admin Settings" description="Team and integration settings." />
      <div className="glass max-w-xl rounded-xl p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-white">Integrations</h2>
        <p className="mt-2 text-sm text-nx-grey">
          Stripe webhook endpoints, API keys, and notification settings will be configured here.
        </p>
      </div>
    </div>
  );
}
