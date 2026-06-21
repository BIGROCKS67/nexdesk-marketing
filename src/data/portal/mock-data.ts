import type {
  ActivityItem,
  ClientHubProduct,
  ClientProfile,
  PortalInvoice,
  PortalProduct,
  PortalProject,
  PortalSubscription,
  PortalTeamMember,
  PortalWebsite,
  SupportTicket,
} from "./types";

export const DEMO_CLIENT_ID = "client-whitfield";

export const demoClient: ClientProfile = {
  id: DEMO_CLIENT_ID,
  customerId: "NXD-10482",
  name: "Sarah Whitfield",
  email: "demo@nexdesk.app",
  phone: "+971 50 123 4567",
  address: "DIFC, Gate Village 10, Dubai, UAE",
  company: "Whitfield Group",
  stripeCustomerId: "cus_demo_whitfield_001",
};

export const allClients: ClientProfile[] = [
  demoClient,
  {
    id: "client-gulf",
    customerId: "NXD-10491",
    name: "Ahmed Al-Rashid",
    email: "ahmed@gulftalent.ae",
    phone: "+971 55 987 6543",
    address: "Business Bay, Dubai, UAE",
    company: "Gulf Talent Recruitment",
    stripeCustomerId: "cus_demo_gulf_002",
  },
  {
    id: "client-meridian",
    customerId: "NXD-10503",
    name: "James Chen",
    email: "j.chen@meridianadvisory.co.uk",
    phone: "+44 20 7946 0958",
    address: "Canary Wharf, London, UK",
    company: "Meridian Advisory",
    stripeCustomerId: "cus_demo_meridian_003",
  },
];

export const demoTeamMembers: PortalTeamMember[] = [
  { id: "tm-1", email: "finance@whitfieldgroup.com", role: "viewer", status: "active" },
];

const sampleLeads = [
  { id: "l1", date: "18 Jun 2026", name: "Michael Torres", email: "m.torres@email.com", phone: "+971 50 111 2233", source: "Website form", status: "New" as const, notes: "Interested in off-plan villas" },
  { id: "l2", date: "17 Jun 2026", name: "Priya Sharma", email: "priya.s@corp.io", phone: "+971 52 444 5566", source: "Landing page", status: "Contacted" as const },
  { id: "l3", date: "16 Jun 2026", name: "James Okoye", email: "j.okoye@buildco.ae", phone: "+971 55 777 8899", source: "Book consultation", status: "Qualified" as const, notes: "Commercial portfolio enquiry" },
  { id: "l4", date: "14 Jun 2026", name: "Fatima Al-Hassan", email: "f.alhassan@mail.ae", phone: "+971 54 333 2211", source: "WhatsApp widget", status: "Converted" as const },
  { id: "l5", date: "12 Jun 2026", name: "Tom Bradley", email: "tom@rentals.uk", phone: "+44 7700 900123", source: "Website form", status: "Lost" as const, notes: "Budget mismatch" },
];

