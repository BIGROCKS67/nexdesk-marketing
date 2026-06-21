import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description: "NexDesk portfolio — CRM systems, client portals, websites, and automation platforms.",
};

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
