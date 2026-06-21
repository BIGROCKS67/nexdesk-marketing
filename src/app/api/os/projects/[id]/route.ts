import { getOrigin, jsonResponse, optionsResponse } from "@/lib/os-api/cors";
import { mutateStore } from "@/lib/os-api/store";

export async function OPTIONS(request: Request) {
  return optionsResponse(getOrigin(request));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const origin = getOrigin(request);
  const body = await request.json();
  const store = mutateStore((s) => {
    const project = s.projects.find((p) => p.id === id);
    if (!project) return;
    if (body.progress !== undefined) project.progress = body.progress;
    if (body.status) project.status = body.status;
    if (body.current_stage) project.current_stage = body.current_stage;
  });
  const project = store.projects.find((p) => p.id === id);
  if (!project) return jsonResponse({ error: "Project not found" }, { status: 404 }, origin);
  return jsonResponse({ project }, undefined, origin);
}
