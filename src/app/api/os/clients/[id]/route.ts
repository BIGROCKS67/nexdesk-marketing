import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore, mutateStore, syncClientBuildProgress } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const body = await request.json();
  const store = mutateStore((s) => {
    const client = s.clients.find((c) => c.id === id || c.client_id === id);
    if (!client) return;
    if (body.build_progress !== undefined) syncClientBuildProgress(s, client.id, body.build_progress);
    if (body.stage) client.stage = body.stage;
  });
  const client = store.clients.find((c) => c.id === id || c.client_id === id);
  if (!client) return jsonResponse({ error: "Client not found" }, { status: 404 }, origin);
  return jsonResponse({ client }, undefined, origin);
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getStore().clients.find((c) => c.id === id || c.client_id === id);
  if (!client) return jsonResponse({ error: "Client not found" }, { status: 404 }, getOrigin(request));
  return jsonResponse({ client }, undefined, getOrigin(request));
}
