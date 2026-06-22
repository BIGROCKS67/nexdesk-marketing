import type { OsStore } from "./types";
import {
  FINANCE_AUDIT_LOGS,
  FINANCE_COMMISSIONS,
  FINANCE_EXPENSE_CATEGORIES,
  FINANCE_PAYMENTS,
  FINANCE_PRODUCTS,
  FINANCE_REFUNDS,
  FINANCE_REVOLUT,
} from "./finance-seed";

export function migrateStore(store: OsStore): OsStore {
  if (store.version >= 2) return store;

  const migrated: OsStore = {
    ...store,
    version: 2,
    products: store.products?.length ? store.products : FINANCE_PRODUCTS,
    payments: store.payments?.length ? store.payments : FINANCE_PAYMENTS,
    refunds: store.refunds?.length ? store.refunds : FINANCE_REFUNDS,
    commissions: store.commissions?.length ? store.commissions : FINANCE_COMMISSIONS,
    revolut_transactions: store.revolut_transactions?.length
      ? store.revolut_transactions
      : FINANCE_REVOLUT,
    expense_categories: store.expense_categories?.length
      ? store.expense_categories
      : FINANCE_EXPENSE_CATEGORIES,
    audit_logs: store.audit_logs?.length ? store.audit_logs : FINANCE_AUDIT_LOGS,
    commission_lock_days: store.commission_lock_days ?? 60,
  };

  for (const client of migrated.clients) {
    if (!client.stripe_customer_id) {
      client.stripe_customer_id = `cus_${client.id.replace(/[^a-z0-9]/gi, "_")}`;
    }
    if (!client.payment_method_status) {
      client.payment_method_status = client.deposit_paid ? "valid" : "missing";
    }
  }

  for (const sub of migrated.subscriptions) {
    if (!sub.stripe_subscription_id) {
      sub.stripe_subscription_id = `sub_${sub.id}`;
    }
    if (!sub.stripe_customer_id) {
      sub.stripe_customer_id = `cus_${sub.client_id.replace(/[^a-z0-9]/gi, "_")}`;
    }
    if (!sub.currency) sub.currency = "GBP";
    if (!sub.billing_frequency) sub.billing_frequency = "monthly";
    if (!sub.type) sub.type = sub.product.toLowerCase().includes("hosting") ? "hosting" : "crm";
  }

  for (const inv of migrated.invoices) {
    if (!inv.currency) inv.currency = "GBP";
    if (!inv.stripe_invoice_id) inv.stripe_invoice_id = `in_${inv.id.replace(/[^a-z0-9]/gi, "_")}`;
    if (!inv.hosted_invoice_url) {
      inv.hosted_invoice_url = `https://invoice.stripe.com/i/acct_demo/${inv.stripe_invoice_id}`;
    }
    if (!inv.invoice_pdf) {
      inv.invoice_pdf = `https://pay.stripe.com/invoice/${inv.stripe_invoice_id}/pdf`;
    }
    if (inv.status === "Paid" && !inv.net_amount) {
      inv.stripe_fee = Math.round(inv.amount * 0.029 * 100 + 30) / 100;
      inv.net_amount = Math.round((inv.amount - (inv.stripe_fee ?? 0)) * 100) / 100;
    }
    if (!inv.payment_type) {
      inv.payment_type = inv.products.some((p) => p.toLowerCase().includes("monthly"))
        ? "recurring"
        : "one_time";
    }
    if (inv.status === "Overdue" || inv.status === "Failed") {
      inv.failed_at = inv.failed_at ?? inv.due_date;
    }
  }

  return migrated;
}
