import { PortalShell } from "@/components/client-portal-app/PortalShell";

export default function ClientPortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
