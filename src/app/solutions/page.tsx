import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { solutions } from "@/data/solutions";
import { BespokeContactForm } from "@/components/contact/BespokeContactForm";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Bespoke Systems",
  description:
    "CRM systems, HR platforms, recruitment software, accounting tools, client portals, and custom business software by NexDesk.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Bespoke Systems"
        title="Enterprise Systems, Built To Spec"
        description="Every engagement starts with your workflows — not a product catalogue. These are the platforms we design, build, and support for mid-market and enterprise clients."
        video="ambient"
      />

      <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={i * 0.04}>
                <GlassCard hover className="group h-full scroll-mt-24" id={s.id}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-white">{s.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-nx-grey">{s.description}</p>
                      <Link
                        href={BOOK_CONSULTATION_URL}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-nx-cyan hover:underline"
                      >
                        Discuss this solution <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-20">
          <Reveal delay={0.1}>
            <BespokeContactForm />
          </Reveal>
        </div>
      </div>
    </div>
    </>
  );
}
