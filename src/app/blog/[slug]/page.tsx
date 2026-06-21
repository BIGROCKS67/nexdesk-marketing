import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { GlassCard } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button-link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ButtonLink variant="ghost" href="/blog" className="mb-8 -ml-2 text-nx-grey">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </ButtonLink>

        <p className="text-xs text-nx-grey">
          {post.category} · {post.readTime} · {post.date}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-nx-grey">{post.excerpt}</p>

        <GlassCard className="mt-10 space-y-4 text-sm leading-relaxed text-nx-grey">
          <p>
            At NexDesk, we see this pattern across real estate, recruitment, finance, and
            professional services: teams start with spreadsheets and generic SaaS, then hit a wall
            when operations outpace the tools.
          </p>
          <p>
            Custom systems are not about building for the sake of it — they are about removing the
            friction that costs you leads, hours, and client trust every week.
          </p>
          <p>
            If you are evaluating your next technology move, start with a workflow audit: map where
            data lives, where handoffs break, and what leadership cannot see in real time. That
            clarity alone often pays for the build.
          </p>
          <p className="text-white font-medium">
            Ready to explore a custom NexDesk system for your business?{" "}
            <Link href="/contact" className="text-nx-cyan hover:underline">
              Book a free consultation
            </Link>
            .
          </p>
        </GlassCard>
      </div>
    </article>
  );
}
