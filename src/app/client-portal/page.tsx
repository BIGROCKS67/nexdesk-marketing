import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ClientPortalMock } from "@/components/client-portal/ClientPortalMock";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "NexDesk client portal — track projects, subscriptions, invoices, support, and documentation in one place.",
};

const portalFeatures = [
  "View active projects",
  "Track progress in real time",
  "Access completed systems",
  "Manage subscriptions",
  "Download invoices",
  "View contracts",
  "Submit support tickets",
  "Monitor maintenance plans",
  "Access documentation",
  "Request new features",
];

export default function ClientPortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Portal"
        title="Everything In One Place"
        description="NexDesk clients get a secure portal to manage their relationship with us — projects, billing, support, and documentation without chasing email threads."
        video="ambient"
      />

      <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <ClientPortalMock />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {portalFeatures.map((f, i) => (
            <Reveal key={f} delay={i * 0.03}>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-nx-navy/30 px-4 py-3">
                <Check className="h-4 w-4 shrink-0 text-nx-cyan" />
                <span className="text-sm text-nx-grey">{f}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <ButtonLink
            size="lg"
            href="/client-portal/login"
            className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua sm:w-auto"
          >
            Client Login
          </ButtonLink>
          <ButtonLink size="lg" variant="outline" href={BOOK_CONSULTATION_URL} className="w-full sm:w-auto">
            Become a Client
          </ButtonLink>
        </div>
      </div>
    </div>
    </>
  );
}
