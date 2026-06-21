import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { clientFromLead } from "@/lib/os-api/mappers";
import { getStore, mutateStore, nextClientId } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const body = await request.json();
  const store = getStore();
  const lead = store.leads.find((l) => l.lead_id === body.lead_id || l.id === body.lead_id);
  if (!lead) return jsonResponse({ error: "Lead not found" }, { status: 404 }, origin);
  const clientId = nextClientId(store);
  const { client, portalUser, project } = clientFromLead(lead, clientId, { depositPaid: !!body.deposit_paid });
  mutateStore((s) => {
    lead.status = "Sold";
    s.clients.push(client);
    s.projects.push(project);
    if (portalUser) s.portal_users.push(portalUser);
  });
  return jsonResponse({ client, portal_password: portalUser?.password ?? null }, { status: 201 }, origin);
}
