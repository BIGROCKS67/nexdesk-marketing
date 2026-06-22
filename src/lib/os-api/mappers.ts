import { BUILD_STAGES } from "@/data/portal/types";
import { invoicePortalStatus } from "./invoices";
import type {
  OsClient,
  OsInvoice,
  OsLead,
  OsPayment,
  OsProject,
  OsRefund,
  OsStore,
  OsSubscription,
  OsSupportTicket,
} from "./types";

function stagesForProgress(progress: number) {
  const idx = Math.min(
    BUILD_STAGES.length - 1,
    Math.floor((progress / 100) * BUILD_STAGES.length)
  );
  return BUILD_STAGES.map((stage, i) => ({
    stage,
    completed: i <= idx,
    date: i <= idx ? "2026-06-01" : undefined,
  }));
}

function mapProject(p: OsProject) {
  return {
    id: p.id,
    clientId: p.client_id,
    name: p.name,
    category: p.category,
    status: p.status,
    progress: p.progress,
    currentStage: p.current_stage,
    estimatedCompletion: p.estimated_completion,
    latestUpdate: p.latest_update,
    stages: stagesForProgress(p.progress),
    updates: p.updates,
    clientNotes: "",
    deliverables: [],
  };
}

function mapSubscription(s: OsSubscription, client?: OsClient) {
  const statusMap: Record<string, "active" | "inactive" | "cancelled" | "past_due"> = {
    Active: "active",
    Trial: "inactive",
    Cancelled: "cancelled",
    "Past Due": "past_due",
    Inactive: "inactive",
  };
  return {
    id: s.id,
    clientId: s.client_id,
    productName: s.product,
    type: s.type ?? "other",
    amount: s.mrr,
    currency: s.currency ?? "GBP",
    billingFrequency: (s.billing_frequency ?? "monthly") as "monthly" | "yearly",
    nextPaymentDate: s.renewal,
    subscriptionStatus: statusMap[s.status] ?? "inactive",
    stripeSubscriptionId: s.stripe_subscription_id ?? `sub_${s.id}`,
    stripeCustomerId: s.stripe_customer_id ?? client?.stripe_customer_id ?? `cus_${s.client_id}`,
  };
}

function mapInvoice(i: OsInvoice) {
  return {
    id: i.id,
    clientId: i.client_id,
    invoiceNumber: i.id,
    productOrService: i.products.join(", "),
    amount: i.amount,
    currency: i.currency ?? "GBP",
    dueDate: i.due_date,
    paidDate: i.paid_at ?? undefined,
    paymentStatus: invoicePortalStatus(i),
    stripeInvoiceId: i.stripe_invoice_id ?? `inv_${i.id}`,
    hostedInvoiceUrl: i.hosted_invoice_url ?? "#",
    invoicePdf: i.invoice_pdf ?? "#",
  };
}

function mapPayment(p: OsPayment) {
  return {
    id: p.id,
    clientId: p.client_id,
    amount: p.amount,
    currency: p.currency,
    status: p.status,
    paymentType: p.payment_type,
    stripeFee: p.stripe_fee,
    netAmount: p.net_amount,
    paidAt: p.paid_at,
    failedAt: p.failed_at,
    failureReason: p.failure_reason,
    invoiceId: p.invoice_id,
  };
}

function mapRefund(r: OsRefund) {
  return {
    id: r.id,
    clientId: r.client_id,
    paymentId: r.payment_id,
    amount: r.amount,
    currency: r.currency,
    reason: r.reason,
    createdAt: r.created_at,
  };
}

function mapSupport(t: OsSupportTicket) {
  return {
    id: t.id,
    clientId: t.client_id,
    subject: t.subject,
    status:
      t.status === "Resolved"
        ? ("Resolved" as const)
        : t.status === "Waiting Client"
          ? ("Waiting for Reply" as const)
          : ("Open" as const),
    unreadByClient: t.status === "In Progress" ? 1 : 0,
    messages: [
      {
        id: `${t.id}-m1`,
        clientId: t.client_id,
        sender: "team" as const,
        author: "NexDesk Support",
        message: `Ticket opened: ${t.subject}`,
        timestamp: t.created_at,
      },
    ],
  };
}

export function mapClientProfile(client: OsClient) {
  return {
    id: client.id,
    customerId: client.client_id,
    name: client.contact_name,
    email: client.email,
    phone: client.phone,
    address: "",
    company: client.business_name,
    stripeCustomerId: client.stripe_customer_id ?? `cus_${client.id}`,
    paymentMethodStatus: client.payment_method_status ?? "unknown",
  };
}

