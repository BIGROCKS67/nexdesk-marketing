export type ProjectCategory = "Bespoke Systems" | "Websites" | "Off-the-Shelf Systems";
export type ProjectStatus = "Not Started" | "In Progress" | "Review" | "Completed" | "On Hold";
export type SubscriptionStatus = "active" | "inactive" | "cancelled" | "past_due";
export type PaymentStatus = "Paid" | "Due" | "Failed" | "Cancelled";
export type SupportStatus = "Open" | "Waiting for Reply" | "Resolved";
export type WebsiteStatus = "Live" | "In Build" | "Maintenance" | "Suspended";
export type ProductCategory =
  | "Websites"
  | "Bespoke Systems"
  | "CRM Software"
  | "Accounting Software"
  | "HR Software"
  | "Hosting"
  | "Maintenance";

export const BUILD_STAGES = [
  "Discovery",
  "Requirements Confirmed",
  "Design",
  "Development",
  "Internal Testing",
  "Client Review",
  "Revisions",
  "Launch / Handover",
  "Completed",
] as const;

export type BuildStage = (typeof BUILD_STAGES)[number];

export interface ClientProfile {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  stripeCustomerId: string;
  profilePhoto?: string;
}

export interface ProjectStage {
  stage: BuildStage;
  completed: boolean;
  date?: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  message: string;
}

export interface PortalProject {
  id: string;
  clientId: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;
  currentStage: BuildStage;
  estimatedCompletion: string;
  latestUpdate: string;
  stages: ProjectStage[];
  updates: ProjectUpdate[];
  clientNotes: string;
  deliverables: { name: string; type: string; date: string }[];
}

export interface PortalSubscription {
  id: string;
  clientId: string;
  productId?: string;
  productName: string;
  type: "hosting" | "crm" | "support" | "maintenance" | "other";
  amount: number;
  currency: string;
  billingFrequency: "monthly" | "yearly";
  nextPaymentDate: string;
  subscriptionStatus: SubscriptionStatus;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
}

export interface PortalInvoice {
  id: string;
  clientId: string;
  productId?: string;
  invoiceNumber: string;
  productOrService: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidDate?: string;
  paymentStatus: PaymentStatus;
  stripeInvoiceId: string;
  hostedInvoiceUrl: string;
  invoicePdf: string;
}

export interface PortalWebsite {
  id: string;
  clientId: string;
  name: string;
  url: string;
  status: WebsiteStatus;
  hostingStatus: string;
  sslStatus: string;
  lastBackup: string;
  monthlyVisits: number;
  uptime: string;
  activity: { date: string; message: string }[];
  maintenanceLogs: { date: string; action: string }[];
  linkedSubscriptionId?: string;
}

export interface PortalProduct {
  id: string;
  clientId: string;
  name: string;
  category: ProductCategory;
  status: string;
  purchaseDate: string;
  subscriptionStatus?: SubscriptionStatus;
  relatedInvoiceIds: string[];
}

export interface SupportMessage {
  id: string;
  clientId: string;
  sender: "client" | "team";
  author: string;
  message: string;
  timestamp: string;
  attachment?: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  subject: string;
  status: SupportStatus;
  unreadByClient: number;
  messages: SupportMessage[];
}

export interface ActivityItem {
  id: string;
  clientId: string;
  type: "project" | "payment" | "website" | "support";
  title: string;
  description: string;
  date: string;
}

export type HubProductType = "website" | "crm" | "hosting" | "booking" | "bespoke" | "support";

export interface LeadRecord {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  notes?: string;
}

export interface UpsellSuggestion {
  id: string;
  title: string;
  description: string;
  estimatedCost: string;
  reason: string;
}

export interface ClientHubProduct {
  id: string;
  clientId: string;
  name: string;
  type: HubProductType;
  companyName: string;
  status: string;
  url?: string;
  monthlyVisits?: number;
  totalLeads?: number;
  monthlySpend?: number;
  currency: string;
  nextPaymentDue?: string;
  subscriptionId?: string;
  relatedInvoiceIds: string[];
  leads: LeadRecord[];
  upsells: UpsellSuggestion[];
}

export interface PortalTeamMember {
  id: string;
  email: string;
  role: "admin" | "viewer";
  status: "active" | "pending";
}
