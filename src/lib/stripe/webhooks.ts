import type Stripe from "stripe";
import { mutateStore } from "@/lib/os-api/store";
import type { OsClient, OsPayment, OsStore } from "@/lib/os-api/types";
import { estimateStripeFee } from "./client";
import { clawbackCommissionsForPayment, createCommissionsForPayment } from "./commissions";

function isRecurringInvoice(invoice: Stripe.Invoice) {
  return (
    invoice.billing_reason === "subscription_create" ||
    invoice.billing_reason === "subscription_cycle" ||
    invoice.billing_reason === "subscription_update"
  );
}

function paymentIntentIdFromInvoice(invoice: Stripe.Invoice) {
  const legacy = (invoice as Stripe.Invoice & { payment_intent?: string | Stripe.PaymentIntent | null })
    .payment_intent;
  if (legacy) return typeof legacy === "string" ? legacy : legacy.id;
  const payments = (invoice as Stripe.Invoice & { payments?: { data?: { payment?: { payment_intent?: string } }[] } })
    .payments;
  return payments?.data?.[0]?.payment?.payment_intent;
}

function chargeIdFromInvoice(invoice: Stripe.Invoice) {
  const ch = (invoice as Stripe.Invoice & { charge?: string | Stripe.Charge | null }).charge;
  return typeof ch === "string" ? ch : ch?.id;
}

function paymentIntentIdFromCharge(charge: Stripe.Charge) {
  const pi = charge.payment_intent;
  return typeof pi === "string" ? pi : pi?.id;
}

function subscriptionPeriodEnd(sub: Stripe.Subscription) {
  const itemEnd = sub.items.data[0]?.current_period_end;
  const legacyEnd = (sub as Stripe.Subscription & { current_period_end?: number }).current_period_end;
  const end = itemEnd ?? legacyEnd ?? Math.floor(Date.now() / 1000) + 86400 * 30;
  return new Date(end * 1000).toISOString().slice(0, 10);
}

function findClientByStripeCustomer(store: OsStore, customerId: string) {
  return store.clients.find((c) => c.stripe_customer_id === customerId);
}

function findClientById(store: OsStore, clientId: string) {
  return store.clients.find((c) => c.id === clientId || c.client_id === clientId);
}

function audit(
  entity_type: "payment" | "invoice" | "commission" | "subscription" | "refund",
  entity_id: string,
  action: string,
  details: string
) {
  return {
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    entity_type,
    entity_id,
    action,
    details,
    user: "Stripe Webhook",
    at: new Date().toISOString(),
  };
}