export function mapPortalPayload(store: OsStore, clientId: string) {
  const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
  if (!client) return null;

  const projects = store.projects.filter((p) => p.client_id === client.id).map(mapProject);
  const subscriptions = store.subscriptions
    .filter((s) => s.client_id === client.id)
    .map((s) => mapSubscription(s, client));
  const invoices = store.invoices.filter((i) => i.client_id === client.id).map(mapInvoice);
  const payments = store.payments.filter((p) => p.client_id === client.id).map(mapPayment);
  const refunds = store.refunds.filter((r) => r.client_id === client.id).map(mapRefund);
  const tickets = store.support.filter((t) => t.client_id === client.id).map(mapSupport);

  const activity = [
    ...projects.flatMap((p) =>
      p.updates.slice(0, 1).map((u) => ({
        id: `act-${p.id}-${u.id}`,
        clientId: client.id,
        type: "project" as const,
        title: p.name,
        description: u.message,
        date: u.date,
      }))
    ),
    ...payments.slice(0, 5).map((p) => ({
      id: `act-pay-${p.id}`,
      clientId: client.id,
      type: "payment" as const,
      title: p.status === "succeeded" ? "Payment received" : "Payment failed",
      description: `${p.currency} ${p.amount} — ${p.status}`,
      date: p.paidAt ?? p.failedAt ?? new Date().toISOString(),
    })),
  ];

  return {
    client: mapClientProfile(client),
    buildProgress: client.build_progress,
    portalSync: client.portal_sync,
    projects,
    subscriptions,
    invoices,
    payments,
    refunds,
    websites: [],
    products: subscriptions.map((s) => ({
      id: `prod-${s.id}`,
      clientId: client.id,
      name: s.productName,
      category: "CRM Software" as const,
      status: "Active",
      purchaseDate: s.nextPaymentDate,
      subscriptionStatus: s.subscriptionStatus,
      relatedInvoiceIds: invoices.map((i) => i.id),
    })),
    tickets,
    activity,
  };
}

export function leadFromEnquiry(
  payload: {
    name: string;
    company: string;
    email: string;
    phone?: string;
    details: string;
    source?: string;
    product_interest?: string;
    system_type?: string;
  },
  leadId: string
) {
  const product =
    payload.product_interest ||
    payload.system_type ||
    "Custom Software Development";

  return {
    id: leadId,
    lead_id: leadId,
    business_name: payload.company,
    contact: payload.name,
    phone: payload.phone || "",
    email: payload.email,
    website: "",
    industry: "Other",
    location: "Enquiry",
    source: payload.source || "Marketing",
    product_interest: product,
    estimated_value: 5000,
    lead_score: 75,
    status: "New" as const,
    setter_stage: "New",
    closer_stage: null,
    assigned_to: "u3",
    closer_id: null,
    affiliate_id: null,
    last_contact: null,
    next_followup: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    notes: payload.details,
    activities: [
      {
        id: `act-${Date.now()}`,
        type: "enquiry",
        text: `Website enquiry: ${payload.details.slice(0, 120)}`,
        user: "Website",
        at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString().slice(0, 10),
  };
}

export function clientFromLead(
  lead: OsLead,
  clientId: string,
  opts: { depositPaid?: boolean; portalPassword?: string; stripeCustomerId?: string } = {}
) {
  const password = opts.portalPassword || "NexDesk2026!";
  return {
    client: {
      id: clientId,
      client_id: clientId,
      lead_id: lead.id,
      business_name: lead.business_name,
      contact_name: lead.contact,
      email: lead.email,
      phone: lead.phone,
      industry: lead.industry,
      product: lead.product_interest,
      stage: opts.depositPaid ? "Onboarding" : "Signed",
      monthly_price: 499,
      setup_fee: 3500,
      contract_value: 9488,
      lifetime_revenue: opts.depositPaid ? 3500 : 0,
      renewal_date: "2027-06-01",
      affiliate_id: lead.affiliate_id ?? null,
      setter_id: lead.assigned_to,
      closer_id: lead.closer_id ?? null,
      portal_sync: opts.depositPaid ? ("Pending" as const) : ("Disconnected" as const),
      portal_enabled: !!opts.depositPaid,
      build_progress: 5,
      deposit_paid: !!opts.depositPaid,
      assigned_to: lead.closer_id || lead.assigned_to,
      created_at: new Date().toISOString().slice(0, 10),
      stripe_customer_id: opts.stripeCustomerId,
      payment_method_status: opts.depositPaid ? ("valid" as const) : ("missing" as const),
    },
    portalUser: opts.depositPaid
      ? {
          client_id: clientId,
          email: lead.email,
          password,
          name: lead.contact,
          company: lead.business_name,
        }
      : null,
    project: {
      id: `proj-${clientId}`,
      client_id: clientId,
      name: lead.product_interest,
      category: "Bespoke Systems" as const,
      status: "In Progress" as const,
      progress: 5,
      current_stage: "Discovery",
      estimated_completion: "TBC",
      latest_update: "Project kickoff scheduled after deposit received.",
      updates: [
        {
          id: `u-${Date.now()}`,
          date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          author: "NexDesk Team",
          message: "Client account created — build commencing.",
        },
      ],
    },
  };
}
