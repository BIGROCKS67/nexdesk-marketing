import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore, mutateStore } from "@/lib/os-api/store";
import { getStripe, siteUrl, stripeConfigured } from "@/lib/stripe/client";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const body = await request.json();
  const { clientId, priceId, mode = "subscription" } = body as {
    clientId?: string;
    priceId?: string;
    mode?: "subscription" | "payment";
  };

  if (!clientId) {
    return jsonResponse({ error: "clientId required" }, { status: 400 }, origin);
  }

  const store = await getStore();
  const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
  if (!client) {
    return jsonResponse({ error: "Client not found" }, { status: 404 }, origin);
  }

  if (!stripeConfigured()) {
    return jsonResponse(
      {
        url: `${siteUrl()}/client-portal/app/payments?demo_checkout=1`,
        demo: true,
        message: "Stripe not configured — demo mode",
      },
      undefined,
      origin
    );
  }

  const stripe = getStripe()!;
  let customerId = client.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: client.email,
      name: client.contact_name,
      metadata: { client_id: client.id, business_name: client.business_name },
    });
    customerId = customer.id;
    await mutateStore((s) => {
      const c = s.clients.find((x) => x.id === client.id);
      if (c) c.stripe_customer_id = customerId;
    });
  }

  const lineItems = priceId
    ? [{ price: priceId, quantity: 1 }]
    : [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: client.product || "NexDesk Service" },
            unit_amount: Math.round((mode === "subscription" ? client.monthly_price : client.setup_fee) * 100),
            ...(mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        },
      ];

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    line_items: lineItems,
    success_url: `${siteUrl()}/client-portal/app/payments?success=1`,
    cancel_url: `${siteUrl()}/client-portal/app/payments?cancelled=1`,
    metadata: { client_id: client.id },
  });

  return jsonResponse({ url: session.url }, undefined, origin);
}
