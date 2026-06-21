export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogCategories = [
  "All",
  "CRM",
  "Automation",
  "Client Portals",
  "Recruitment",
  "Strategy",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "custom-crm-vs-generic",
    title: "Why Custom CRM Systems Outperform Generic Solutions",
    excerpt:
      "Off-the-shelf CRMs force your team to adapt. Custom systems adapt to your team — and that difference compounds over time.",
    category: "CRM",
    date: "2026-06-10",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "future-of-client-portals",
    title: "The Future of Client Portals",
    excerpt:
      "Clients expect transparency. Branded portals that show progress, documents, and billing reduce friction and support load.",
    category: "Client Portals",
    date: "2026-06-05",
    readTime: "5 min",
  },
  {
    slug: "recruitment-automation",
    title: "Streamlining Recruitment Through Automation",
    excerpt:
      "From candidate intake to placement — where automation saves hours without losing the human touch recruiters need.",
    category: "Recruitment",
    date: "2026-05-28",
    readTime: "7 min",
  },
  {
    slug: "custom-vs-off-the-shelf",
    title: "Custom Software vs Off-The-Shelf Platforms",
    excerpt:
      "A practical framework for deciding when to buy, when to build, and when to combine both.",
    category: "Strategy",
    date: "2026-05-20",
    readTime: "8 min",
  },
  {
    slug: "systems-that-scale",
    title: "Building Systems That Scale With Your Business",
    excerpt:
      "Architecture decisions early that prevent expensive rebuilds when you hit your next growth phase.",
    category: "Strategy",
    date: "2026-05-12",
    readTime: "6 min",
  },
  {
    slug: "technology-stack",
    title: "Choosing The Right Business Technology Stack",
    excerpt:
      "How we evaluate tools, integrations, and build-vs-buy for mid-market and enterprise clients.",
    category: "Automation",
    date: "2026-05-01",
    readTime: "9 min",
  },
];
