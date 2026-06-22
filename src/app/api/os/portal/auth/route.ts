import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore } from "@/lib/os-api/store";
import { dbEnabled } from "@/lib/db/prisma";
import { findPortalUserByEmail, verifyPortalPassword } from "@/lib/db/portal-auth";
import { isDemoLogin, demoClientSessionWithId } from "@/data/client-portal-demo";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function POST(request: Request) {
  const origin = getOrigin(request);
  const { email, password } = await request.json();
  const normalizedEmail = email.trim().toLowerCase();

  if (isDemoLogin(email, password)) {
    return jsonResponse({ session: demoClientSessionWithId }, undefined, origin);
  }

  if (dbEnabled()) {
    const cred = await findPortalUserByEmail(normalizedEmail);
    if (!cred || !(await verifyPortalPassword(password, cred.passwordHash))) {
      return jsonResponse({ error: "Invalid credentials" }, { status: 401 }, origin);
    }
    return jsonResponse(
      {
        session: {
          email: cred.email,
          name: cred.name,
          company: cred.company,
          clientId: cred.clientId,
        },
      },
      undefined,
      origin
    );
  }

  const user = (await getStore()).portal_users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  if (!user) return jsonResponse({ error: "Invalid credentials" }, { status: 401 }, origin);
  return jsonResponse(
    { session: { email: user.email, name: user.name, company: user.company, clientId: user.client_id } },
    undefined,
    origin
  );
}
