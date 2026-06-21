"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { NexDeskLogo } from "@/components/brand/NexDeskLogo";
import { useClientPortal, useRequireClientAuth } from "@/contexts/ClientPortalContext";
import { clientPortalNav } from "@/data/portal/navigation";
import { allSupportTickets } from "@/data/portal/mock-data";
import { cn } from "@/lib/utils";

const navIcons = {
  LayoutDashboard,
  CreditCard,
  Wallet,
  MessageSquare,
  Settings,
};

export function PortalShell({ children }: { children: React.ReactNode }) {
  const { logout, session } = useClientPortal();
  const { isReady } = useRequireClientAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadSupport = allSupportTickets
    .filter((t) => t.clientId === session?.clientId)
    .reduce((sum, t) => sum + t.unreadByClient, 0);

  if (!isReady || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-nx-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nx-cyan border-t-transparent" />
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/5 p-5">
        <Link href="/client-portal/app/dashboard">
          <NexDeskLogo size={32} />
        </Link>
        <p className="mt-3 text-xs text-nx-grey">Client Portal</p>
        <p className="mt-1 font-display text-sm font-semibold text-white">{session.name}</p>
        <p className="mt-0.5 text-[11px] text-nx-grey">Central hub · all your businesses</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {clientPortalNav.map(({ label, href, icon }) => {
          const Icon = navIcons[icon as keyof typeof navIcons];
          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`) ||
            (label === "Dashboard" && pathname.includes("/products/"));
          const badge = label === "Support" && unreadSupport > 0 ? unreadSupport : null;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-nx-cyan/10 font-medium text-nx-cyan"
                  : "text-nx-grey hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-nx-cyan px-1 text-[10px] font-bold text-nx-black">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/5 p-3">
        <button
          type="button"
          onClick={() => {
            logout();
            window.location.href = "/client-portal/login";
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-nx-grey transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-nx-black">
      <aside className="hidden w-60 shrink-0 border-r border-white/5 bg-nx-navy/40 xl:w-64 lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-nx-black/70 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-64 border-r border-white/5 bg-nx-navy">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-white/5 bg-nx-black/80 px-4 backdrop-blur-xl lg:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-nx-grey lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm lg:block">
            <span className="text-white">{session.name}</span>
            <span className="text-nx-grey"> · Your NexDesk hub</span>
          </p>
          <Link href="/" className="text-xs text-nx-grey hover:text-nx-cyan">
            Back to website
          </Link>
        </header>
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
