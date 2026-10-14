import type { RootContent } from "mdast";
import { allDocs, resolveDocSlug } from "./docs-catalog";
import { resolveDocHref } from "./docs-markdown";
import { parseMarkdown } from "./markdown-model";
import { markdownRouteFor, siteUrl } from "./site-url";

const slugs = new Set(allDocs.map((doc) => doc.slug));

// Edit only parsed link destinations; code fences and authored examples stay intact.
export function agentMarkdown(source: string, sourcePath: string) {
  const edits: { start: number; end: number; value: string }[] = [];
  function walk(nodes: RootContent[]) {
    for (const node of nodes) {
      if (node.type === "link" || node.type === "definition" || node.type === "image") {
        const start = node.position?.start.offset;
        const end = node.position?.end.offset;
        const href = resolveDocHref(node.url, sourcePath);
        const [pathname, fragment] = href.split("#", 2);
        const slug = resolveDocSlug(pathname.replace(/^\/docs\//, ""));
        const target = pathname.startsWith("/docs/") && slugs.has(slug)
          ? `${siteUrl}${markdownRouteFor(slug)}${fragment ? `#${fragment}` : ""}`
          : href.startsWith("/") ? `${siteUrl}${href}` : href;
        if (start !== undefined && end !== undefined && target !== node.url) {
          const original = source.slice(start, end);
          const destination = node.type === "definition" ? /^\[[^\]]+\]:\s*<?/ : /\]\(\s*<?/;
          const prefix = destination.exec(original);
          if (prefix) {
            const offset = start + prefix.index + prefix[0].length;
            // Escaped destinations need serialization; leave those authored links alone.
            if (source.slice(offset, offset + node.url.length) === node.url) {
              edits.push({ start: offset, end: offset + node.url.length, value: target });
            }
          }
        }
      }
      if ("children" in node) walk(node.children as RootContent[]);
    }
  }
  walk(parseMarkdown(source).children);
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, edit.start) + edit.value + source.slice(edit.end);
  }
  return source;
}
