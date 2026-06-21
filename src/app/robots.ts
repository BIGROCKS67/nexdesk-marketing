import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.GITHUB_PAGES === "true"
    ? "https://mynexdesk.com"
    : "https://nexdesk-marketing.vercel.app");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
