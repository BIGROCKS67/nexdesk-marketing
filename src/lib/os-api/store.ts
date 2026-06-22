import fs from "fs";
import path from "path";
import type { OsStore } from "@/lib/os-api/types";
import { dbEnabled, prisma } from "@/lib/db/prisma";
import { migrateStore } from "./migrate";
import { promoteOverdueInvoices } from "./invoices";
import { createSeedStore } from "./seed";

declare global {
  // eslint-disable-next-line no-var
  var __nexdeskOsStore: OsStore | undefined;
  // eslint-disable-next-line no-var
  var __nexdeskStoreLoaded: boolean | undefined;
}

function storePath() {
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
    console.warn("[os-store] disk persist failed:", err);
  }
}

function prepareStore(raw: OsStore): OsStore {
  const store = migrateStore(raw);
  promoteOverdueInvoices(store);
  return store;
}

async function loadFromDatabase(): Promise<OsStore | null> {
  if (!dbEnabled()) return null;
  try {
    const row = await prisma.storeSnapshot.findUnique({ where: { id: "main" } });
    if (!row) return null;
    return prepareStore(row.payload as unknown as OsStore);
  } catch (err) {
    console.error("[os-store] database load failed:", err);
    return null;
  }
}

async function saveToDatabase(store: OsStore) {
  if (!dbEnabled()) return;
  store.updated_at = new Date().toISOString();
  await prisma.storeSnapshot.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      version: store.version,
      payload: store as object,
    },
    update: {
      version: store.version,
      payload: store as object,
    },
  });
  const { syncPortalCredentialsFromStore } = await import("@/lib/db/portal-auth");
  await syncPortalCredentialsFromStore(store);
}

async function bootstrapStore(): Promise<OsStore> {
  const fromDb = await loadFromDatabase();
  if (fromDb) return fromDb;

  const fromDisk = readFromDisk();
  const store = prepareStore(fromDisk ?? createSeedStore());

  if (dbEnabled()) {
    await saveToDatabase(store);
  } else if (!fromDisk) {
    writeToDisk(store);
  }

  return store;
}

/** Load store once per warm serverless instance. */
export async function ensureStore(): Promise<OsStore> {
  if (global.__nexdeskOsStore && global.__nexdeskStoreLoaded) {
    promoteOverdueInvoices(global.__nexdeskOsStore);
    return global.__nexdeskOsStore;
  }

  const store = await bootstrapStore();
  global.__nexdeskOsStore = store;
  global.__nexdeskStoreLoaded = true;
  return store;
}

export async function getStore(): Promise<OsStore> {
  return ensureStore();
}

export async function saveStore(store: OsStore) {
  store.updated_at = new Date().toISOString();
  promoteOverdueInvoices(store);
  global.__nexdeskOsStore = store;
  global.__nexdeskStoreLoaded = true;

  if (dbEnabled()) {
    await saveToDatabase(store);
  } else {
    writeToDisk(store);
  }
}

/** Transactional mutate — reloads from DB to avoid stale writes on serverless. */
export async function mutateStore(mutator: (store: OsStore) => void): Promise<OsStore> {
  if (dbEnabled()) {
    return prisma.$transaction(async () => {
      const row = await prisma.storeSnapshot.findUnique({ where: { id: "main" } });
      const base = row
        ? prepareStore(row.payload as unknown as OsStore)
        : prepareStore(readFromDisk() ?? createSeedStore());
      const store = structuredClone(base);
      mutator(store);
      promoteOverdueInvoices(store);
      store.updated_at = new Date().toISOString();

      await prisma.storeSnapshot.upsert({
        where: { id: "main" },
        create: { id: "main", version: store.version, payload: store as object },
        update: { version: store.version, payload: store as object },
      });
      const { syncPortalCredentialsFromStore } = await import("@/lib/db/portal-auth");
      await syncPortalCredentialsFromStore(store);

      global.__nexdeskOsStore = store;
      global.__nexdeskStoreLoaded = true;
      return store;
    });
  }

  const store = structuredClone(await ensureStore());
  mutator(store);
  await saveStore(store);
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
