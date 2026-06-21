export const websitePricing = [
  {
    name: "Starter Website",
    price: "From AED 3,500",
    features: [
      "1–5 Pages",
      "Responsive Design",
      "Contact Forms",
      "SEO Foundations",
      "Basic Animations",
    ],
  },
  {
    name: "Business Website",
    price: "From AED 7,500",
    highlighted: true,
    features: [
      "Up to 10 Pages",
      "Blog Setup",
      "CMS Integration",
      "Analytics",
      "Advanced SEO Structure",
      "Lead Capture Systems",
    ],
  },
  {
    name: "Premium Website",
    price: "From AED 15,000",
    features: [
      "Fully Custom Design",
      "Client Portal Integration",
      "CRM Integration",
      "Custom Features",
      "Advanced Animations",
      "Enterprise Performance",
    ],
  },
] as const;

export const contactFaqs = [
  {
    q: "How long does a project take?",
    a: "Websites typically launch in 3–6 weeks. Custom platforms range from 8–16 weeks depending on scope. We provide a clear timeline after discovery.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. We offer maintenance retainers covering hosting, updates, bug fixes, and feature requests.",
  },
  {
    q: "Can you integrate with our existing systems?",
    a: "Absolutely. We integrate with Xero, HubSpot, Zapier, Google Workspace, Stripe, and most APIs your stack already uses.",
  },
  {
    q: "Do you build mobile applications?",
    a: "We build responsive web apps and progressive web apps. Native iOS/Android can be scoped as a separate phase if required.",
  },
  {
    q: "Can we request additional features later?",
    a: "Yes. Our systems are built to extend. Most clients add modules after launch as their operations evolve.",
  },
  {
    q: "Do you offer hosting and maintenance?",
    a: "We deploy to enterprise-grade hosting (Vercel, AWS) and manage SSL, backups, and monitoring on retainer.",
  },
  {
    q: "Can clients access their project progress online?",
    a: "Yes. NexDesk clients use our client portal to track builds, invoices, documentation, and support tickets.",
  },
  {
    q: "Can we link live client websites in the portfolio?",
    a: "Yes. Our portfolio is data-driven — each project has editable liveWebsiteUrl and caseStudyUrl fields.",
  },
] as const;

export const CONTACT_EMAIL = "hello@nexdesk.app";
export const CONTACT_PHONE = "+971 00 000 0000";
export const CONTACT_WHATSAPP = "971000000000";
export const CONTACT_HOURS = "Mon–Fri, 9:00–18:00 GST";
export const CONTACT_OFFICE = "Dubai, UAE · London, UK";

export const bespokeSystemOptions = [
  "CRM Systems",
  "Mobile Applications",
  "HR & Payroll Systems",
  "Accounting & Invoicing Software",
  "Recruitment Platforms",
  "Mortgage Broker Platforms",
  "Conveyancing Case Management Systems",
  "Booking & Scheduling Systems",
  "POS Systems",
  "Custom Business Management Software",
  "Other Bespoke Software Solution",
] as const;

export const offTheShelfProducts = [
  { id: "real-estate-crm", name: "Real Estate CRM", status: "coming-soon" as const },
  { id: "hr-payroll", name: "HR & Payroll System", status: "register" as const },
  { id: "accounting", name: "Accounting & Invoicing Software", status: "register" as const },
  { id: "pos", name: "POS System", status: "coming-soon" as const },
] as const;
