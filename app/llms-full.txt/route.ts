import { buildAgentFullText } from "@/lib/agent-docs";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildAgentFullText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
