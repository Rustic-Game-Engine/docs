import { allDocs } from "@/lib/docs-catalog";
import { readAgentDoc } from "@/lib/agent-docs";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: `${doc.slug}.md`.split("/") }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = allDocs.find((entry) => `${entry.slug}.md` === slug.join("/"));
  if (!doc) return new Response("Documentation not found", { status: 404 });
  return new Response(await readAgentDoc(doc), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
