"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { blogPosts, blogCategories } from "@/data/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const featured = blogPosts.find((p) => p.featured);
  const filtered = blogPosts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && !p.featured;
  });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights On Systems, Software & Scale"
        description="Practical thinking on CRM, automation, client portals, and building technology that grows with your business."
        video="ambient"
      />

      <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nx-grey" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  category === c
                    ? "border-nx-cyan/40 bg-nx-cyan/10 text-nx-cyan"
                    : "border-white/10 text-nx-grey hover:text-white",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <Reveal>
            <GlassCard className="mb-10 overflow-hidden p-0">
              <div className="grid md:grid-cols-2">
                <div className="flex min-h-[200px] items-center justify-center bg-gradient-to-br from-nx-navy to-nx-black p-8">
                  <Badge className="border-nx-cyan/30 bg-nx-cyan/10 text-nx-cyan">
                    Featured
                  </Badge>
                </div>
                <div className="p-8">
                  <p className="text-xs text-nx-grey">
                    {featured.category} · {featured.readTime} · {featured.date}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm text-nx-grey">{featured.excerpt}</p>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-nx-cyan hover:underline"
                  >
                    Read article <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <GlassCard hover className="flex h-full flex-col">
                <p className="text-xs text-nx-grey">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm text-nx-grey">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-nx-cyan hover:underline"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <GlassCard className="mt-16 text-center">
            <h3 className="font-display text-xl font-bold text-white">Stay ahead of the curve</h3>
            <p className="mt-2 text-sm text-nx-grey">
              Monthly insights on CRM, automation, and custom software — no spam.
            </p>
            <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="you@company.com" />
              <Button className="bg-nx-cyan text-nx-black hover:bg-nx-aqua shrink-0">
                Subscribe
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
    </>
  );
}
