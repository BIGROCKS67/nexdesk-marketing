"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { allClients, allSupportTickets } from "@/data/portal/mock-data";

export default function AdminSupportPage() {
  const [selectedId, setSelectedId] = useState(allSupportTickets[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [replies, setReplies] = useState<Record<string, { body: string; date: string }[]>>({});
  const [resolved, setResolved] = useState<string[]>([]);

  const ticket = allSupportTickets.find((t) => t.id === selectedId);
  const client = ticket ? allClients.find((c) => c.id === ticket.clientId) : null;
  const isResolved = ticket ? resolved.includes(ticket.id) || ticket.status === "Resolved" : false;

  const messages = [
    ...(ticket?.messages ?? []),
    ...(replies[selectedId] ?? []).map((m, i) => ({
      id: `admin-${i}`,
      clientId: ticket?.clientId ?? "",
      sender: "team" as const,
      author: "NexDesk Support",
      message: m.body,
      timestamp: m.date,
    })),
  ];

  function sendReply() {
    if (!draft.trim() || !selectedId) return;
    setReplies((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), { body: draft.trim(), date: new Date().toLocaleString("en-GB") }],
    }));
    setDraft("");
  }

  return (
    <div className="space-y-6">
      <PortalPageHeader title="Support" description="Reply to client messages and resolve tickets." />

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="glass rounded-xl p-3">
          <ul className="space-y-1">
            {allSupportTickets.map((t) => {
              const c = allClients.find((cl) => cl.id === t.clientId);
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      selectedId === t.id ? "bg-nx-cyan/10 text-nx-cyan" : "text-nx-grey hover:bg-white/5"
                    }`}
                  >
                    <p className="font-medium line-clamp-1">{t.subject}</p>
                    <p className="text-xs text-nx-grey">{c?.company}</p>
                    <StatusBadge
                      status={resolved.includes(t.id) ? "Resolved" : t.status}
                      className="mt-1"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {ticket && (
          <div className="glass flex min-h-[480px] flex-col rounded-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-5">
              <div>
                <h3 className="font-medium text-white">{ticket.subject}</h3>
                <p className="text-xs text-nx-grey">{client?.company} · {client?.name}</p>
              </div>
              {!isResolved && (
                <Button size="sm" variant="outline" onClick={() => setResolved((r) => [...r, ticket.id])}>
                  Mark resolved
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                    m.sender === "team" ? "ml-auto bg-nx-cyan/15 text-white" : "bg-white/5 text-nx-grey"
                  }`}
                >
                  <p>{m.message}</p>
                  <p className="mt-1 text-[10px] opacity-60">{m.timestamp}</p>
                </div>
              ))}
            </div>
            {!isResolved && (
              <div className="border-t border-white/5 p-4">
                <div className="flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendReply()}
                    placeholder="Reply to client…"
                    className="flex-1 rounded-lg border border-white/10 bg-nx-black/50 px-3 py-2 text-sm text-white placeholder:text-nx-grey focus:border-nx-cyan/40 focus:outline-none"
                  />
                  <Button size="sm" onClick={sendReply}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
