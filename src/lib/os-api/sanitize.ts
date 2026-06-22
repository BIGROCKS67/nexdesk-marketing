import type { OsStore } from "./types";

/** Public API view — never expose portal credentials. */
export function sanitizeStoreForApi(store: OsStore): Omit<OsStore, "portal_users"> & { portal_users: never[] } {
  const { portal_users: _removed, ...rest } = store;
  return { ...rest, portal_users: [] };
}
