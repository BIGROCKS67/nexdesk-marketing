"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { recentWebsites, websiteIndustries } from "@/data/recent-websites";
import { cn } from "@/lib/utils";

export function RecentWebsites() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const sorted = [...recentWebsites].sort((a, b) => b.completedDate.localeCompare(a.completedDate));
    if (!query.trim() || query === "All Industries") return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      (w) =>
        w.industry.toLowerCase().includes(q) ||
        w.businessType.toLowerCase().includes(q) ||
        w.companyName.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className="mt-20 sm:mt-24">
      <SectionHeading
        title="Recent Websites We've Built"
        description="Browse live client websites by industry — from real estate and finance to HR and professional services."
        className="mb-8 sm:mb-10"
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nx-grey" />
          <Input
            placeholder="Search by industry..."
            value={query === "All Industries" ? "" : query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {websiteIndustries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setQuery(ind === "All Industries" ? "" : ind)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                (ind === "All Industries" && !query) || query === ind
                  ? "border-nx-cyan/40 bg-nx-cyan/10 text-nx-cyan"
                  : "border-white/10 text-nx-grey hover:border-white/20 hover:text-white",
              )}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-nx-grey">No websites match that industry. Try another search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.04}>
              <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-nx-cyan/25 hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-nx-navy to-nx-black">
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nx-black via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-nx-cyan">
                      {project.industry}
                    </p>
                    <p className="text-xs text-nx-grey">{project.businessType}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-nx-cyan">
                    {project.companyName}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-white">{project.projectName}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-nx-grey">{project.description}</p>
                  <p className="mt-3 text-[10px] text-nx-grey">Completed {project.completedDate}</p>
                  <ButtonLink
                    size="sm"
                    href={project.liveWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full justify-center bg-nx-cyan text-nx-black hover:bg-nx-aqua"
                  >
                    Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