function applyPaymentSuccess(
  store: OsStore,
  client: OsClient,
  opts: {
    paymentId: string;
    amount: number;
    currency: string;
    paymentType: "one_time" | "recurring";
    invoiceId?: string;
    stripePaymentIntentId?: string;
    stripeChargeId?: string;
  }
) {
  if (store.payments.some((p) => p.id === opts.paymentId)) return;

  const fee = estimateStripeFee(opts.amount, opts.currency);
  const net = Math.round((opts.amount - fee) * 100) / 100;
  const now = new Date().toISOString();

  const payment: OsPayment = {
    id: opts.paymentId,
    client_id: client.id,
    client_name: client.business_name,
    invoice_id: opts.invoiceId,
    stripe_payment_intent_id: opts.stripePaymentIntentId,
    stripe_charge_id: opts.stripeChargeId,
    amount: opts.amount,
    currency: opts.currency.toUpperCase(),
    status: "succeeded",
    payment_type: opts.paymentType,
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
}

function applyPaymentFailed(
  store: OsStore,
  client: OsClient,
  opts: {
    paymentId: string;
    amount: number;
    currency: string;
    paymentType: "one_time" | "recurring";
    invoiceId?: string;
    stripePaymentIntentId?: string;
    reason: string;
  }
) {
  if (store.payments.some((p) => p.id === opts.paymentId)) return;

  const now = new Date().toISOString();
  store.payments.unshift({
    id: opts.paymentId,
    client_id: client.id,
    client_name: client.business_name,
    invoice_id: opts.invoiceId,
    stripe_payment_intent_id: opts.stripePaymentIntentId,
    amount: opts.amount,
    currency: opts.currency.toUpperCase(),
    status: "failed",
    payment_type: opts.paymentType,
    stripe_fee: 0,
    net_amount: 0,
    failed_at: now,
    failure_reason: opts.reason,
    created_at: now,
  });
  client.payment_method_status = "failed";

  if (opts.invoiceId) {
    const inv = store.invoices.find((i) => i.id === opts.invoiceId);
    if (inv) {
      inv.status = "Failed";
      inv.failed_at = now.slice(0, 10);
    }
  }

  store.audit_logs.unshift(audit("payment", opts.paymentId, "payment.failed", opts.reason));
}

export async function handleStripeEvent(event: Stripe.Event) {
  switch (event.type) {
    case "invoice.paid":
      return await handleInvoicePaid(event.data.object as Stripe.Invoice);
    case "invoice.payment_failed":
      return await handleInvoiceFailed(event.data.object as Stripe.Invoice);
    case "invoice.finalized":
      return await handleInvoiceFinalized(event.data.object as Stripe.Invoice);
    case "customer.subscription.created":
    case "customer.subscription.updated":
      return await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
    case "customer.subscription.deleted":
      return await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
    case "charge.refunded":
      return await handleChargeRefunded(event.data.object as Stripe.Charge);
    case "charge.dispute.created":
      return await handleDispute(event.data.object as Stripe.Dispute);
    case "payment_intent.succeeded":
      return await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
    case "payment_intent.payment_failed":
      return await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
    case "checkout.session.completed":
      return await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    default:
      return { handled: false, type: event.type };
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return { handled: true, type: "invoice.paid", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    const amount = (invoice.amount_paid ?? 0) / 100;
    const fee = estimateStripeFee(amount, invoice.currency ?? "gbp");
    const net = Math.round((amount - fee) * 100) / 100;
    const now = new Date().toISOString();
    const piId = paymentIntentIdFromInvoice(invoice);
    const chId = chargeIdFromInvoice(invoice);

    let inv = store.invoices.find((i) => i.stripe_invoice_id === invoice.id);
    if (!inv) {
      inv = {
        id: `INV-${Date.now()}`,
        client_id: client.id,
        client_name: client.business_name,
        amount,
        status: "Paid",
        due_date: invoice.due_date
          ? new Date(invoice.due_date * 1000).toISOString().slice(0, 10)
          : now.slice(0, 10),
        paid_at: now.slice(0, 10),
        products: invoice.lines.data.map((l) => l.description ?? "Service"),
        stripe_invoice_id: invoice.id,
        hosted_invoice_url: invoice.hosted_invoice_url ?? undefined,
        invoice_pdf: invoice.invoice_pdf ?? undefined,
        currency: (invoice.currency ?? "gbp").toUpperCase(),
        stripe_fee: fee,
        net_amount: net,
        payment_type: isRecurringInvoice(invoice) ? "recurring" : "one_time",
      };
      store.invoices.unshift(inv);
    } else {
      inv.status = "Paid";
      inv.paid_at = now.slice(0, 10);
      inv.stripe_fee = fee;
      inv.net_amount = net;
      inv.hosted_invoice_url = invoice.hosted_invoice_url ?? inv.hosted_invoice_url;
      inv.invoice_pdf = invoice.invoice_pdf ?? inv.invoice_pdf;
    }

    applyPaymentSuccess(store, client, {
      paymentId: `pay-${invoice.id}`,
      amount,
      currency: invoice.currency ?? "gbp",
      paymentType: isRecurringInvoice(invoice) ? "recurring" : "one_time",
      invoiceId: inv.id,
      stripePaymentIntentId: piId,
      stripeChargeId: chId,
    });

    store.audit_logs.unshift(audit("invoice", inv.id, "invoice.paid", `£${amount} paid`));
  });

  return { handled: true, type: "invoice.paid" };
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return { handled: true, type: "invoice.payment_failed", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    const inv = store.invoices.find((i) => i.stripe_invoice_id === invoice.id);
    if (inv) {
      inv.status = "Failed";
      inv.failed_at = new Date().toISOString().slice(0, 10);
    }

    applyPaymentFailed(store, client, {
      paymentId: `pay-fail-${invoice.id}`,
      amount: (invoice.amount_due ?? 0) / 100,
      currency: invoice.currency ?? "gbp",
      paymentType: isRecurringInvoice(invoice) ? "recurring" : "one_time",
      invoiceId: inv?.id,
      stripePaymentIntentId: paymentIntentIdFromInvoice(invoice),
      reason: "Invoice payment failed",
    });
  });

  return { handled: true, type: "invoice.payment_failed" };
}