export const allHubProducts: ClientHubProduct[] = [
  {
    id: "hub-website-corp",
    clientId: DEMO_CLIENT_ID,
    name: "Whitfield Group Corporate Website",
    type: "website",
    companyName: "Whitfield Group LLC",
    status: "In Build",
    url: "https://whitfieldgroup.example.com",
    monthlyVisits: 0,
    totalLeads: 0,
    monthlySpend: 72,
    currency: "AED",
    nextPaymentDue: "1 Jul 2026",
    subscriptionId: "sub-hosting",
    relatedInvoiceIds: ["inv-1038", "inv-1024"],
    leads: [],
    upsells: [
      { id: "u1", title: "Upgrade to Enterprise Hosting", description: "Dedicated resources, CDN, and priority support for high-traffic launches.", estimatedCost: "AED 299/mo", reason: "Your corporate site is nearing launch — enterprise hosting ensures performance at scale." },
      { id: "u2", title: "AI Lead Qualification Bot", description: "Automatically qualify website enquiries and route hot leads to your sales team.", estimatedCost: "AED 450/mo", reason: "Based on your website traffic goals, an AI chatbot could capture leads 24/7." },
    ],
  },
  {
    id: "hub-website-legacy",
    clientId: DEMO_CLIENT_ID,
    name: "Legacy Landing Page",
    type: "website",
    companyName: "Whitfield Property Group",
    status: "Live",
    url: "https://legacy.whitfieldgroup.example.com",
    monthlyVisits: 2840,
    totalLeads: 47,
    monthlySpend: 49,
    currency: "AED",
    nextPaymentDue: "1 Jul 2026",
    subscriptionId: "sub-hosting",
    relatedInvoiceIds: ["inv-1024"],
    leads: sampleLeads,
    upsells: [
      { id: "u3", title: "SEO Growth Package", description: "Monthly optimisation, content updates, and ranking reports.", estimatedCost: "AED 1,200/mo", reason: "Your landing page is generating leads — SEO could increase organic traffic by 40%+." },
    ],
  },
  {
    id: "hub-crm",
    clientId: DEMO_CLIENT_ID,
    name: "Real Estate CRM Platform",
    type: "crm",
    companyName: "Whitfield Group LLC",
    status: "Active",
    monthlySpend: 1200,
    currency: "AED",
    nextPaymentDue: "15 Jul 2026",
    subscriptionId: "sub-crm",
    relatedInvoiceIds: ["inv-1042"],
    leads: [
      { id: "cl1", date: "19 Jun 2026", name: "Agent referral — Unit 4B", email: "sales@whitfieldgroup.com", phone: "—", source: "CRM pipeline", status: "Qualified", notes: "AED 2.1M listing" },
      { id: "cl2", date: "18 Jun 2026", name: "Walk-in — Marina View", email: "walkin@example.com", phone: "+971 50 999 8877", source: "CRM import", status: "New" },
    ],
    upsells: [
      { id: "u4", title: "Add 5 CRM User Licences", description: "Scale your sales desk with additional agent seats.", estimatedCost: "AED 250/seat/mo", reason: "You recently requested extra staging seats — production licences may be next." },
      { id: "u5", title: "Dialler Integration", description: "Connect your VoIP provider for click-to-call and call logging.", estimatedCost: "AED 800 one-off", reason: "Your support ticket mentioned dialler testing — we can productionise this." },
    ],
  },
  {
    id: "hub-hosting",
    clientId: DEMO_CLIENT_ID,
    name: "Website Hosting Pro",
    type: "hosting",
    companyName: "Whitfield Group LLC",
    status: "Active",
    monthlySpend: 72,
    currency: "AED",
    nextPaymentDue: "1 Jul 2026",
    subscriptionId: "sub-hosting",
    relatedInvoiceIds: ["inv-1024"],
    leads: [],
    upsells: [
      { id: "u6", title: "Daily Off-Site Backups", description: "Automated daily backups with 30-day retention.", estimatedCost: "AED 35/mo", reason: "Protect your live sites with enterprise-grade backup coverage." },
    ],
  },
  {
    id: "hub-support",
    clientId: DEMO_CLIENT_ID,
    name: "Priority Support Plan",
    type: "support",
    companyName: "Whitfield Group LLC",
    status: "Active",
    monthlySpend: 450,
    currency: "AED",
    nextPaymentDue: "1 Aug 2026",
    subscriptionId: "sub-support",
    relatedInvoiceIds: [],
    leads: [],
    upsells: [],
  },
  {
    id: "hub-bespoke",
    clientId: DEMO_CLIENT_ID,
    name: "Client Portal Module",
    type: "bespoke",
    companyName: "Whitfield Ventures Ltd",
    status: "In Progress",
    monthlySpend: 0,
    currency: "AED",
    relatedInvoiceIds: ["inv-1031"],
    leads: [],
    upsells: [
      { id: "u7", title: "HR Platform Add-on", description: "Leave management, documents, and employee self-service.", estimatedCost: "From AED 2,500/mo", reason: "You don't have HR software with us yet — it pairs well with your CRM and portal." },
      { id: "u8", title: "Accounting Integration", description: "Sync invoices and subscriptions with Xero or QuickBooks.", estimatedCost: "AED 1,800 setup", reason: "Automate billing reconciliation across your Whitfield Group entities." },
    ],
  },
];

const stagesComplete = (upTo: number) =>
  [
    "Discovery",
    "Requirements Confirmed",
    "Design",
    "Development",
    "Internal Testing",
    "Client Review",
    "Revisions",
    "Launch / Handover",
    "Completed",
  ].map((stage, i) => ({
    stage: stage as PortalProject["currentStage"],
    completed: i < upTo,
    date: i < upTo ? `2026-0${Math.min(i + 1, 6)}-${10 + i}` : undefined,
  }));

