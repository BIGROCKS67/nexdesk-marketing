"use client";

import { VideoBackground } from "@/components/shared/VideoBackground";
import { SectionHeading } from "@/components/shared/Reveal";
import type { BackgroundVideoKey } from "@/data/videos";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  video?: BackgroundVideoKey;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  video = "ambient",
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/5", className)}>
      <VideoBackground video={video} overlay="section" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </section>
  );
}
