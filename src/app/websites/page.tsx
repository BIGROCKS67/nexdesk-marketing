import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PricingSection } from "@/components/websites/PricingSection";
import { ComparisonTable } from "@/components/websites/ComparisonTable";
import { IncludedFeatures } from "@/components/websites/IncludedFeatures";
import { OptionalAddons } from "@/components/websites/OptionalAddons";
import { RecentWebsites } from "@/components/websites/RecentWebsites";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Premium custom websites from AED 2,995 — Starter, Pro, and Enterprise packages with hosting, SEO, CRM integration, and 24/7 support.",
};

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Website Development"
        title="Custom Websites Built To Convert"
        description="Premium marketing sites engineered for speed, SEO, and lead capture — choose the package that fits, then compare every detail before you book."
        video="hero"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingSection />

          <div className="mt-16 sm:mt-20">
            <ComparisonTable />
          </div>

          <IncludedFeatures />
          <OptionalAddons />
          <RecentWebsites />
        </div>
      </div>
    </>
  );
}
