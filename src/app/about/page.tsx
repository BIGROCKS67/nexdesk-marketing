import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, SectionHeading, GlassCard } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { aboutCompanyCopy, aboutFounderCopy } from "@/data/home";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NexDesk builds custom business systems, websites, AI automation, and prebuilt platforms for teams that outgrew spreadsheets.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NexDesk"
        title="Technology Built For Real Businesses"
        description="Custom systems, websites, AI automation, and prebuilt platforms — designed around how your team actually works."
        video="ambient"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Company — third person */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow={aboutCompanyCopy.eyebrow}
              title={aboutCompanyCopy.title}
            />
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm leading-relaxed text-nx-grey sm:text-base">
                {aboutCompanyCopy.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <GlassCard className="mt-12">
              <h3 className="font-display text-lg font-bold text-white">What NexDesk Delivers</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {aboutCompanyCopy.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-nx-grey">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Founder — first person */}
          <div className="mt-20 grid gap-12 border-t border-white/5 pt-20 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow={aboutFounderCopy.eyebrow}
                title={aboutFounderCopy.title}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-sm leading-relaxed text-nx-grey sm:text-base">
                {aboutFounderCopy.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <ButtonLink
                size="lg"
                href={BOOK_CONSULTATION_URL}
                className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold sm:w-auto"
              >
                Book a Free Consultation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
