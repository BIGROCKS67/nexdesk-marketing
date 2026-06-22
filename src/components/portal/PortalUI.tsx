import { cn } from "@/lib/utils";
import type { PaymentStatus, ProjectStatus, SubscriptionStatus, SupportStatus, WebsiteStatus } from "@/data/portal/types";

const styles: Record<string, string> = {
  "In Progress": "bg-nx-cyan/10 text-nx-cyan border-nx-cyan/30",
  Review: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Not Started": "bg-white/5 text-nx-grey border-white/10",
  "On Hold": "bg-red-500/10 text-red-400 border-red-500/30",
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  inactive: "bg-white/5 text-nx-grey border-white/10",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  past_due: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Due: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Overdue: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Failed: "bg-red-500/10 text-red-400 border-red-500/30",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "In Build": "bg-nx-cyan/10 text-nx-cyan border-nx-cyan/30",
  Maintenance: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Suspended: "bg-red-500/10 text-red-400 border-red-500/30",
  Open: "bg-nx-cyan/10 text-nx-cyan border-nx-cyan/30",
  "Waiting for Reply": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  New: "bg-nx-cyan/10 text-nx-cyan border-nx-cyan/30",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Qualified: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Converted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Lost: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus | SubscriptionStatus | PaymentStatus | WebsiteStatus | SupportStatus | string;
  className?: string;
}) {
  const key = status in styles ? status : "In Progress";
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        styles[key],
        className,
      )}
    >
      {status}
    </span>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-nx-navy", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-nx-cyan to-nx-aqua transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function PortalStatCard({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: string;
  sub?: string;
  href?: string;
}) {
  const inner = (
    <div className="glass rounded-xl p-5 transition hover:border-nx-cyan/20">
      <p className="text-xs uppercase tracking-wider text-nx-grey">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-nx-cyan">{sub}</p>}
    </div>
  );
  if (href) {
    return <a href={href}>{inner}</a>;
  }
  return inner;
}

export function PortalPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h1>
      {description && <p className="mt-1 text-sm text-nx-grey">{description}</p>}
    </div>
  );
}
