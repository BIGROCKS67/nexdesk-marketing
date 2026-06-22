import { assertWriteAccess } from "@/lib/os-api/auth";
import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { buildFinanceReport, buildPlReport, revenueByClient, revenueByProduct } from "@/lib/finance/reports";
import { getStore, mutateStore } from "@/lib/os-api/store";
import { stripeConfigured } from "@/lib/stripe/client";
import type { CommissionStatus } from "@/lib/os-api/types";

const VALID_COMMISSION_STATUSES: CommissionStatus[] = [
  "Pending",
  "Approved",
  "Scheduled",
  "Paid",
  "Rejected",
  "Clawed Back",
];

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function GET(request: Request) {
  const origin = getOrigin(request);
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId") ?? undefined;
  const agentId = url.searchParams.get("agentId") ?? undefined;

  const store = await getStore();
  const report = clientId ? buildFinanceReport(store, clientId) : buildPlReport(store);

  let commissions = store.commissions;
  if (agentId) {
    commissions = commissions.filter((c) => c.agent_id === agentId);
  }

  const refunds = clientId
    ? store.refunds.filter((r) => r.client_id === clientId)
    : store.refunds;

  return jsonResponse(
    {
      report,
      commissions,
      payments: clientId
        ? store.payments.filter((p) => p.client_id === clientId)
        : store.payments,
      refunds,
      revenue_by_client: revenueByClient(store),
      revenue_by_product: revenueByProduct(store),
      revolut_transactions: store.revolut_transactions,
      audit_logs: store.audit_logs.slice(0, 50),
      stripe_configured: stripeConfigured(),
    },
    undefined,
    origin
  );
}

export async function PATCH(request: Request) {
  const origin = getOrigin(request);
  const denied = assertWriteAccess(request, origin);
  if (denied) return denied;

  const body = await request.json();
  const { commissionId, status, reason } = body as {
    commissionId?: string;
    status?: string;
    reason?: string;
  };

  if (!commissionId || !status) {
    return jsonResponse({ error: "commissionId and status required" }, { status: 400 }, origin);
  }

  if (!VALID_COMMISSION_STATUSES.includes(status as CommissionStatus)) {
    return jsonResponse({ error: "Invalid commission status" }, { status: 400 }, origin);
  }

  await mutateStore((store) => {
    const cm = store.commissions.find((c) => c.id === commissionId);
    if (!cm) return;
    cm.status = status as CommissionStatus;
    cm.updated_at = new Date().toISOString();
    if (status === "Clawed Back") {
      cm.clawback_amount = cm.commission;
      cm.reason = reason ?? "Manual clawback";
    }
    store.audit_logs.unshift({
      id: `aud-${Date.now()}`,
      entity_type: "commission",
      entity_id: commissionId,
      action: `commission.${status.toLowerCase().replace(" ", "_")}`,
      details: reason ?? `Status changed to ${status}`,
      user: "CRM Admin",
      at: new Date().toISOString(),
    });
  });

  return jsonResponse({ ok: true }, undefined, origin);
}
