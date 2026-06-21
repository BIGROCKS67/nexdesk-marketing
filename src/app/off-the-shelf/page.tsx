import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { RegisterInterestForm } from "@/components/off-the-shelf/RegisterInterestForm";
import { offTheShelfProducts } from "@/data/content";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Off The Shelf",
  description:
    "NexDesk off-the-shelf business systems — Real Estate CRM, HR & Payroll, Accounting, and POS launching soon.",
};

export default function OffTheShelfPage() {
  return (
    <>
      <PageHero
        eyebrow="Off The Shelf"
        title="Launching Soon"
        description="Purpose-built business systems designed to help companies streamline operations, manage teams, and scale more efficiently."
        video="grid"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <GlassCard className="mx-auto max-w-4xl p-6 text-center sm:p-8">
              <p className="text-sm leading-relaxed text-nx-grey sm:text-base">
                NexDesk is currently developing a range of off-the-shelf business systems designed to
                help companies streamline operations, manage teams and scale more efficiently. Our
                team is working closely with industry experts to ensure each product is practical,
                powerful and built around real business needs. These products will be launching
                soon.
              </p>
            </GlassCard>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offTheShelfProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <GlassCard hover className="flex h-full flex-col">
                  <h2 className="font-display text-lg font-bold text-white">{product.name}</h2>
                  <div className="mt-4">
                    {product.status === "coming-soon" ? (
                      <Badge className="border-nx-cyan/30 bg-nx-cyan/10 text-nx-cyan">
                        Coming Soon
                      </Badge>
                    ) : (
                      <Badge className="border-white/20 bg-white/5 text-white">Register Interest</Badge>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 sm:mt-20">
            <Reveal delay={0.1}>
              <RegisterInterestForm />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
