import { Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/shared/Reveal";
import { includedWithEveryWebsite } from "@/data/website-pricing";

export function IncludedFeatures() {
  return (
    <section className="mt-20 sm:mt-24">
      <SectionHeading
        title="Included With Every Website"
        className="mb-8 sm:mb-10"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {includedWithEveryWebsite.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <div className="glass flex items-start gap-3 rounded-xl p-4 transition hover:border-nx-cyan/20">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nx-cyan/10">
                <Check className="h-4 w-4 text-nx-cyan" />
              </div>
              <p className="text-sm leading-snug text-nx-grey">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