export const allProjects: PortalProject[] = [
  {
    id: "proj-website",
    clientId: DEMO_CLIENT_ID,
    name: "Corporate Website",
    category: "Websites",
    status: "In Progress",
    progress: 72,
    currentStage: "Development",
    estimatedCompletion: "15 Jul 2026",
    latestUpdate: "Homepage and services pages deployed to staging for review.",
    stages: stagesComplete(4),
    updates: [
      { id: "u1", date: "16 Jun 2026", author: "NexDesk Team", message: "Phase 2 staging build approved internally." },
      { id: "u2", date: "12 Jun 2026", author: "NexDesk Team", message: "Design sign-off received — moving to development." },
    ],
    clientNotes: "Please ensure brand colours match the latest guidelines PDF.",
    deliverables: [
      { name: "Wireframes v2.pdf", type: "PDF", date: "28 May 2026" },
      { name: "Staging URL", type: "Link", date: "14 Jun 2026" },
    ],
  },
  {
    id: "proj-crm",
    clientId: DEMO_CLIENT_ID,
    name: "Real Estate CRM Platform",
    category: "Bespoke Systems",
    status: "Review",
    progress: 58,
    currentStage: "Client Review",
    estimatedCompletion: "30 Aug 2026",
    latestUpdate: "Pipeline and applicant modules ready for UAT.",
    stages: stagesComplete(6),
    updates: [
      { id: "u3", date: "14 Jun 2026", author: "NexDesk Team", message: "CRM staging environment live at demo URL." },
    ],
    clientNotes: "Need dialler integration tested with our VoIP provider.",
    deliverables: [{ name: "CRM Demo Access", type: "Credentials", date: "14 Jun 2026" }],
  },
];

export const allSubscriptions: PortalSubscription[] = [
  {
    id: "sub-hosting",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-hosting",
    productName: "Website Hosting — Pro",
    type: "hosting",
    amount: 72,
    currency: "AED",
    billingFrequency: "monthly",
    nextPaymentDate: "1 Jul 2026",
    subscriptionStatus: "active",
    stripeSubscriptionId: "sub_demo_hosting_001",
    stripeCustomerId: demoClient.stripeCustomerId,
  },
  {
    id: "sub-crm",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-crm",
    productName: "CRM Platform Licence (8 users)",
    type: "crm",
    amount: 1200,
    currency: "AED",
    billingFrequency: "monthly",
    nextPaymentDate: "15 Jul 2026",
    subscriptionStatus: "active",
    stripeSubscriptionId: "sub_demo_crm_002",
    stripeCustomerId: demoClient.stripeCustomerId,
  },
  {
    id: "sub-support",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-support",
    productName: "Priority Support",
    type: "support",
    amount: 450,
    currency: "AED",
    billingFrequency: "monthly",
    nextPaymentDate: "1 Aug 2026",
    subscriptionStatus: "active",
    stripeSubscriptionId: "sub_demo_support_003",
    stripeCustomerId: demoClient.stripeCustomerId,
  },
  {
    id: "sub-maint",
    clientId: DEMO_CLIENT_ID,
    productName: "Maintenance Retainer",
    type: "maintenance",
    amount: 350,
    currency: "AED",
    billingFrequency: "monthly",
    nextPaymentDate: "1 Jul 2026",
    subscriptionStatus: "active",
    stripeSubscriptionId: "sub_demo_maint_004",
    stripeCustomerId: demoClient.stripeCustomerId,
  },
  {
    id: "sub-old",
    clientId: DEMO_CLIENT_ID,
    productName: "Legacy Analytics Add-on",
    type: "other",
    amount: 99,
    currency: "AED",
    billingFrequency: "monthly",
    nextPaymentDate: "—",
    subscriptionStatus: "cancelled",
    stripeSubscriptionId: "sub_demo_cancelled_005",
    stripeCustomerId: demoClient.stripeCustomerId,
  },
];

