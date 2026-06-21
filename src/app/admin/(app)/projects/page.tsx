"use client";

import { useState } from "react";
import { PortalPageHeader, ProgressBar, StatusBadge } from "@/components/portal/PortalUI";
import { Button } from "@/components/ui/button";
import { allClients, allProjects } from "@/data/portal/mock-data";
import { BUILD_STAGES } from "@/data/portal/types";

export default function AdminProjectsPage() {
  const [progressOverrides, setProgressOverrides] = useState<Record<string, number>>({});
  const [stageOverrides, setStageOverrides] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <PortalPageHeader title="Projects" description="Update build progress and stages for all clients." />

      <div className="space-y-4">
        {allProjects.map((p) => {
          const client = allClients.find((c) => c.id === p.clientId);
          const progress = progressOverrides[p.id] ?? p.progress;
          const stage = stageOverrides[p.id] ?? p.currentStage;
          return (
            <div key={p.id} className="glass rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-nx-grey">{client?.company} · {p.category}</p>
                  <StatusBadge status={p.status} className="mt-2" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-xs text-nx-grey">
                    Progress
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onChange={(e) =>
                        setProgressOverrides((o) => ({ ...o, [p.id]: Number(e.target.value) }))
                      }
                      className="ml-2 align-middle"
                    />
                    <span className="ml-2 text-white">{progress}%</span>
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStageOverrides((o) => ({ ...o, [p.id]: e.target.value }))}
                    className="rounded-lg border border-white/10 bg-nx-black px-2 py-1 text-xs text-white"
                  >
                    {BUILD_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ProgressBar value={progress} className="mt-4" />
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">Add update</Button>
                <Button size="sm" variant="ghost">Save changes</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
