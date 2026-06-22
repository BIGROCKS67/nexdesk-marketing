import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function GET(request: Request) {
  return jsonResponse({ leads: (await getStore()).leads }, undefined, getOrigin(request));
}
