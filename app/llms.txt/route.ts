import { buildAgentIndex } from "@/lib/agent-docs";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildAgentIndex(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
