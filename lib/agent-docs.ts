import "server-only";
import { allDocs, docSections, routeFor } from "./docs-catalog";
import { readDoc } from "./docs";
import { agentMarkdown } from "./agent-markdown";
import { markdownRouteFor, siteUrl } from "./site-url";

export function buildAgentIndex() {
  return [
    "# Rustic Engine documentation",
    "> Guides and API reference for building games with Rustic Engine, plus open source contributor documentation.",
    "Each link below returns plain Markdown without JavaScript. Pages include all scripting language examples and current implementation limits. Documentation version and engine/API versions are separate; consult Feature status and compatibility before assuming support.",
    `Full documentation: [llms-full.txt](${siteUrl}/llms-full.txt). Human-readable site: [Docs](${siteUrl}/docs).`,
    ...docSections.flatMap((section) => section.groups.map((group) => [
      `## ${section.title}: ${group.label}`,
      ...group.docs.map((doc) => `- [${doc.title}](${siteUrl}${markdownRouteFor(doc.slug)}): ${doc.description}`),
    ].join("\n"))),
  ].join("\n\n") + "\n";
}

export async function readAgentDoc(doc: (typeof allDocs)[number]) {
  const markdown = agentMarkdown(await readDoc(doc.source), doc.sourcePath ?? doc.source);
  return `<!-- Page: ${siteUrl}${routeFor(doc.slug)} -->\n\n${markdown.trim()}\n`;
}

export async function buildAgentFullText() {
  const pages = await Promise.all(allDocs.map(readAgentDoc));
  return `${buildAgentIndex()}\n---\n\n${pages.join("\n---\n\n")}`;
}
