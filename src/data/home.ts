import { Cpu, Globe, Package } from "lucide-react";

export const homeMetrics = [
  { value: "140+", label: "Businesses Helped" },
  { value: "2.4M+", label: "Leads Generated" },
  { value: "24/7", label: "Lead Engagement" },
  { value: "98%", label: "Client Retention" },
  { value: "50+", label: "Systems Delivered" },
] as const;

export const homeServices = [
  {
    title: "Custom Systems",
    description:
      "Bespoke CRM, HR, accounting, and workflow platforms built around how your team actually operates — not generic software defaults.",
    href: "/solutions",
    icon: Cpu,
  },
  {
    title: "Websites",
    description:
      "High-performance marketing sites and landing pages engineered to convert — with hosting, SEO, and optional portal integration.",
    href: "/websites",
    icon: Globe,
  },
  {
    title: "Prebuilt Systems",
    description:
      "Ready-to-deploy platforms developed by the NexDesk team and industry experts — live in days, not months.",
    href: "/off-the-shelf",
    icon: Package,
  },
] as const;

export const homeProcessSteps = [
  {
    step: "01",
    title: "Book a Consultation",
    detail: "Tell us about your business, goals, and the systems holding you back.",
  },
  {
    step: "02",
    title: "Discovery Call",
    detail: "We map your workflows, pain points, and define what success looks like.",
  },
  {
    step: "03",
    title: "UI/UX Design",
    detail: "Premium interfaces your team will want to use — scoped and signed off before build.",
  },
  {
    step: "04",
    title: "Final Development",
    detail: "Agile build with weekly demos, transparent progress, and rigorous testing.",
  },
  {
    step: "05",
    title: "Launch",
    detail: "Deployment, training, and handover — your system goes live with confidence.",
  },
  {
    step: "06",
    title: "24/7 Support",
    detail: "Ongoing maintenance, updates, and support so your platform keeps performing.",
  },
] as const;

export const aboutCompanyCopy = {
  eyebrow: "About NexDesk",
  title: "Technology Built For Real Businesses",
  paragraphs: [
    "NexDesk is a technology consultancy specialising in custom business systems, high-performance websites, and AI automation solutions. The team works with companies across the UK, UAE, and beyond — replacing spreadsheets, disconnected tools, and manual admin with software designed around how each business actually operates.",
    "From bespoke CRM and HR platforms to client portals, subscription billing, and workflow automation, every project is scoped, designed, and delivered with a focus on usability, scalability, and measurable ROI. NexDesk also offers a growing range of prebuilt systems — developed in-house and with industry-leading partners — ready for businesses to deploy today.",
    "Whether you need a fully custom build or a proven platform configured for your team, NexDesk delivers technology that people actually want to use.",
  ],
  highlights: [
    "Custom CRM, HR, accounting, and recruitment platforms",
    "Client portals with subscriptions, billing, and support",
    "AI automation and workflow integrations",
    "Enterprise websites with hosting and maintenance",
    "Prebuilt systems ready to deploy",
  ],
};

export const aboutFounderCopy = {
  eyebrow: "From Our Founder",
  title: "Built From Frustration, Driven By Results",
  paragraphs: [
    "I started out as a business owner across several industries — recruitment, property, professional services — and the same problem kept showing up everywhere: the systems were either outdated, poorly implemented, or simply didn't exist.",
    "Spreadsheets, WhatsApp threads, and disconnected SaaS tools were running businesses that deserved better. So I started building my own — CRMs for my sales teams, portals for my clients, dashboards my leadership could actually read. What began as internal tools for my own companies quickly became something bigger.",
    "Other business owners started asking for the same thing. That passion for solving real operational problems through technology is why I founded NexDesk — to give every business access to the kind of systems I wished I'd had from day one.",
  ],
};
