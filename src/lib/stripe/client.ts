import Stripe from "stripe";

let stripeClient: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (stripeClient !== undefined) return stripeClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    stripeClient = null;
    return null;
  }
  stripeClient = new Stripe(key);
  return stripeClient;
}

export function stripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

export function estimateStripeFee(amount: number, currency = "gbp"): number {
  const fixed = currency.toLowerCase() === "gbp" ? 0.2 : 0.3;
  return Math.round((amount * 0.029 + fixed) * 100) / 100;
}

export function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "")}`;

  return process.env.NODE_ENV === "production"
    ? "https://nexdesk-marketing.vercel.app"
    : "http://localhost:3000";
}
