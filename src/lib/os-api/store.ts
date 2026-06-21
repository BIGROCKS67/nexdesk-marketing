import fs from "fs";
import path from "path";
import type { OsStore } from "./types";
import { createSeedStore } from "./seed";

declare global {
  // eslint-disable-next-line no-var
  var __nexdeskOsStore: OsStore | undefined;
}

function storePath() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "nexdesk-os-store.json");
  }
  return path.join(process.cwd(), "data", "nexdesk-os-store.json");
}

function readFromDisk(): OsStore | null {
  const file = storePath();
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8")) as OsStore;
    }
  } catch {
    /* fall through */
  }
  return null;
}

function writeToDisk(store: OsStore) {
  const file = storePath();
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(store, null, 2));
  } catch (err) {
    console.warn("[os-store] persist failed:", err);
  }
}

export function getStore(): OsStore {
  if (global.__nexdeskOsStore) return global.__nexdeskOsStore;

  const disk = readFromDisk();
  global.__nexdeskOsStore = disk ?? createSeedStore();
  if (!disk) writeToDisk(global.__nexdeskOsStore);
  return global.__nexdeskOsStore;
}

export function saveStore(store: OsStore) {
  store.updated_at = new Date().toISOString();
  global.__nexdeskOsStore = store;
  writeToDisk(store);
}

export function mutateStore(mutator: (store: OsStore) => void): OsStore {
  const store = structuredClone(getStore());
  mutator(store);
  saveStore(store);
  return store;
}

export function nextLeadId(store: OsStore) {
  const nums = store.leads
    .map((l) => parseInt(l.lead_id.replace(/\D/g, "").slice(-6), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 144) + 1;
  return `LEAD-2026-${String(next).padStart(6, "0")}`;
}

export function nextClientId(store: OsStore) {
  const nums = store.clients
    .map((c) => parseInt(String(c.client_id).replace(/\D/g, "").slice(-6), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 487) + 1;
  return `CL-2026-${String(next).padStart(6, "0")}`;
}

export function syncClientBuildProgress(store: OsStore, clientId: string, progress: number) {
  const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
  if (!client) return;
  client.build_progress = progress;
  store.projects
    .filter((p) => p.client_id === client.id)
    .forEach((p) => {
      p.progress = progress;
    });
}

export function syncProjectsToClientProgress(store: OsStore, clientId: string) {
  const projects = store.projects.filter((p) => p.client_id === clientId);
  if (!projects.length) return;
  const avg = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  );
  const client = store.clients.find((c) => c.id === clientId || c.client_id === clientId);
  if (client) client.build_progress = avg;
}
