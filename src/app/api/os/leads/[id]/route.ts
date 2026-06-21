import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { mutateStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const body = await request.json();
  const store = mutateStore((s) => {
    const lead = s.leads.find((l) => l.lead_id === id || l.id === id);
    if (!lead) return;
    if (body.status) lead.status = body.status;
    if (body.notes !== undefined) lead.notes = body.notes;
  });
  const lead = store.leads.find((l) => l.lead_id === id || l.id === id);
  if (!lead) return jsonResponse({ error: "Lead not found" }, { status: 404 }, origin);
  return jsonResponse({ lead }, undefined, origin);
}
