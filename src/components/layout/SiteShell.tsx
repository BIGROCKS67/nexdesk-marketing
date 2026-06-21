"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalApp =
    pathname?.startsWith("/client-portal/login") ||
    pathname?.startsWith("/client-portal/app") ||
    pathname?.startsWith("/admin");

  if (isPortalApp) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}
