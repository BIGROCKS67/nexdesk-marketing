import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore } from "@/lib/os-api/store";
import { isDemoLogin, demoClientSessionWithId } from "@/data/client-portal-demo";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const { email, password } = await request.json();
  if (isDemoLogin(email, password)) {
    return jsonResponse({ session: demoClientSessionWithId }, undefined, origin);
  }
  const user = getStore().portal_users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!user) return jsonResponse({ error: "Invalid credentials" }, { status: 401 }, origin);
  return jsonResponse(
    { session: { email: user.email, name: user.name, company: user.company, clientId: user.client_id } },
    undefined,
    origin,
  );
}
