import type { OsClient, OsStore } from "@/lib/os-api/types";
import { mutateStore } from "@/lib/os-api/store";
import type { OsAuditLog, OsCommission, OsPayment } from "@/lib/os-api/types";
import { estimateStripeFee } from "./client";

const AGENT_NAMES: Record<string, string> = {
  aff1: "David Porter",
  aff2: "Nadia Rahman",
  u3: "Sarah Ahmed",
  u4: "Tom Hughes",
  u5: "Lisa Chen",
  u6: "Marcus Webb",
};

const RATES = {
  affiliate: 0.15,
  closer: 0.1,
  setter: 0.05,
} as const;

function lockUntil(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function audit(entity_type: OsAuditLog["entity_type"], entity_id: string, action: string, details: string) {
  return {
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    entity_type,
    entity_id,
    action,
    details,
    user: "Stripe Webhook",
    at: new Date().toISOString(),
  } satisfies OsAuditLog;
}

export function createCommissionsForPayment(
  store: OsStore,
  client: OsClient,
  payment: OsPayment,
  invoiceId?: string
): OsCommission[] {
  const created: OsCommission[] = [];
  const lock = lockUntil(store.commission_lock_days ?? 60);
  const now = new Date().toISOString();

  const agents: { id: string; role: keyof typeof RATES }[] = [];
  if (client.affiliate_id) agents.push({ id: client.affiliate_id, role: "affiliate" });
  if (client.closer_id) agents.push({ id: client.closer_id, role: "closer" });
  if (client.setter_id) agents.push({ id: client.setter_id, role: "setter" });

  for (const { id, role } of agents) {
    const rate = RATES[role];
    const commission = Math.round(payment.net_amount * rate * 100) / 100;
    const record: OsCommission = {
      id: `cm-${Date.now()}-${id}`,
      agent_id: id,
      agent_name: AGENT_NAMES[id] ?? id,
      agent_role: role,
      client_id: client.id,
      client_name: client.business_name,
      payment_id: payment.id,
      invoice_id: invoiceId,
      revenue: payment.net_amount,
      commission_rate: rate,
      commission,
      status: "Pending",
      lock_until: lock,
      created_at: now,
      updated_at: now,
    };
    created.push(record);
    store.commissions.unshift(record);
  }

  return created;
}

const CLAWBACK_ELIGIBLE = new Set(["Pending", "Approved", "Scheduled"]);

export function clawbackCommissionsForPayment(
  store: OsStore,
  paymentId: string,
  reason: string,
  refundRatio = 1
) {
  const now = new Date().toISOString();
  const ratio = Math.min(1, Math.max(0, refundRatio));

  for (const cm of store.commissions) {
    if (cm.payment_id !== paymentId || cm.status === "Clawed Back") continue;
    if (!CLAWBACK_ELIGIBLE.has(cm.status)) continue;

    const clawAmount = Math.round(cm.commission * ratio * 100) / 100;
    if (ratio >= 1) {
      cm.status = "Clawed Back";
      cm.clawback_amount = cm.commission;
    } else {
      cm.commission = Math.round((cm.commission - clawAmount) * 100) / 100;
      cm.clawback_amount = (cm.clawback_amount ?? 0) + clawAmount;
      cm.reason = `${reason} (partial ${Math.round(ratio * 100)}%)`;
    }
    if (ratio >= 1) {
      cm.reason = reason;
    }
    cm.updated_at = now;
    store.audit_logs.unshift(
      audit("commission", cm.id, "commission.clawback", `${reason} — clawback £${clawAmount}`)
    );
  }
}

export async function recordPaymentSuccess(opts: {
  clientId: string;
  amount: number;
  currency?: string;
  invoiceId?: string;
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  paymentType?: "one_time" | "recurring";
}) {
  return await mutateStore((store) => {
    const client = store.clients.find((c) => c.id === opts.clientId || c.client_id === opts.clientId);
    if (!client) return;

    const fee = estimateStripeFee(opts.amount, opts.currency ?? "gbp");
    const net = Math.round((opts.amount - fee) * 100) / 100;
    const now = new Date().toISOString();
    const payment: OsPayment = {
      id: `pay-${Date.now()}`,
      client_id: client.id,
      client_name: client.business_name,
      invoice_id: opts.invoiceId,
      stripe_payment_intent_id: opts.stripePaymentIntentId,
      stripe_charge_id: opts.stripeChargeId,
      amount: opts.amount,
      currency: (opts.currency ?? "GBP").toUpperCase(),
      status: "succeeded",
      payment_type: opts.paymentType ?? "one_time",
      stripe_fee: fee,
      net_amount: net,
      paid_at: now,
      created_at: now,
    };
    store.payments.unshift(payment);
    client.lifetime_revenue = Math.round((client.lifetime_revenue + opts.amount) * 100) / 100;
    client.payment_method_status = "valid";

    if (opts.invoiceId) {
      const inv = store.invoices.find((i) => i.id === opts.invoiceId);
      if (inv) {
        inv.status = "Paid";
        inv.paid_at = now.slice(0, 10);
        inv.stripe_fee = fee;
        inv.net_amount = net;
      }
    }

    createCommissionsForPayment(store, client, payment, opts.invoiceId);
    store.audit_logs.unshift(
      audit("payment", payment.id, "payment.succeeded", `£${opts.amount} collected from ${client.business_name}`)
    );
  });
}

export async function recordPaymentFailed(opts: {
  clientId: string;
  amount: number;
  invoiceId?: string;
  reason?: string;
}) {
  return await mutateStore((store) => {
    const client = store.clients.find((c) => c.id === opts.clientId || c.client_id === opts.clientId);
    if (!client) return;

    const now = new Date().toISOString();
    const payment: OsPayment = {
      id: `pay-${Date.now()}`,
      client_id: client.id,
      client_name: client.business_name,
      invoice_id: opts.invoiceId,
      amount: opts.amount,
      currency: "GBP",
      status: "failed",
      payment_type: "one_time",
      stripe_fee: 0,
      net_amount: 0,
      failed_at: now,
      failure_reason: opts.reason ?? "Payment failed",
      created_at: now,
    };
    store.payments.unshift(payment);
    client.payment_method_status = "failed";

    if (opts.invoiceId) {
      const inv = store.invoices.find((i) => i.id === opts.invoiceId);
      if (inv) {
        inv.status = "Failed";
        inv.failed_at = now.slice(0, 10);
      }
    }

    store.audit_logs.unshift(
      audit("payment", payment.id, "payment.failed", opts.reason ?? "Payment failed")
    );
  });
}

export async function recordRefund(opts: {
  clientId: string;
  paymentId: string;
  amount: number;
  stripeRefundId?: string;
  reason?: string;
}) {
  return await mutateStore((store) => {
    const refund = {
      id: `ref-${Date.now()}`,
      client_id: opts.clientId,
      payment_id: opts.paymentId,
      stripe_refund_id: opts.stripeRefundId,
      amount: opts.amount,
      currency: "GBP",
      reason: opts.reason,
      created_at: new Date().toISOString(),
    };
    store.refunds.unshift(refund);

    const payment = store.payments.find((p) => p.id === opts.paymentId);
    if (payment) {
      payment.status =
        opts.amount >= payment.amount ? "refunded" : "partially_refunded";
    }

    clawbackCommissionsForPayment(
      store,
      opts.paymentId,
      opts.reason ?? "Refund processed"
    );

    store.audit_logs.unshift(
      audit("refund", refund.id, "refund.processed", `£${opts.amount} refunded`)
    );
  });
}
