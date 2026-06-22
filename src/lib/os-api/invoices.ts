import type { OsInvoice, OsStore } from "./types";

export function promoteOverdueInvoices(store: OsStore) {
  const today = new Date().toISOString().slice(0, 10);
  for (const inv of store.invoices) {
    if (inv.status === "Due" && inv.due_date < today) {
      inv.status = "Overdue";
    }
  }
}

export function invoicePortalStatus(inv: OsInvoice): "Paid" | "Due" | "Overdue" | "Failed" | "Cancelled" {
  if (inv.status === "Paid") return "Paid";
  if (inv.status === "Failed") return "Failed";
  if (inv.status === "Overdue") return "Overdue";
  if (inv.status === "Cancelled") return "Cancelled";
  const today = new Date().toISOString().slice(0, 10);
  if (inv.status === "Due" && inv.due_date < today) return "Overdue";
  return "Due";
}
