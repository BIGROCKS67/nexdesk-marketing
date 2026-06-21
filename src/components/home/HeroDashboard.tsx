"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Activity,
  TrendingUp,
} from "lucide-react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

export function HeroDashboard() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const animate = !isMobile && !reducedMotion;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 40, rotateX: 8 } : false}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-xl perspective-[1200px] lg:max-w-none"
    >
      <div className="absolute -inset-2 rounded-3xl bg-nx-cyan/10 blur-2xl sm:-inset-4 sm:blur-3xl" />
      <motion.div
        animate={animate ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass glow-cyan relative overflow-hidden rounded-xl border border-nx-cyan/20 shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/5 bg-nx-navy/80 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80 sm:h-2.5 sm:w-2.5" />
          </div>
          <span className="mx-auto truncate text-[9px] text-nx-grey sm:text-[10px]">
            app.nexdesk.io/dashboard
          </span>
        </div>

        <div className="grid grid-cols-12 gap-2 p-3 sm:gap-3 sm:p-4">
          <div className="col-span-3 hidden space-y-2 md:block">
            {[
              { icon: LayoutDashboard, label: "CRM", active: true },
              { icon: Users, label: "Projects" },
              { icon: CreditCard, label: "Payments" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Activity, label: "Activity" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] ${
                  active ? "bg-nx-cyan/10 text-nx-cyan" : "text-nx-grey"
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </div>
            ))}
          </div>

          <div className="col-span-12 space-y-2 sm:space-y-3 md:col-span-9">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { label: "Pipeline", value: "AED 4.2M", change: "+12%" },
                { label: "Active Projects", value: "24", change: "+3" },
                { label: "Subscriptions", value: "186", change: "98%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/5 bg-nx-black/40 p-2 sm:rounded-xl sm:p-2.5"
                >
                  <p className="truncate text-[8px] text-nx-grey sm:text-[9px]">{stat.label}</p>
                  <p className="font-display text-xs font-bold text-white sm:text-sm">{stat.value}</p>
                  <p className="text-[8px] text-emerald-400 sm:text-[9px]">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-white/5 bg-nx-black/40 p-2.5 sm:rounded-xl sm:p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-medium text-white sm:text-[10px]">Revenue & Activity</span>
                <TrendingUp className="h-3 w-3 text-nx-cyan" />
              </div>
              <div className="flex h-12 items-end gap-0.5 sm:h-16 sm:gap-1">
                {[40, 55, 45, 70, 60, 85, 75, 90, 65, 95, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-nx-cyan/20 to-nx-cyan"
                    style={{ height: `${h}%`, opacity: 0.4 + i * 0.05 }}
                  />
                ))}
              </div>
            </div>

            <div className="hidden space-y-1.5 sm:block">
              {[
                { client: "Whitfield Group", action: "New lead assigned", time: "2m" },
                { client: "Meridian Advisory", action: "Invoice paid", time: "14m" },
                { client: "Gulf Talent", action: "Portal login", time: "1h" },
              ].map((row) => (
                <div
                  key={row.client}
                  className="flex items-center justify-between rounded-lg border border-white/5 px-2 py-1.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-medium text-white">{row.client}</p>
                    <p className="truncate text-[9px] text-nx-grey">{row.action}</p>
                  </div>
                  <span className="shrink-0 text-[9px] text-nx-grey">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
