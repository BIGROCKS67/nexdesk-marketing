import { DEMO_CLIENT_ID } from "@/data/portal/mock-data";

export const DEMO_CLIENT_EMAIL = "demo@nexdesk.app";
export const DEMO_CLIENT_PASSWORD = "NexDesk2026!";

export const demoClientSession = {
  email: DEMO_CLIENT_EMAIL,
  name: "Sarah Whitfield",
  company: "Whitfield Group",
};

export function isDemoLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_CLIENT_EMAIL &&
    password === DEMO_CLIENT_PASSWORD
  );
}

export const demoClientSessionWithId = {
  ...demoClientSession,
  clientId: DEMO_CLIENT_ID,
};

export const DEMO_ADMIN_EMAIL = "admin@nexdesk.app";
export const DEMO_ADMIN_PASSWORD = "NexDeskAdmin2026!";

export function isAdminLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
    password === DEMO_ADMIN_PASSWORD
  );
}

export const demoAdminSession = {
  email: DEMO_ADMIN_EMAIL,
  name: "NexDesk Admin",
  role: "admin" as const,
};
