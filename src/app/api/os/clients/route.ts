import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { getStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function GET(request: Request) {
  return jsonResponse({ clients: (await getStore()).clients }, undefined, getOrigin(request));
}
