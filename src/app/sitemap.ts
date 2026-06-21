import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.GITHUB_PAGES === "true"
    ? "https://mynexdesk.com"
    : "https://nexdesk-marketing.vercel.app");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/solutions",
    "/websites",
    "/off-the-shelf",
    "/our-work",
    "/testimonials",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/client-portal/login",
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