export const allInvoices: PortalInvoice[] = [
  {
    id: "inv-1042",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-crm",
    invoiceNumber: "INV-1042",
    productOrService: "CRM Phase 2 — Milestone",
    amount: 18500,
    currency: "AED",
    dueDate: "25 Jun 2026",
    paymentStatus: "Due",
    stripeInvoiceId: "in_demo_1042",
    hostedInvoiceUrl: "https://invoice.stripe.com/demo/inv_1042",
    invoicePdf: "/invoices/demo-1042.pdf",
  },
  {
    id: "inv-1038",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-website-corp",
    invoiceNumber: "INV-1038",
    productOrService: "Website — Deposit",
    amount: 2497,
    currency: "AED",
    dueDate: "28 May 2026",
    paidDate: "28 May 2026",
    paymentStatus: "Paid",
    stripeInvoiceId: "in_demo_1038",
    hostedInvoiceUrl: "https://invoice.stripe.com/demo/inv_1038",
    invoicePdf: "/invoices/demo-1038.pdf",
  },
  {
    id: "inv-1031",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-bespoke",
    invoiceNumber: "INV-1031",
    productOrService: "Portal — Discovery",
    amount: 4500,
    currency: "AED",
    dueDate: "15 May 2026",
    paidDate: "16 May 2026",
    paymentStatus: "Paid",
    stripeInvoiceId: "in_demo_1031",
    hostedInvoiceUrl: "https://invoice.stripe.com/demo/inv_1031",
    invoicePdf: "/invoices/demo-1031.pdf",
  },
  {
    id: "inv-1024",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-hosting",
    invoiceNumber: "INV-1024",
    productOrService: "Hosting — May",
    amount: 72,
    currency: "AED",
    dueDate: "1 May 2026",
    paidDate: "1 May 2026",
    paymentStatus: "Paid",
    stripeInvoiceId: "in_demo_1024",
    hostedInvoiceUrl: "https://invoice.stripe.com/demo/inv_1024",
    invoicePdf: "/invoices/demo-1024.pdf",
  },
  {
    id: "inv-1019",
    clientId: DEMO_CLIENT_ID,
    productId: "hub-support",
    invoiceNumber: "INV-1019",
    productOrService: "Support — April (Overdue)",
    amount: 450,
    currency: "AED",
    dueDate: "1 Apr 2026",
    paymentStatus: "Failed",
    stripeInvoiceId: "in_demo_1019",
    hostedInvoiceUrl: "https://invoice.stripe.com/demo/inv_1019",
    invoicePdf: "/invoices/demo-1019.pdf",
  },
];

export const allWebsites: PortalWebsite[] = [
  {
    id: "web-corp",
    clientId: DEMO_CLIENT_ID,
    name: "Whitfield Group Corporate Site",
    url: "https://whitfieldgroup.example.com",
    status: "In Build",
    hostingStatus: "Pro Hosting — Active",
    sslStatus: "Valid",
    lastBackup: "15 Jun 2026",
    monthlyVisits: 0,
    uptime: "—",
    linkedSubscriptionId: "sub-hosting",
    activity: [
      { date: "16 Jun 2026", message: "Staging deployment completed" },
      { date: "12 Jun 2026", message: "DNS records configured" },
    ],
    maintenanceLogs: [{ date: "10 Jun 2026", action: "SSL certificate provisioned" }],
  },
  {
    id: "web-legacy",
    clientId: DEMO_CLIENT_ID,
    name: "Legacy Landing Page",
    url: "https://legacy.whitfieldgroup.example.com",
    status: "Live",
    hostingStatus: "Standard Hosting",
    sslStatus: "Valid",
    lastBackup: "14 Jun 2026",
    monthlyVisits: 2840,
    uptime: "99.9%",
    activity: [{ date: "14 Jun 2026", message: "Automated backup completed" }],
    maintenanceLogs: [{ date: "1 Jun 2026", action: "Plugin security update applied" }],
  },
];

export const allProducts: PortalProduct[] = [
  { id: "p1", clientId: DEMO_CLIENT_ID, name: "Pro Website Package", category: "Websites", status: "Active", purchaseDate: "1 May 2026", relatedInvoiceIds: ["inv-1038"] },
  { id: "p2", clientId: DEMO_CLIENT_ID, name: "Real Estate CRM", category: "CRM Software", status: "Active", purchaseDate: "1 Apr 2026", subscriptionStatus: "active", relatedInvoiceIds: ["inv-1042"] },
  { id: "p3", clientId: DEMO_CLIENT_ID, name: "Website Hosting Pro", category: "Hosting", status: "Active", purchaseDate: "1 May 2026", subscriptionStatus: "active", relatedInvoiceIds: ["inv-1024"] },
  { id: "p4", clientId: DEMO_CLIENT_ID, name: "Priority Support Plan", category: "Maintenance", status: "Active", purchaseDate: "1 Apr 2026", subscriptionStatus: "active", relatedInvoiceIds: [] },
  { id: "p5", clientId: DEMO_CLIENT_ID, name: "Bespoke CRM Build", category: "Bespoke Systems", status: "In Progress", purchaseDate: "15 Mar 2026", relatedInvoiceIds: ["inv-1042", "inv-1031"] },
];

