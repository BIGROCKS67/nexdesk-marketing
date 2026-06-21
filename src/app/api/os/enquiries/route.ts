import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { leadFromEnquiry } from "@/lib/os-api/mappers";
import { getStore, mutateStore, nextLeadId } from "@/lib/os-api/store";
import type { EnquiryPayload } from "@/lib/os-api/types";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const body = (await request.json()) as EnquiryPayload;
  if (!body.name || !body.company || !body.email || !body.details) {
    return jsonResponse({ error: "Missing required fields" }, { status: 400 }, origin);
  }
  const store = getStore();
  const duplicate = store.leads.find(
    (l) => l.email === body.email && l.business_name === body.company && l.notes === body.details,
  );
  if (duplicate) {
    return jsonResponse({ duplicate: true, lead_id: duplicate.lead_id }, { status: 200 }, origin);
  }
  const leadId = nextLeadId(store);
  mutateStore((s) => { s.leads.unshift(leadFromEnquiry(body, leadId)); });
  return jsonResponse({ lead_id: leadId, id: leadId }, { status: 201 }, origin);
}
