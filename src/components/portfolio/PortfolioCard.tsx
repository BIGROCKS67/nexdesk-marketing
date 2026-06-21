"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/shared/Reveal";
import type { PortfolioProject } from "@/data/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <GlassCard hover className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-nx-navy to-nx-black">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-nx-black via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-nx-navy/80 text-xs font-bold text-nx-cyan">
            {project.clientName.slice(0, 2).toUpperCase()}
          </div>
          <h3 className="font-display text-lg font-bold text-white">{project.projectName}</h3>
          <p className="text-xs text-nx-grey">{project.clientName}</p>
        </div>
        <Badge className="absolute right-4 top-4 border-nx-cyan/30 bg-nx-cyan/10 text-nx-cyan">
          {project.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-nx-grey">
          <span>{project.industry}</span>
          <span>·</span>
          <span>{project.completedDate}</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-nx-grey">{project.description}</p>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white">
            Key features
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {project.features.slice(0, 4).map((f) => (
              <li
                key={f}
                className="rounded-md border border-white/5 px-2 py-0.5 text-[10px] text-nx-grey"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="mb-4 border-l-2 border-nx-cyan/40 pl-3 text-xs italic text-nx-grey">
          &ldquo;{project.testimonial}&rdquo;
        </p>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <ButtonLink
            size="sm"
            href={project.liveWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center bg-nx-cyan text-nx-black hover:bg-nx-aqua sm:w-auto"
          >
            Visit Website <ExternalLink className="ml-1 h-3 w-3" />
          </ButtonLink>
          <ButtonLink size="sm" variant="outline" href={project.caseStudyUrl} className="w-full justify-center sm:w-auto">
            View Case Study <ArrowRight className="ml-1 h-3 w-3" />
          </ButtonLink>
        </div>
      </div>
    </GlassCard>
  );
}
