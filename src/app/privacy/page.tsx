import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" video="ambient" />
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GlassCard>
            <p className="text-sm leading-relaxed text-nx-grey">
              NexDesk respects your privacy. We collect only the information required to respond to
              enquiries, deliver services, and improve our platforms. Full policy documentation is
              available on request — contact us via Book Consultation for details.
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
