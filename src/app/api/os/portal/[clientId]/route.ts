import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { mapPortalPayload } from "@/lib/os-api/mappers";
import { getStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function GET(request: Request, { params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const origin = getOrigin(request);
  const payload = mapPortalPayload(await getStore(), clientId);
  if (!payload) return jsonResponse({ error: "Client not found" }, { status: 404 }, origin);
  return jsonResponse(payload, undefined, origin);
}
