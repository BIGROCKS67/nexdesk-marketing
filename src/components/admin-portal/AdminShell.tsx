"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Wallet,
  Globe,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { NexDeskLogo } from "@/components/brand/NexDeskLogo";
import { useAdminPortal, useRequireAdminAuth } from "@/contexts/AdminPortalContext";
import { adminPortalNav } from "@/data/portal/navigation";
import { allSupportTickets } from "@/data/portal/mock-data";
import { cn } from "@/lib/utils";

const navIcons = {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Wallet,
  Globe,
  MessageSquare,
  Settings,
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { logout, session } = useAdminPortal();
  const { isReady } = useRequireAdminAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSupport = allSupportTickets.filter((t) => t.status !== "Resolved").length;

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
        <Link href="/admin/dashboard">
          <NexDeskLogo size={32} />
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-nx-cyan" />
          <p className="text-xs font-semibold uppercase tracking-wider text-nx-cyan">Admin Portal</p>
        </div>
        <p className="mt-2 font-display text-sm font-semibold text-white">{session.name}</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {adminPortalNav.map(({ label, href, icon }) => {
          const Icon = navIcons[icon as keyof typeof navIcons];
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const badge = label === "Support" && openSupport > 0 ? openSupport : null;
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
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-nx-black">
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
            window.location.href = "/admin/login";
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
          <p className="hidden text-sm text-nx-grey lg:block">
            Internal team · <span className="text-white">{session.email}</span>
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
