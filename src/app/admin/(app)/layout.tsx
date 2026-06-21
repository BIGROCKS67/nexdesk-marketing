import { AdminShell } from "@/components/admin-portal/AdminShell";

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
