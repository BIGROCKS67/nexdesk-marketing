import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore } from "@/lib/os-api/store";
import { getStripe, siteUrl, stripeConfigured } from "@/lib/stripe/client";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const body = await request.json();
  const clientId = body.clientId as string;

  if (!clientId) {
    return jsonResponse({ error: "clientId required" }, { status: 400 }, origin);
  }

  if (!stripeConfigured()) {
    const store = await getStore();
    const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
    return jsonResponse(
      {
        url: `https://billing.stripe.com/p/login/demo${client?.stripe_customer_id ? `?customer=${client.stripe_customer_id}` : ""}`,
        demo: true,
      },
      undefined,
      origin
    );
  }

  const store = await getStore();
  const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
  if (!client?.stripe_customer_id) {
    return jsonResponse({ error: "Client has no Stripe customer ID" }, { status: 404 }, origin);
  }

  const stripe = getStripe()!;
  const session = await stripe.billingPortal.sessions.create({
    customer: client.stripe_customer_id,
    return_url: `${siteUrl()}/client-portal/app/settings`,
  });

  return jsonResponse({ url: session.url }, undefined, origin);
}
