export type ProjectCategory =
  | "Websites"
  | "CRM Systems"
  | "Client Portals"
  | "Recruitment Platforms"
  | "HR Systems"
  | "Accounting Systems"
  | "Automation";

export interface PortfolioProject {
  id: string;
  projectName: string;
  clientName: string;
  category: ProjectCategory;
  industry: string;
  description: string;
  liveWebsiteUrl: string;
  caseStudyUrl: string;
  image: string;
  technologies: string[];
  features: string[];
  servicesDelivered: string[];
  testimonial: string;
  completedDate: string;
  featured?: boolean;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const portfolioFilters = [
  "All Projects",
  "Websites",
  "CRM Systems",
  "Client Portals",
  "Recruitment Platforms",
  "HR Systems",
  "Accounting Systems",
  "Automation",
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "cowan-rutter",
    projectName: "Luxury Real Estate CRM & Website",
    clientName: "Cowan & Rutter",
    category: "Websites",
    industry: "Real Estate",
    description:
      "White-label property CRM and client-facing platform for a West London estate agency — pipeline, listings, and lead capture in one branded workspace.",
    liveWebsiteUrl: "https://cowan-rutter-demo.vercel.app",
    caseStudyUrl: "/our-work#cowan-rutter",
    image: "/portfolio/realestate.jpg",
    technologies: ["React", "Vite", "Tailwind", "AWS Lambda", "PostgreSQL"],
    features: [
      "Lead capture",
      "Property listings",
      "CRM integration",
      "SEO optimization",
    ],
    servicesDelivered: ["CRM build", "White-label branding", "Demo deployment"],
    testimonial:
      "NexDesk delivered a platform our team could actually demo to clients on day one.",
    completedDate: "2026-05",
    featured: true,
    challenge:
      "The agency needed a credible digital platform to win new instructions without a six-month enterprise rollout.",
    solution:
      "We built a white-label NexDesk CRM with their branding, property pipeline, and applicant tracking — deployed to a live demo URL within weeks.",
    results: [
      "Live demo URL for every sales conversation",
      "Unified property + applicant workflow",
      "Foundation for full production rollout",
    ],
  },
  {
    id: "nexdesk-crm",
    projectName: "NexDesk Operational CRM",
    clientName: "NexDesk Platform",
    category: "CRM Systems",
    industry: "Real Estate",
    description:
      "Full operational CRM for Dubai real estate — properties, applicants, deals, calendar, analytics, dialler, and modular NexHub integrations.",
    liveWebsiteUrl: "https://nexdesk.vercel.app",
    caseStudyUrl: "/our-work#nexdesk-crm",
    image: "/portfolio/crm.jpg",
    technologies: ["React", "TanStack Query", "Recharts", "AWS", "Vercel"],
    features: [
      "Kanban pipeline",
      "Global search",
      "Calendar & dialler",
      "Analytics dashboard",
    ],
    servicesDelivered: ["CRM architecture", "UI/UX", "API integration"],
    testimonial:
      "The cleanest CRM shell we have shown prospects — it feels like Stripe, not a template.",
    completedDate: "2026-06",
  },
  {
    id: "recruitment-platform",
    projectName: "Recruitment Management Platform",
    clientName: "Confidential Client",
    category: "Recruitment Platforms",
    industry: "Recruitment",
    description:
      "End-to-end recruitment workspace with candidate tracking, interview scheduling, job pipeline, and client-facing dashboards.",
    liveWebsiteUrl: "https://example.com",
    caseStudyUrl: "/our-work#recruitment-platform",
    image: "/portfolio/recruitment.jpg",
    technologies: ["Next.js", "PostgreSQL", "Tailwind", "Framer Motion"],
    features: [
      "Candidate tracking",
      "Interview scheduling",
      "Job pipeline",
      "Client dashboard",
    ],
    servicesDelivered: ["Platform design", "Workflow automation", "Client portal"],
    testimonial:
      "We replaced three spreadsheets and two inboxes with one system our recruiters actually use.",
    completedDate: "2026-04",
  },
  {
    id: "nexbooks",
    projectName: "Finance & Accounting Dashboard",
    clientName: "NexBooks Demo",
    category: "Accounting Systems",
    industry: "Finance",
    description:
      "Bookkeeping and finance portal with invoicing, payroll, bank reconciliation, VAT reporting, and executive dashboards.",
    liveWebsiteUrl: "https://accounts-portal-five.vercel.app",
    caseStudyUrl: "/our-work#nexbooks",
    image: "/portfolio/finance.jpg",
    technologies: ["React", "Vite", "Tailwind", "Recharts"],
    features: [
      "Invoicing",
      "Reporting",
      "Payment tracking",
      "Subscription overview",
    ],
    servicesDelivered: ["Dashboard UI", "Mock data layer", "Portal deployment"],
    testimonial:
      "Finally a finance view that leadership can read without calling the accountant.",
    completedDate: "2026-05",
  },
  {
    id: "nexconvey",
    projectName: "Client Portal System",
    clientName: "NexConvey Demo",
    category: "Client Portals",
    industry: "Professional Services",
    description:
      "Dubai conveyancing portal with transaction pipeline, document management, MOU-to-transfer workflow, and client progress tracking.",
    liveWebsiteUrl: "https://conveyancing-portal.vercel.app",
    caseStudyUrl: "/our-work#nexconvey",
    image: "/portfolio/portal.jpg",
    technologies: ["React", "Vite", "Tailwind"],
    features: [
      "Project tracking",
      "Invoices",
      "Support tickets",
      "Document access",
    ],
    servicesDelivered: ["Portal UX", "Workflow stages", "Vercel deployment"],
    testimonial:
      "Clients can see exactly where their transaction is — that alone cut support calls.",
    completedDate: "2026-05",
  },
  {
    id: "hr-portal",
    projectName: "HR Management Portal",
    clientName: "NexDesk HR Demo",
    category: "HR Systems",
    industry: "HR",
    description:
      "Employee and admin HR portal with leave management, sick leave, documents, policies, and employee self-service.",
    liveWebsiteUrl: "https://hr-portal-khaki.vercel.app",
    caseStudyUrl: "/our-work#hr-portal",
    image: "/portfolio/hr.jpg",
    technologies: ["React", "Vite", "Tailwind"],
    features: ["Leave requests", "Document vault", "Employee dashboard", "Policies"],
    servicesDelivered: ["HR portal UI", "Admin workflows", "Demo data"],
    testimonial: "HR finally has one place for leave, docs, and announcements.",
    completedDate: "2026-05",
  },
];

export const featuredProject =
  portfolioProjects.find((p) => p.featured) ?? portfolioProjects[0];
