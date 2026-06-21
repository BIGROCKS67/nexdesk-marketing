"use client";

import { ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredProject } from "@/data/portfolio";
import { Reveal } from "@/components/shared/Reveal";

export function FeaturedProject() {
  const p = featuredProject;
  return (
    <Reveal>
      <div className="glass glow-cyan overflow-hidden rounded-3xl border border-nx-cyan/15">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[220px] bg-gradient-to-br from-nx-navy via-nx-black to-nx-navy sm:min-h-[280px] lg:min-h-[420px]">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="glass rounded-2xl p-5 text-center sm:p-8">
                <p className="text-xs uppercase tracking-widest text-nx-cyan">Featured Project</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{p.projectName}</p>
                <p className="mt-1 text-sm text-nx-grey">{p.clientName}</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-nx-cyan">
              Case Study
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">{p.projectName}</h3>

            {p.challenge && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase text-white">Challenge</p>
                <p className="mt-2 text-sm leading-relaxed text-nx-grey">{p.challenge}</p>
              </div>
            )}
            {p.solution && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-white">Solution</p>
                <p className="mt-2 text-sm leading-relaxed text-nx-grey">{p.solution}</p>
              </div>
            )}
            {p.results && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-white">Results</p>
                <ul className="mt-2 space-y-1">
                  {p.results.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-nx-grey">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-nx-cyan" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/5 px-2 py-0.5 text-[10px] text-nx-grey"
                >
                  {t}
                </span>
              ))}
            </div>

            <ButtonLink
              href={p.liveWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua sm:mt-8 sm:w-auto"
            >
              Visit Live Website <ExternalLink className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
