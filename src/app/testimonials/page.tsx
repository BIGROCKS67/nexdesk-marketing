import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What NexDesk clients say about our custom CRM, portal, and website builds.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trusted By Operators Who Demand More"
        description="From real estate and recruitment to finance and construction — teams choose NexDesk when off-the-shelf software stops fitting."
        video="grid"
      />

      <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <GlassCard hover className="flex h-full flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-nx-cyan text-nx-cyan" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nx-grey">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-white/5 pt-4">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-nx-grey">
                    {t.role}, {t.company}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
