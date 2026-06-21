import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" video="ambient" />
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GlassCard>
            <p className="text-sm leading-relaxed text-nx-grey">
              These terms govern use of NexDesk websites, platforms, and services. Project-specific
              agreements, SLAs, and scope documents are provided during onboarding. Contact NexDesk
              for a copy of our standard terms.
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
