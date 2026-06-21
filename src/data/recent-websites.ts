export interface RecentWebsite {
  id: string;
  companyName: string;
  projectName: string;
  industry: string;
  businessType: string;
  description: string;
  liveWebsiteUrl: string;
  completedDate: string;
}

export const recentWebsites: RecentWebsite[] = [
  {
    id: "cowan-rutter",
    companyName: "Cowan & Rutter",
    projectName: "Luxury Real Estate Website & CRM",
    industry: "Real Estate",
    businessType: "Estate Agency",
    description:
      "Premium property marketing site with integrated lead capture and white-label CRM demo for West London listings.",
    liveWebsiteUrl: "https://cowan-rutter-demo.vercel.app",
    completedDate: "2026-05",
  },
  {
    id: "nexconvey",
    companyName: "NexConvey",
    projectName: "Conveyancing Client Portal",
    industry: "Professional Services",
    businessType: "Conveyancing Firm",
    description:
      "Client-facing portal for transaction tracking, document access, and progress updates across MOU to transfer.",
    liveWebsiteUrl: "https://conveyancing-portal.vercel.app",
    completedDate: "2026-05",
  },
  {
    id: "nexbooks",
    companyName: "NexBooks",
    projectName: "Finance & Accounting Portal",
    industry: "Finance",
    businessType: "Accounting Practice",
    description:
      "Executive finance dashboard with invoicing overview, reporting, and subscription management for SME clients.",
    liveWebsiteUrl: "https://accounts-portal-five.vercel.app",
    completedDate: "2026-04",
  },
  {
    id: "hr-portal",
    companyName: "NexDesk HR",
    projectName: "HR Management Portal",
    industry: "HR",
    businessType: "Corporate HR",
    description:
      "Employee self-service portal with leave management, documents, policies, and admin workflows.",
    liveWebsiteUrl: "https://hr-portal-khaki.vercel.app",
    completedDate: "2026-04",
  },
  {
    id: "recruitment",
    companyName: "Gulf Talent",
    projectName: "Recruitment Platform Website",
    industry: "Recruitment",
    businessType: "Recruitment Agency",
    description:
      "Candidate-facing careers site with job listings, application flows, and employer brand presentation.",
    liveWebsiteUrl: "https://example.com",
    completedDate: "2026-03",
  },
];

export const websiteIndustries = [
  "All Industries",
  ...Array.from(new Set(recentWebsites.map((w) => w.industry))).sort(),
];
