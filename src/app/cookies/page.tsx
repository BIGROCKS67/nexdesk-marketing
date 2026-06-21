import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" video="ambient" />
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GlassCard>
            <p className="text-sm leading-relaxed text-nx-grey">
              NexDesk uses essential cookies to keep the site secure and functional. Analytics may
              be used to understand how visitors use our website. You can manage cookie preferences
              in your browser settings at any time.
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
