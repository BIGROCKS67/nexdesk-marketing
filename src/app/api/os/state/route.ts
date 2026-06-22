import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { sanitizeStoreForApi } from "@/lib/os-api/sanitize";
import { getStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function GET(request: Request) {
  const store = await getStore();
  return jsonResponse(sanitizeStoreForApi(store), undefined, getOrigin(request));
}
