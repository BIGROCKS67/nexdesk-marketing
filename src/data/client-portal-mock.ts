export const portalNav = [
  { label: "Dashboard", href: "/client-portal/app/dashboard" },
  { label: "Analytics", href: "/client-portal/app/analytics" },
  { label: "Projects", href: "/client-portal/app/projects" },
  { label: "Subscriptions", href: "/client-portal/app/subscriptions" },
  { label: "Payments", href: "/client-portal/app/payments" },
] as const;

export const dashboardStats = [
  { label: "Active Projects", value: "3", change: "2 in build phase" },
  { label: "Overall Progress", value: "68%", change: "+12% this month" },
  { label: "Open Invoices", value: "1", change: "Due in 5 days" },
  { label: "Active Subscriptions", value: "4", change: "All current" },
];

export const recentUpdates = [
  { date: "16 Jun 2026", title: "Website Phase 2 approved", project: "Corporate Website" },
  { date: "14 Jun 2026", title: "CRM staging environment live", project: "CRM Platform" },
  { date: "10 Jun 2026", title: "Invoice #1042 issued", project: "Account" },
  { date: "08 Jun 2026", title: "Portal login module completed", project: "Client Portal" },
];

export const analyticsData = {
  summary: [
    { label: "Site Sessions (30d)", value: "12,480", trend: "+18%" },
    { label: "Lead Conversions", value: "186", trend: "+9%" },
    { label: "Portal Logins", value: "342", trend: "+22%" },
    { label: "Avg. Response Time", value: "2.1h", trend: "-15%" },
  ],
  chart: [42, 55, 48, 70, 62, 85, 78, 92, 88, 95, 90, 100],
};

export const clientProjects = [
  {
    id: "1",
    name: "Corporate Website",
    status: "In Progress",
    progress: 72,
    phase: "Development",
    nextMilestone: "Content review — 22 Jun",
  },
  {
    id: "2",
    name: "CRM Platform",
    status: "In Progress",
    progress: 58,
    phase: "Staging",
    nextMilestone: "UAT sign-off — 28 Jun",
  },
  {
    id: "3",
    name: "Client Portal",
    status: "In Progress",
    progress: 45,
    phase: "Design",
    nextMilestone: "Wireframe approval — 20 Jun",
  },
];

export const subscriptions = [
  {
    name: "Website Hosting — Pro",
    plan: "Pro",
    status: "Active",
    renewal: "1 Jul 2026",
    amount: "AED 72/mo",
  },
  {
    name: "CRM Platform Licence",
    plan: "Enterprise",
    status: "Active",
    renewal: "15 Jul 2026",
    amount: "AED 1,200/mo",
  },
  {
    name: "Priority Support",
    plan: "24/7",
    status: "Active",
    renewal: "1 Aug 2026",
    amount: "AED 450/mo",
  },
  {
    name: "Maintenance Retainer",
    plan: "Standard",
    status: "Active",
    renewal: "1 Jul 2026",
    amount: "AED 350/mo",
  },
];

export const payments = [
  { id: "INV-1042", date: "10 Jun 2026", description: "CRM Phase 2 — Milestone", amount: "AED 18,500", status: "Due" },
  { id: "INV-1038", date: "28 May 2026", description: "Website — Deposit", amount: "AED 2,497", status: "Paid" },
  { id: "INV-1031", date: "15 May 2026", description: "Portal — Discovery", amount: "AED 4,500", status: "Paid" },
  { id: "INV-1024", date: "1 May 2026", description: "Hosting — May", amount: "AED 72", status: "Paid" },
];
