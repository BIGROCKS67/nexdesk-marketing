import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "NexDesk is building custom CRM systems, client portals, and enterprise platforms for clients across the UK and UAE.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Something Exciting Is In The Works"
        description="We're currently working hard behind the scenes on a number of exciting projects. Check back soon to see what the NexDesk team has been building."
        video="grid"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <GlassCard className="p-8 sm:p-10">
              <p className="text-sm leading-relaxed text-nx-grey sm:text-base">
                From bespoke CRM platforms and client portals to high-performance websites and
                automation systems — our team is delivering for clients across real estate,
                recruitment, finance, and professional services. We will showcase selected work here
                as projects reach launch.
              </p>
              <ButtonLink
                size="lg"
                href={BOOK_CONSULTATION_URL}
                className="mt-8 bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold"
              >
                Book a Consultation
              </ButtonLink>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </>
  );
}