async function handleInvoiceFinalized(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return { handled: true, type: "invoice.finalized", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    if (store.invoices.some((i) => i.stripe_invoice_id === invoice.id)) return;

    store.invoices.unshift({
      id: `INV-${Date.now()}`,
      client_id: client.id,
      client_name: client.business_name,
      amount: (invoice.amount_due ?? 0) / 100,
      status: invoice.status === "open" ? "Due" : invoice.status === "paid" ? "Paid" : "Due",
      due_date: invoice.due_date
        ? new Date(invoice.due_date * 1000).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      products: invoice.lines.data.map((l) => l.description ?? "Service"),
      stripe_invoice_id: invoice.id,
      hosted_invoice_url: invoice.hosted_invoice_url ?? undefined,
      invoice_pdf: invoice.invoice_pdf ?? undefined,
      currency: (invoice.currency ?? "gbp").toUpperCase(),
      payment_type: isRecurringInvoice(invoice) ? "recurring" : "one_time",
    });
  });

  return { handled: true, type: "invoice.finalized" };
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
  if (!customerId) return { handled: true, type: "customer.subscription.updated", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    const item = sub.items.data[0];
    const mrr = item ? (item.price.unit_amount ?? 0) / 100 : 0;
    const existing = store.subscriptions.find((s) => s.stripe_subscription_id === sub.id);

    const status =
      sub.status === "active"
        ? "Active"
        : sub.status === "past_due"
          ? "Past Due"
          : sub.status === "canceled"
            ? "Cancelled"
            : "Inactive";

    if (existing) {
      existing.status = status;
      existing.mrr = mrr;
      existing.renewal = subscriptionPeriodEnd(sub);
    } else {
      store.subscriptions.push({
        id: `sub-${sub.id.slice(-8)}`,
        client_id: client.id,
        client_name: client.business_name,
        product: item?.price.nickname ?? "Subscription",
        status,
        mrr,
        started: new Date(sub.start_date * 1000).toISOString().slice(0, 10),
        renewal: subscriptionPeriodEnd(sub),
        stripe_subscription_id: sub.id,
        stripe_customer_id: customerId,
        type: "hosting",
        currency: (sub.currency ?? "gbp").toUpperCase(),
        billing_frequency: item?.price.recurring?.interval === "year" ? "yearly" : "monthly",
      });
    }

    store.audit_logs.unshift(audit("subscription", sub.id, "subscription.updated", `Status: ${status}`));
  });

  return { handled: true, type: "customer.subscription.updated" };
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  await mutateStore((store) => {
    const existing = store.subscriptions.find((s) => s.stripe_subscription_id === sub.id);
    if (existing) existing.status = "Cancelled";
    store.audit_logs.unshift(audit("subscription", sub.id, "subscription.cancelled", "Subscription cancelled"));
  });
  return { handled: true, type: "customer.subscription.deleted" };
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
  if (!customerId) return { handled: true, type: "charge.refunded", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    const piId = paymentIntentIdFromCharge(charge);
    const payment = store.payments.find(
      (p) => p.stripe_charge_id === charge.id || (piId && p.stripe_payment_intent_id === piId)
    );
    const refundAmount = (charge.amount_refunded ?? 0) / 100;
    const refundId = charge.refunds?.data[0]?.id ?? `ref-${charge.id}`;

    if (!store.refunds.some((r) => r.stripe_refund_id === refundId || r.id === refundId)) {
      store.refunds.unshift({
        id: refundId,
        client_id: client.id,
        payment_id: payment?.id ?? `pay-${charge.id}`,
        stripe_refund_id: charge.refunds?.data[0]?.id,
        amount: refundAmount,
        currency: (charge.currency ?? "gbp").toUpperCase(),
        reason: "Stripe refund",
        created_at: new Date().toISOString(),
      });
    }

    if (payment) {
      payment.status = refundAmount >= payment.amount ? "refunded" : "partially_refunded";
      const ratio = payment.amount > 0 ? refundAmount / payment.amount : 1;
      clawbackCommissionsForPayment(store, payment.id, "Refund processed via Stripe", ratio);
    }
  });

  return { handled: true, type: "charge.refunded" };
}

