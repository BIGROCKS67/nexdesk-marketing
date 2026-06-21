import type { Metadata } from "next";
import { ClientPortalLoginForm } from "@/components/client-portal-app/ClientPortalLoginForm";

export const metadata: Metadata = {
  title: "Client Portal Login",
  description: "Sign in to the NexDesk client portal to view projects, analytics, and billing.",
};

export default function ClientPortalLoginPage() {
  return <ClientPortalLoginForm />;
}