export const allSupportTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    clientId: DEMO_CLIENT_ID,
    subject: "CRM staging access question",
    status: "Waiting for Reply",
    unreadByClient: 1,
    messages: [
      { id: "m1", clientId: DEMO_CLIENT_ID, sender: "client", author: "Sarah Whitfield", message: "Can we add two more user seats to the CRM staging environment?", timestamp: "15 Jun 2026, 10:30" },
      { id: "m2", clientId: DEMO_CLIENT_ID, sender: "team", author: "NexDesk Support", message: "Absolutely — we can provision those today. I'll confirm once done.", timestamp: "15 Jun 2026, 11:45" },
      { id: "m3", clientId: DEMO_CLIENT_ID, sender: "team", author: "NexDesk Support", message: "Both seats are now active. Login details sent to your email.", timestamp: "15 Jun 2026, 14:20" },
    ],
  },
  {
    id: "ticket-2",
    clientId: DEMO_CLIENT_ID,
    subject: "Website content update",
    status: "Resolved",
    unreadByClient: 0,
    messages: [
      { id: "m4", clientId: DEMO_CLIENT_ID, sender: "client", author: "Sarah Whitfield", message: "Please update the team page with new headshots.", timestamp: "10 Jun 2026, 09:00" },
      { id: "m5", clientId: DEMO_CLIENT_ID, sender: "team", author: "NexDesk Support", message: "Done — live on staging for your review.", timestamp: "11 Jun 2026, 16:00" },
    ],
  },
];

export const allActivity: ActivityItem[] = [
  { id: "a1", clientId: DEMO_CLIENT_ID, type: "project", title: "Website Phase 2 approved", description: "Corporate Website — staging ready", date: "16 Jun 2026" },
  { id: "a2", clientId: DEMO_CLIENT_ID, type: "payment", title: "Invoice INV-1042 issued", description: "AED 18,500 due 25 Jun", date: "10 Jun 2026" },
  { id: "a3", clientId: DEMO_CLIENT_ID, type: "website", title: "Staging deployment", description: "Whitfield Group site updated", date: "16 Jun 2026" },
  { id: "a4", clientId: DEMO_CLIENT_ID, type: "support", title: "Support reply received", description: "CRM staging access question", date: "15 Jun 2026" },
];

export function getClientProfile(clientId: string) {
  return allClients.find((c) => c.id === clientId);
}

export function getClientData(clientId: string) {
  return {
    profile: getClientProfile(clientId),
    hubProducts: allHubProducts.filter((p) => p.clientId === clientId),
    projects: allProjects.filter((p) => p.clientId === clientId),
    subscriptions: allSubscriptions.filter((s) => s.clientId === clientId),
    invoices: allInvoices.filter((i) => i.clientId === clientId),
    websites: allWebsites.filter((w) => w.clientId === clientId),
    products: allProducts.filter((p) => p.clientId === clientId),
    tickets: allSupportTickets.filter((t) => t.clientId === clientId),
    activity: allActivity.filter((a) => a.clientId === clientId),
    teamMembers: demoTeamMembers,
  };
}

export function getHubProductById(id: string) {
  return allHubProducts.find((p) => p.id === id);
}

export function getProjectById(id: string) {
  return allProjects.find((p) => p.id === id);
}

export function getWebsiteById(id: string) {
  return allWebsites.find((w) => w.id === id);
}

export function formatMoney(amount: number, currency = "AED") {
  return `${currency} ${amount.toLocaleString()}`;
}

export function calcMonthlySpend(subs: PortalSubscription[]) {
  return subs
    .filter((s) => s.subscriptionStatus === "active")
    .reduce((sum, s) => sum + (s.billingFrequency === "yearly" ? s.amount / 12 : s.amount), 0);
}

export function calcAnnualSpend(subs: PortalSubscription[]) {
  return subs
    .filter((s) => s.subscriptionStatus === "active")
    .reduce((sum, s) => sum + (s.billingFrequency === "yearly" ? s.amount : s.amount * 12), 0);
}

export const globalUpsellCatalog = [
  { id: "cat-hr", title: "HR Platform", description: "Leave, documents, onboarding, and employee self-service.", category: "HR Software" },
  { id: "cat-accounting", title: "Accounting Software", description: "Invoicing, payroll, and executive reporting.", category: "Accounting Software" },
  { id: "cat-ai", title: "AI Automation Suite", description: "Lead qualification, email sequences, and workflow bots.", category: "AI & Automation" },
];