async function handleDispute(dispute: Stripe.Dispute) {
  await mutateStore((store) => {
    const chargeId = typeof dispute.charge === "string" ? dispute.charge : dispute.charge?.id;
    const payment = store.payments.find(
      (p) => p.stripe_charge_id === chargeId || p.stripe_payment_intent_id === chargeId
    );
    if (payment) {
      payment.status = "disputed";
      clawbackCommissionsForPayment(store, payment.id, "Chargeback / dispute opened");
    }
    store.audit_logs.unshift(audit("payment", dispute.id, "payment.disputed", "Dispute opened"));
  });
  return { handled: true, type: "charge.dispute.created" };
}

async function handlePaymentIntentSucceeded(pi: Stripe.PaymentIntent) {
  const customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
  const clientId = pi.metadata?.client_id;
  if (!customerId && !clientId) {
    return { handled: true, type: "payment_intent.succeeded", skipped: true };
  }

  await mutateStore((store) => {
    const client =
      (customerId ? findClientByStripeCustomer(store, customerId) : null) ??
      (clientId ? findClientById(store, clientId) : null);
    if (!client) return;

    const chargeId =
      typeof pi.latest_charge === "string" ? pi.latest_charge : pi.latest_charge?.id;

    applyPaymentSuccess(store, client, {
      paymentId: `pay-${pi.id}`,
      amount: (pi.amount ?? 0) / 100,
      currency: pi.currency ?? "gbp",
      paymentType: "one_time",
      stripePaymentIntentId: pi.id,
      stripeChargeId: chargeId,
    });
  });

  return { handled: true, type: "payment_intent.succeeded" };
}

async function handlePaymentIntentFailed(pi: Stripe.PaymentIntent) {
  const customerId = typeof pi.customer === "string" ? pi.customer : pi.customer?.id;
  if (!customerId) return { handled: true, type: "payment_intent.payment_failed", skipped: true };

  await mutateStore((store) => {
    const client = findClientByStripeCustomer(store, customerId);
    if (!client) return;

    applyPaymentFailed(store, client, {
      paymentId: `pay-fail-${pi.id}`,
      amount: (pi.amount ?? 0) / 100,
      currency: pi.currency ?? "gbp",
      paymentType: "one_time",
      stripePaymentIntentId: pi.id,
      reason: pi.last_payment_error?.message ?? "Payment failed",
    });
  });

  return { handled: true, type: "payment_intent.payment_failed" };
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clientId = session.metadata?.client_id;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  await mutateStore((store) => {
    const client =
      (clientId ? findClientById(store, clientId) : null) ??
      (customerId ? findClientByStripeCustomer(store, customerId) : null);
    if (!client) return;

    if (customerId && !client.stripe_customer_id) {
      client.stripe_customer_id = customerId;
    }

    if (session.mode === "subscription" && session.subscription) {
      store.audit_logs.unshift(
        audit("subscription", String(session.subscription), "checkout.completed", "Subscription checkout completed")
      );
      return;
    }

    const piId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (piId && store.payments.some((p) => p.id === `pay-${piId}`)) return;

    const amount = (session.amount_total ?? 0) / 100;
    if (amount <= 0) return;

    applyPaymentSuccess(store, client, {
      paymentId: piId ? `pay-${piId}` : `pay-cs-${session.id}`,
      amount,
      currency: session.currency ?? "gbp",
      paymentType: "one_time",
      stripePaymentIntentId: piId,
    });

    store.audit_logs.unshift(
      audit("payment", session.id, "checkout.completed", `Checkout £${amount} for ${client.business_name}`)
    );
  });

  return { handled: true, type: "checkout.session.completed" };
}
