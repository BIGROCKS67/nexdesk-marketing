import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStripe } from "@/lib/stripe/client";
import { handleStripeEvent } from "@/lib/stripe/webhooks";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return jsonResponse(
      { error: "Stripe webhooks not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET." },
      { status: 503 },
      origin
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return jsonResponse({ error: "Missing stripe-signature header" }, { status: 400 }, origin);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return jsonResponse({ error: message }, { status: 400 }, origin);
  }

  const result = await handleStripeEvent(event);
  return jsonResponse({ received: true, ...result }, undefined, origin);
}
