import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import type { OsLead } from "@/lib/os-api/types";
import { mutateStore } from "@/lib/os-api/store";

const LEAD_PATCH_KEYS: (keyof OsLead)[] = [
  "status",
  "notes",
  "assigned_to",
  "closer_id",
  "affiliate_id",
  "setter_stage",
  "closer_stage",
  "last_contact",
  "next_followup",
  "lead_score",
  "estimated_value",
  "product_interest",
];

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const body = await request.json();
  const store = await mutateStore((s) => {
    const lead = s.leads.find((l) => l.lead_id === id || l.id === id);
    if (!lead) return;
    for (const key of LEAD_PATCH_KEYS) {
      if (body[key] !== undefined) {
        // @ts-expect-error dynamic patch from CRM
        lead[key] = body[key];
      }
    }
  });
  const lead = store.leads.find((l) => l.lead_id === id || l.id === id);
  if (!lead) return jsonResponse({ error: "Lead not found" }, { status: 404 }, origin);
  return jsonResponse({ lead }, undefined, origin);
}
