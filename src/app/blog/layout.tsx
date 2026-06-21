import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "NexDesk insights on CRM, client portals, automation, and custom business software.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
