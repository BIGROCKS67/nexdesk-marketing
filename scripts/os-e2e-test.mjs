#!/usr/bin/env node
/**
 * End-to-end stress test: Website enquiry → Staff CRM leads → Client portal sync
 * Usage: node scripts/os-e2e-test.mjs [baseUrl]
 */
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const tests = [];
let passed = 0;
let failed = 0;

function assert(name, condition, detail = "") {
  tests.push({ name, ok: !!condition, detail });
  if (condition) {
    passed++;
    console.log(`✓ ${name}`);
  } else {
    failed++;
    console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

async function json(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

async function run() {
  console.log(`\nNexDesk OS E2E — ${BASE}\n`);

  const health = await json("/api/os/health");
  assert("API health check", health.res.ok && health.data.ok);

  const stamp = Date.now();
  const enquiry = await json("/api/os/enquiries", {
    method: "POST",
    body: JSON.stringify({
      name: "E2E Tester",
      company: `E2E Corp ${stamp}`,
      email: `e2e-${stamp}@test.nexdesk.app`,
      phone: "+447700900000",
      details: "Automated end-to-end test enquiry from marketing website.",
      source: "E2E Test",
      product_interest: "Custom Software Development",
    }),
  });
  assert("Website enquiry creates lead", enquiry.res.status === 201, enquiry.data.error);
  const leadId = enquiry.data.lead_id;
  assert("Lead ID returned", !!leadId);

  const leads = await json("/api/os/leads");
  assert("Lead appears in staff pipeline", leads.data.leads?.some((l) => l.lead_id === leadId));

  const patch = await json(`/api/os/leads/${leadId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "Negotiation", notes: "E2E — ready to close" }),
  });
  assert("Staff can update lead", patch.res.ok);

  const convert = await json("/api/os/clients/convert", {
    method: "POST",
    body: JSON.stringify({ lead_id: leadId, deposit_paid: true }),
  });
  assert("Sold lead converts to client", convert.res.status === 201, convert.data.error);
  const clientId = convert.data.client?.client_id;
  assert("Client ID created", !!clientId);

  const progress = await json(`/api/os/clients/${clientId}`, {
    method: "PATCH",
    body: JSON.stringify({ build_progress: 67 }),
  });
  assert("Staff updates build progress", progress.res.ok && progress.data.client?.build_progress === 67);

  const sync = await json(`/api/os/clients/${clientId}/sync`, { method: "POST", body: "{}" });
  assert("Portal sync succeeds", sync.res.ok && sync.data.client?.portal_sync === "Synced");

  const portal = await json(`/api/os/portal/${clientId}`);
  assert("Client portal receives live data", portal.res.ok);
  assert(
    "Portal shows 67% build progress",
    portal.data.projects?.some((p) => p.progress === 67) || portal.data.buildProgress === 67,
    `got ${portal.data.buildProgress}`
  );

  const auth = await json("/api/os/portal/auth", {
    method: "POST",
    body: JSON.stringify({
      email: convert.data.client.email,
      password: convert.data.portal_password || "NexDesk2026!",
    }),
  });
  assert("Client portal login works", auth.res.ok && auth.data.session?.clientId === clientId);

  const bulk = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      json("/api/os/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: `Load ${i}`,
          company: `Load Co ${stamp}-${i}`,
          email: `load-${stamp}-${i}@test.nexdesk.app`,
          details: "Bulk load test",
        }),
      })
    )
  );
  assert(
    "Bulk enquiry stress (10 parallel)",
    bulk.every((r) => r.res.ok || r.res.status === 201),
    `${bulk.filter((r) => !r.res.ok && r.res.status !== 201).length} failed`
  );

  console.log(`\n${passed} passed, ${failed} failed\n`);
  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
