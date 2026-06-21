"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { useClientPortal } from "@/contexts/ClientPortalContext";
import { PortalPageHeader, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { DEMO_CLIENT_ID, getClientData } from "@/data/portal/mock-data";

export default function SupportPage() {
  const { session } = useClientPortal();
  const data = getClientData(session?.clientId ?? DEMO_CLIENT_ID);
  const clientId = session?.clientId ?? DEMO_CLIENT_ID;
  const [selectedId, setSelectedId] = useState(data.tickets[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, { body: string; date: string }[]>>({});

  const ticket = data.tickets.find((t) => t.id === selectedId);
  const messages = [
    ...(ticket?.messages ?? []),
    ...(extraMessages[selectedId] ?? []).map((m, i) => ({
      id: `local-${i}`,
      clientId: clientId,
      sender: "client" as const,
      author: session?.name ?? "Client",
      message: m.body,
      timestamp: m.date,
    })),
  ];

  function sendMessage() {
    if (!draft.trim() || !selectedId) return;
    setExtraMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] ?? []),
        { body: draft.trim(), date: new Date().toLocaleString("en-GB") },
      ],
    }));
    setDraft("");
  }

  return (
    <div className="space-y-6">
      <PortalPageHeader title="Support" description="Message our team — replies appear here." />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="glass rounded-xl p-3">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-nx-grey">Conversations</p>
          <ul className="mt-2 space-y-1">
            {data.tickets.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    selectedId === t.id ? "bg-nx-cyan/10 text-nx-cyan" : "text-nx-grey hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="line-clamp-1 font-medium">{t.subject}</span>
                    {t.unreadByClient > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-nx-cyan px-1 text-[10px] font-bold text-nx-black">
                        {t.unreadByClient}
                      </span>
                    )}
                  </div>
                  <StatusBadge status={t.status} className="mt-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {ticket && (
          <div className="glass flex min-h-[480px] flex-col rounded-xl">
            <div className="border-b border-white/5 px-4 py-3 sm:px-5">
              <h3 className="font-medium text-white">{ticket.subject}</h3>
              <StatusBadge status={ticket.status} className="mt-1" />
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                    m.sender === "client"
                      ? "ml-auto bg-nx-cyan/15 text-white"
                      : "bg-white/5 text-nx-grey"
                  }`}
                >
                  <p>{m.message}</p>
                  <p className="mt-1 text-[10px] opacity-60">{m.timestamp}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 p-4">
              <div className="flex gap-2">
                <button type="button" className="rounded-lg p-2 text-nx-grey hover:bg-white/5" aria-label="Attach file">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message…"
                  className="flex-1 rounded-lg border border-white/10 bg-nx-black/50 px-3 py-2 text-sm text-white placeholder:text-nx-grey focus:border-nx-cyan/40 focus:outline-none"
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-[10px] text-nx-grey">Attachments placeholder — backend integration ready.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
