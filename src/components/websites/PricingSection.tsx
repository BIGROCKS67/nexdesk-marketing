"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";
import { websitePackages } from "@/data/website-pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {websitePackages.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.08}>
            <div
              className={cn(
                "glass group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 ease-out sm:p-8",
                "hover:-translate-y-2 hover:scale-[1.02] hover:border-nx-cyan/40 hover:shadow-[0_0_40px_rgba(0,229,255,0.14)]",
                tier.highlighted &&
                  "glow-cyan -translate-y-1 scale-[1.02] border-nx-cyan/35 shadow-[0_0_35px_rgba(0,229,255,0.12)]",
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-nx-cyan px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nx-black">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
              <p className="mt-3 font-display text-3xl font-bold text-nx-cyan">{tier.price}</p>
              <p className="mt-1 text-sm text-nx-grey">
                Hosting: <span className="text-white">{tier.hosting}</span>
              </p>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white">
                Included
              </p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-nx-grey">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-nx-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={BOOK_CONSULTATION_URL}
                className="mt-8 w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold"
              >
                Book Consultation
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
