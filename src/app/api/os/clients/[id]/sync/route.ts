import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { mutateStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const store = await mutateStore((s) => {
    const client = s.clients.find((c) => c.id === id || c.client_id === id);
    if (!client) return;
    client.portal_sync = "Synced";
    client.portal_enabled = true;
  });
  const client = store.clients.find((c) => c.id === id || c.client_id === id);
  if (!client) return jsonResponse({ error: "Client not found" }, { status: 404 }, origin);
  return jsonResponse({ client, synced: true }, undefined, origin);
}
