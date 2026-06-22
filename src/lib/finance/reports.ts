import type { OsStore } from "@/lib/os-api/types";

export interface FinanceReport {
  grossRevenue: number;
  netRevenue: number;
  stripeFees: number;
  recurringRevenue: number;
  oneTimeRevenue: number;
  overdueRevenue: number;
  refundedRevenue: number;
  commissionsDue: number;
  commissionsPaid: number;
  commissionsClawedBack: number;
  mrr: number;
  activeSubscriptions: number;
  failedPayments: number;
  overdueInvoices: number;
}

export interface PlReport extends FinanceReport {
  revolutIncome: number;
  revolutExpenses: number;
  expensesByCategory: { category: string; amount: number }[];
  profitLoss: number;
}

export function buildFinanceReport(store: OsStore, clientId?: string): FinanceReport {
  const payments = clientId
    ? store.payments.filter((p) => p.client_id === clientId)
    : store.payments;
  const invoices = clientId
    ? store.invoices.filter((i) => i.client_id === clientId)
    : store.invoices;
  const commissions = clientId
    ? store.commissions.filter((c) => c.client_id === clientId)
    : store.commissions;
  const subs = clientId
    ? store.subscriptions.filter((s) => s.client_id === clientId)
    : store.subscriptions;

  const succeeded = payments.filter((p) => p.status === "succeeded");
  const grossRevenue = succeeded.reduce((s, p) => s + p.amount, 0);
  const stripeFees = succeeded.reduce((s, p) => s + p.stripe_fee, 0);
  const netRevenue = succeeded.reduce((s, p) => s + p.net_amount, 0);
  const recurringRevenue = succeeded
    .filter((p) => p.payment_type === "recurring")
    .reduce((s, p) => s + p.amount, 0);
  const oneTimeRevenue = succeeded
    .filter((p) => p.payment_type === "one_time")
    .reduce((s, p) => s + p.amount, 0);
  const overdueRevenue = invoices
    .filter((i) => i.status === "Overdue" || i.status === "Failed")
    .reduce((s, i) => s + i.amount, 0);
  const refundedRevenue = store.refunds
    .filter((r) => !clientId || r.client_id === clientId)
    .reduce((s, r) => s + r.amount, 0);

  const commissionsDue = commissions
    .filter((c) => ["Pending", "Approved", "Scheduled"].includes(c.status))
    .reduce((s, c) => s + c.commission, 0);
  const commissionsPaid = commissions
    .filter((c) => c.status === "Paid")
    .reduce((s, c) => s + c.commission, 0);
  const commissionsClawedBack = commissions
    .filter((c) => c.status === "Clawed Back")
    .reduce((s, c) => s + (c.clawback_amount ?? c.commission), 0);

  const activeSubscriptions = subs.filter((s) => s.status === "Active").length;
  const mrr = subs.filter((s) => s.status === "Active").reduce((s, sub) => s + sub.mrr, 0);

  return {
    grossRevenue: Math.round(grossRevenue * 100) / 100,
    netRevenue: Math.round(netRevenue * 100) / 100,
    stripeFees: Math.round(stripeFees * 100) / 100,
    recurringRevenue: Math.round(recurringRevenue * 100) / 100,
    oneTimeRevenue: Math.round(oneTimeRevenue * 100) / 100,
    overdueRevenue: Math.round(overdueRevenue * 100) / 100,
    refundedRevenue: Math.round(refundedRevenue * 100) / 100,
    commissionsDue: Math.round(commissionsDue * 100) / 100,
    commissionsPaid: Math.round(commissionsPaid * 100) / 100,
    commissionsClawedBack: Math.round(commissionsClawedBack * 100) / 100,
    mrr: Math.round(mrr * 100) / 100,
    activeSubscriptions,
    failedPayments: payments.filter((p) => p.status === "failed").length,
    overdueInvoices: invoices.filter((i) => i.status === "Overdue" || i.status === "Failed").length,
  };
}

export function buildPlReport(store: OsStore): PlReport {
  const finance = buildFinanceReport(store);
  const revolutIncome = store.revolut_transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const revolutExpenses = store.revolut_transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const expensesByCategory = store.expense_categories.map((cat) => ({
    category: cat.name,
    amount: store.revolut_transactions
      .filter((t) => t.category_id === cat.id && t.type === "expense")
      .reduce((s, t) => s + Math.abs(t.amount), 0),
  }));

  const profitLoss =
    finance.netRevenue - finance.refundedRevenue - revolutExpenses - finance.commissionsPaid;

  return {
    ...finance,
    revolutIncome: Math.round(revolutIncome * 100) / 100,
    revolutExpenses: Math.round(revolutExpenses * 100) / 100,
    expensesByCategory,
    profitLoss: Math.round(profitLoss * 100) / 100,
  };
}

export function revenueByClient(store: OsStore) {
  return store.clients.map((client) => {
    const payments = store.payments.filter(
      (p) => p.client_id === client.id && p.status === "succeeded"
    );
    const gross = payments.reduce((s, p) => s + p.amount, 0);
    const net = payments.reduce((s, p) => s + p.net_amount, 0);
    const fees = payments.reduce((s, p) => s + p.stripe_fee, 0);
    return {
      client_id: client.id,
      client_name: client.business_name,
      gross,
      net,
      fees,
      payment_method_status: client.payment_method_status ?? "unknown",
      overdue: store.invoices.some(
        (i) => i.client_id === client.id && (i.status === "Overdue" || i.status === "Failed")
      ),
    };
  });
}

export function revenueByProduct(store: OsStore) {
  const map = new Map<string, { product: string; revenue: number; count: number }>();
  for (const sub of store.subscriptions) {
    const key = sub.product;
    const cur = map.get(key) ?? { product: key, revenue: 0, count: 0 };
    if (sub.status === "Active") {
      cur.revenue += sub.mrr;
      cur.count += 1;
    }
    map.set(key, cur);
  }
  for (const inv of store.invoices.filter((i) => i.status === "Paid")) {
    for (const p of inv.products) {
      const cur = map.get(p) ?? { product: p, revenue: 0, count: 0 };
      cur.revenue += inv.amount / inv.products.length;
      cur.count += 1;
      map.set(p, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.revenue - a.revenue);
}
