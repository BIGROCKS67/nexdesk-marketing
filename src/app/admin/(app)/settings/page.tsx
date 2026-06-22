import { PortalPageHeader } from "@/components/portal/PortalUI";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader title="Admin Settings" description="Team and integration settings." />
      <div className="glass max-w-xl rounded-xl p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-white">Integrations</h2>
        <p className="mt-2 text-sm text-nx-grey">
          Stripe webhook at <code className="text-nx-cyan">/api/stripe/webhook</code> · Billing portal · Finance API at{" "}
          <code className="text-nx-cyan">/api/finance/reports</code>. Set env vars per .env.example on Vercel.
        </p>
      </div>
    </div>
  );
}
