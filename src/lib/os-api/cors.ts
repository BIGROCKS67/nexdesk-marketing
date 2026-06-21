import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "https://internal-crm-mu.vercel.app",
  "https://nexdesk-marketing.vercel.app",
  "https://nexdesk.app",
  "https://www.nexdesk.app",
  "https://bigrocks67.github.io",
];

export function corsHeaders(origin: string | null) {
  const allowed =
    origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".vercel.app"));
  return {
    "Access-Control-Allow-Origin": allowed ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export function jsonResponse(data: unknown, init?: ResponseInit, origin?: string | null) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders(origin ?? null),
      ...(init?.headers ?? {}),
    },
  });
}

export function optionsResponse(origin: string | null) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export function getOrigin(request: Request) {
  return request.headers.get("origin");
}
