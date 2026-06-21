import { jsonResponse } from "@/lib/os-api/cors";
export async function GET() {
  return jsonResponse({ ok: true, service: "nexdesk-os", version: 1 });
}
