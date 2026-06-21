"use client";

import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  FileText,
  LifeBuoy,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

const sidebar = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: CreditCard, label: "Subscriptions" },
  { icon: FileText, label: "Invoices" },
  { icon: LifeBuoy, label: "Support" },
  { icon: BookOpen, label: "Documentation" },
];

const widgets = [
  { title: "Project Progress", value: "78%", sub: "Elite Lux OS rollout" },
  { title: "Upcoming Payments", value: "AED 12,400", sub: "Due in 5 days" },
  { title: "Active Services", value: "4", sub: "CRM, Portal, HR, Website" },
  { title: "Support Tickets", value: "1 open", sub: "Avg response 2h" },
];

export function ClientPortalMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass glow-cyan overflow-hidden rounded-2xl border border-nx-cyan/15"
    >
      <div className="grid md:grid-cols-[200px_1fr]">
        <div className="hidden border-r border-white/5 bg-nx-navy/60 p-4 md:block">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-nx-cyan">
            Client Portal
          </p>
          <nav className="space-y-1">
            {sidebar.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                  active ? "bg-nx-cyan/10 text-nx-cyan" : "text-nx-grey"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-5">
          <p className="font-display text-lg font-bold text-white">Welcome back, Sarah</p>
          <p className="text-xs text-nx-grey">Here is an overview of your active NexDesk services.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {widgets.map((w) => (
              <div
                key={w.title}
                className="rounded-xl border border-white/5 bg-nx-black/40 p-4"
              >
                <p className="text-[10px] uppercase tracking-wider text-nx-grey">{w.title}</p>
                <p className="mt-1 font-display text-xl font-bold text-white">{w.value}</p>
                <p className="mt-0.5 text-[10px] text-nx-grey">{w.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-nx-black/40 p-4">
            <p className="text-xs font-semibold text-white">Recent Updates</p>
            <ul className="mt-2 space-y-2">
              {[
                "CRM Phase 2 deployed to staging",
                "Invoice #1042 available for download",
                "Support ticket #88 resolved",
              ].map((u) => (
                <li key={u} className="flex items-center gap-2 text-[11px] text-nx-grey">
                  <span className="h-1 w-1 rounded-full bg-nx-cyan" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
