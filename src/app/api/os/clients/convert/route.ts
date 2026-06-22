import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { clientFromLead } from "@/lib/os-api/mappers";
import { getStore, mutateStore, nextClientId } from "@/lib/os-api/store";
import { getStripe, stripeConfigured } from "@/lib/stripe/client";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const body = await request.json();
  const store = await getStore();
  const lead = store.leads.find((l) => l.lead_id === body.lead_id || l.id === body.lead_id);
  if (!lead) return jsonResponse({ error: "Lead not found" }, { status: 404 }, origin);

  let stripeCustomerId: string | undefined;

  if (stripeConfigured()) {
    try {
      const stripe = getStripe()!;
      const customer = await stripe.customers.create({
        email: lead.email,
        name: lead.contact,
        phone: lead.phone || undefined,
        metadata: {
          lead_id: lead.id,
          business_name: lead.business_name,
        },
      });
      stripeCustomerId = customer.id;
    } catch (err) {
      console.warn("[convert] Stripe customer creation failed:", err);
    }
  }

  const clientId = nextClientId(store);
  const { client, portalUser, project } = clientFromLead(lead, clientId, {
    depositPaid: !!body.deposit_paid,
    stripeCustomerId,
  });

  await mutateStore((s) => {
    const leadRecord = s.leads.find((l) => l.lead_id === body.lead_id || l.id === body.lead_id);
    if (leadRecord) leadRecord.status = "Sold";
    s.clients.push(client);
    s.projects.push(project);
    if (portalUser) s.portal_users.push(portalUser);

    if (body.deposit_paid && client.monthly_price) {
      s.subscriptions.push({
        id: `sub-${clientId}`,
        client_id: clientId,
        client_name: client.business_name,
        product: client.product,
        product_id: "prod-crm-monthly",
        status: "Active",
        mrr: client.monthly_price,
        started: new Date().toISOString().slice(0, 10),
        renewal: client.renewal_date,
        stripe_subscription_id: stripeCustomerId ? undefined : `sub_pending_${clientId}`,
        stripe_customer_id: stripeCustomerId,
        type: "crm",
        currency: "GBP",
        billing_frequency: "monthly",
      });
    }
  });

  return jsonResponse(
    {
      client,
      portal_password: portalUser?.password ?? null,
      stripe_customer_id: stripeCustomerId ?? null,
    },
    { status: 201 },
    origin
  );
}
