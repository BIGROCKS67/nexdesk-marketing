import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore, mutateStore, syncClientBuildProgress } from "@/lib/os-api/store";
import type { OsClient } from "@/lib/os-api/types";

const CLIENT_PATCH_KEYS: (keyof OsClient)[] = [
  "stage",
  "build_progress",
  "deposit_paid",
  "portal_sync",
  "portal_enabled",
  "monthly_price",
  "setup_fee",
  "lifetime_revenue",
  "payment_method_status",
  "stripe_customer_id",
  "assigned_to",
];

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const body = await request.json();
  const store = await mutateStore((s) => {
    const client = s.clients.find((c) => c.id === id || c.client_id === id);
    if (!client) return;

    if (body.build_progress !== undefined) {
      syncClientBuildProgress(s, client.id, body.build_progress);
    }

    for (const key of CLIENT_PATCH_KEYS) {
      if (body[key] !== undefined) {
        // @ts-expect-error dynamic patch from CRM
        client[key] = body[key];
      }
    }
  });
  const client = store.clients.find((c) => c.id === id || c.client_id === id);
  if (!client) return jsonResponse({ error: "Client not found" }, { status: 404 }, origin);
  return jsonResponse({ client }, undefined, origin);
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = (await getStore()).clients.find((c) => c.id === id || c.client_id === id);
  if (!client) return jsonResponse({ error: "Client not found" }, { status: 404 }, getOrigin(request));
  return jsonResponse({ client }, undefined, getOrigin(request));
}
