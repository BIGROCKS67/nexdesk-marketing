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

export type PaymentRecordStatus =
  | "succeeded"
  | "pending"
  | "failed"
  | "refunded"
  | "partially_refunded"
  | "disputed";

export type CommissionStatus =
  | "Pending"
  | "Approved"
  | "Scheduled"
  | "Paid"
  | "Rejected"
  | "Clawed Back";

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
  stripe_customer_id?: string;
  payment_method_status?: "valid" | "expiring" | "missing" | "failed";
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

export interface OsProduct {
  id: string;
  name: string;
  type: "hosting" | "crm" | "support" | "maintenance" | "setup" | "other";
  stripe_price_id?: string;
  amount: number;
  currency: string;
  billing_frequency: "monthly" | "yearly" | "one_time";
  active: boolean;
}

export interface OsSubscription {
  id: string;
  client_id: string;
  client_name: string;
  product: string;
  product_id?: string;
  status: string;
  mrr: number;
  started: string;
  renewal: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  type?: "hosting" | "crm" | "support" | "maintenance" | "other";
  currency?: string;
  billing_frequency?: "monthly" | "yearly";
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
  stripe_invoice_id?: string;
  stripe_payment_intent_id?: string;
  hosted_invoice_url?: string;
  invoice_pdf?: string;
  currency?: string;
  stripe_fee?: number;
  net_amount?: number;
  payment_type?: "one_time" | "recurring";
  failed_at?: string | null;
}

export interface OsPayment {
  id: string;
  client_id: string;
  client_name: string;
  invoice_id?: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  amount: number;
  currency: string;
  status: PaymentRecordStatus;
  payment_type: "one_time" | "recurring";
  stripe_fee: number;
  net_amount: number;
  paid_at?: string | null;
  failed_at?: string | null;
  failure_reason?: string | null;
  created_at: string;
}

export interface OsRefund {
  id: string;
  client_id: string;
  payment_id: string;
  stripe_refund_id?: string;
  amount: number;
  currency: string;
  reason?: string;
  created_at: string;
}

export interface OsCommission {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_role: "affiliate" | "closer" | "setter";
  client_id: string;
  client_name: string;
  payment_id?: string;
  invoice_id?: string;
  revenue: number;
  commission_rate: number;
  commission: number;
  status: CommissionStatus;
  lock_until?: string | null;
  reason?: string | null;
  clawback_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface OsRevolutTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  category_id?: string;
  type: "income" | "expense";
  matched_payment_id?: string | null;
}

export interface OsExpenseCategory {
  id: string;
  name: string;
  type: "operating" | "payroll" | "software" | "marketing" | "other";
}

export interface OsAuditLog {
  id: string;
  entity_type: "payment" | "invoice" | "commission" | "subscription" | "refund";
  entity_id: string;
  action: string;
  details: string;
  user: string;
  at: string;
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
  products: OsProduct[];
  subscriptions: OsSubscription[];
  invoices: OsInvoice[];
  payments: OsPayment[];
  refunds: OsRefund[];
  commissions: OsCommission[];
  revolut_transactions: OsRevolutTransaction[];
  expense_categories: OsExpenseCategory[];
  audit_logs: OsAuditLog[];
  support: OsSupportTicket[];
  portal_users: OsPortalUser[];
  commission_lock_days: number;
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
