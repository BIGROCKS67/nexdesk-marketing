import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calculator,
  Globe,
  CreditCard,
  Workflow,
  BarChart3,
  Code2,
  Monitor,
} from "lucide-react";

export const solutions = [
  {
    id: "crm",
    title: "CRM Systems",
    description:
      "Custom pipelines, lead management, and reporting built around how your team actually sells — not generic SaaS defaults.",
    icon: LayoutDashboard,
  },
  {
    id: "hr",
    title: "HR Platforms",
    description:
      "Leave, documents, onboarding, and employee self-service in one secure portal your HR team controls.",
    icon: Users,
  },
  {
    id: "recruitment",
    title: "Recruitment Platforms",
    description:
      "Candidate tracking, interview scheduling, and client dashboards designed for high-volume recruitment desks.",
    icon: Briefcase,
  },
  {
    id: "accounting",
    title: "Accounting Systems",
    description:
      "Invoicing, payroll, reconciliation, and executive reporting — tailored to your finance workflows.",
    icon: Calculator,
  },
  {
    id: "portals",
    title: "Client Portals",
    description:
      "Branded client hubs for project progress, documents, invoices, and support — reducing email chaos.",
    icon: Globe,
  },
  {
    id: "subscriptions",
    title: "Subscription Platforms",
    description:
      "Recurring billing, plan management, and customer lifecycle tools for membership and SaaS businesses.",
    icon: CreditCard,
  },
  {
    id: "automation",
    title: "Workflow Automation",
    description:
      "Connect your tools, eliminate manual handoffs, and automate the repetitive work draining your team.",
    icon: Workflow,
  },
  {
    id: "dashboards",
    title: "Internal Dashboards",
    description:
      "Real-time operational visibility — KPIs, alerts, and role-based views leadership can trust.",
    icon: BarChart3,
  },
  {
    id: "custom",
    title: "Custom Business Software",
    description:
      "When off-the-shelf does not fit, we design and build systems around your exact process.",
    icon: Code2,
  },
  {
    id: "websites",
    title: "Website Development",
    description:
      "High-performance marketing sites and landing pages engineered to convert enterprise and mid-market buyers.",
    icon: Monitor,
  },
] as const;

export const processSteps = [
  { step: "01", title: "Discovery", detail: "We map your workflows, pain points, and success metrics." },
  { step: "02", title: "Strategy", detail: "Architecture, scope, and phased delivery plan aligned to ROI." },
  { step: "03", title: "UX/UI Design", detail: "Premium interfaces your team will want to use daily." },
  { step: "04", title: "Development", detail: "Agile builds with weekly demos and transparent progress." },
  { step: "05", title: "Testing", detail: "QA across devices, roles, and edge cases before launch." },
  { step: "06", title: "Launch", detail: "Deployment, training, and handover documentation." },
  { step: "07", title: "Ongoing Support", detail: "Retainers for maintenance, features, and optimisation." },
] as const;

export const industries = [
  "Real Estate",
  "Recruitment",
  "Finance",
  "Accounting",
  "HR",
  "Professional Services",
  "Construction",
  "Hospitality",
  "E-Commerce",
  "Education",
] as const;

export const trustItems = [
  "Custom CRM Development",
  "HR Systems",
  "Client Portals",
  "Business Automation",
  "Recruitment Platforms",
  "Accounting Software",
  "Enterprise Websites",
] as const;
