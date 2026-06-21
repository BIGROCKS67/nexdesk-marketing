export type LeadStatus =
  | "New"
  | "Contacted"
  | "No Answer"
  | "Interested"
  | "Follow Up"
  | "Demo Sent"
  | "Negotiation"
  | "Won"
  | "Lost"
  | "Sold";

export type PortalSyncStatus = "Synced" | "Pending" | "Error" | "Disconnected";

export interface OsActivity {
  id: string;
  type: string;
  text: string;
  user: string;
  at: string;
}

export interface OsLead {
  id: string;
  lead_id: string;
  business_name: string;
  contact: string;
  phone: string;
  email: string;
  website?: string;
  industry: string;
  location: string;
  source: string;
  product_interest: string;
  estimated_value: number;
  lead_score: number;
  status: LeadStatus;
  setter_stage?: string;
  closer_stage?: string | null;
  assigned_to: string | null;
  closer_id?: string | null;
  affiliate_id?: string | null;
  last_contact?: string | null;
  next_followup?: string | null;
  notes: string;
  activities: OsActivity[];
  created_at: string;
}

export interface OsClient {
  id: string;
  client_id: string;
  lead_id?: string | null;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  industry: string;
  product: string;
  stage: string;
  monthly_price: number;
  setup_fee: number;
  contract_value: number;
  lifetime_revenue: number;
  renewal_date: string;
  affiliate_id?: string | null;
  setter_id?: string | null;
  closer_id?: string | null;
  portal_sync: PortalSyncStatus;
  portal_enabled: boolean;
  build_progress: number;
  deposit_paid: boolean;
  assigned_to: string | null;
  created_at: string;
}

export interface OsPortalUser {
  client_id: string;
  email: string;
  password: string;
  name: string;
  company: string;
}

export interface OsProject {
  id: string;
  client_id: string;
  name: string;
  category: "Bespoke Systems" | "Websites" | "Off-the-Shelf Systems";
  status: "Not Started" | "In Progress" | "Review" | "Completed" | "On Hold";
  progress: number;
  current_stage: string;
  estimated_completion: string;
  latest_update: string;
  updates: { id: string; date: string; author: string; message: string }[];
}

export interface OsSubscription {
  id: string;
  client_id: string;
  client_name: string;
  product: string;
  status: string;
  mrr: number;
  started: string;
  renewal: string;
}

export interface OsInvoice {
  id: string;
  client_id: string;
  client_name: string;
  amount: number;
  status: string;
  due_date: string;
  paid_at?: string | null;
  products: string[];
}

export interface OsSupportTicket {
  id: string;
  client_id: string;
  client_name: string;
  subject: string;
  status: string;
  priority: string;
  satisfaction?: number | null;
  created_at: string;
}

export interface OsStore {
  version: number;
  updated_at: string;
  leads: OsLead[];
  clients: OsClient[];
  projects: OsProject[];
  subscriptions: OsSubscription[];
  invoices: OsInvoice[];
  support: OsSupportTicket[];
  portal_users: OsPortalUser[];
}

export interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  details: string;
  source?: string;
  product_interest?: string;
  system_type?: string;
}
