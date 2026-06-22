import { jsonResponse } from "./cors";

const CRM_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "https://internal-crm-mu.vercel.app",
];

export function assertWriteAccess(request: Request, origin: string | null): Response | null {
  const secret = process.env.OS_API_SECRET;
  if (secret) {
    const header = request.headers.get("authorization") ?? request.headers.get("x-os-api-key");
    const token = header?.replace(/^Bearer\s+/i, "");
    if (token === secret) return null;
  }

  const allowed =
    origin &&
    (CRM_ORIGINS.includes(origin) ||
      origin.endsWith(".vercel.app") && origin.includes("internal-crm"));

  if (allowed) return null;

  return jsonResponse(
    { error: "Unauthorized — write access requires CRM origin or OS_API_SECRET" },
    { status: 401 },
    origin
  );
}
