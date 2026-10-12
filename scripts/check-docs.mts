import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { allDocs, docAliases, resolveDocSlug, routeFor } from "../lib/docs-catalog";
import { parseMarkdown, headingIndex } from "../lib/markdown-model";
import { resolveDocHref } from "../components/markdown";
import { load } from "./load-lib.mjs";
const { readDoc } = load("docs.ts");
const pages = await Promise.all(allDocs.map(async (doc) => ({ doc, markdown: await readDoc(doc.source) as string })));
const ids = new Map(pages.map(({ doc, markdown }) => [doc.slug, new Set(headingIndex(parseMarkdown(markdown)).map((heading) => heading.id))]));
const errors: string[] = [];
assert.equal(new Set(allDocs.map((doc) => doc.slug)).size, allDocs.length, "Duplicate documentation routes");
for (const [alias, slug] of Object.entries(docAliases)) {
  assert(ids.has(slug), `Alias ${alias} has no target: ${slug}`);
  assert(!ids.has(alias), `Alias shadows a canonical page: ${alias}`);
  const html = await readFile(`out${routeFor(alias)}.html`, "utf8");
  for (const id of ids.get(slug) ?? []) assert(html.includes(`id="${id}"`), `Alias ${alias} drops #${id}`);
}
let links = 0;
for (const { doc, markdown } of pages) {
  assert(!doc.parent || ids.has(doc.parent), `Unknown parent for ${doc.slug}`);
  assert(markdown.startsWith("# "), `Missing title: ${doc.slug}`);
  function walk(node: ReturnType<typeof parseMarkdown> | { type: string; url?: string; children?: unknown[] }) {
    if (node.type === "link" && "url" in node && node.url) {
      const href = resolveDocHref(node.url, doc.sourcePath ?? doc.source);
      if (href.startsWith("/docs/") || href.startsWith("#")) {
        const [route, fragment] = href.split("#");
        const slug = route ? resolveDocSlug(route.slice(6)) : doc.slug;
        // Search is an application page rather than a catalog document.
        if (!["search", "open-source/search"].includes(slug)) {
          if (!ids.has(slug)) errors.push(`${doc.slug}: missing route ${href}`);
          else if (fragment && !ids.get(slug)?.has(decodeURIComponent(fragment))) errors.push(`${doc.slug}: missing anchor ${href}`);
        }
        links++;
      } else if (/\.md(?:#|$)/.test(href) && !/^https?:/.test(href)) errors.push(`${doc.slug}: unresolved Markdown link ${href}`);
    }
    if ("children" in node) for (const child of node.children ?? []) walk(child as Parameters<typeof walk>[0]);
  }
  walk(parseMarkdown(markdown));
  const html = await readFile(`out${routeFor(doc.slug)}.html`, "utf8");
  for (const id of ids.get(doc.slug) ?? []) if (!html.includes(`id="${id}"`)) errors.push(`${doc.slug}: heading ${id} missing from export`);
}
if (errors.length) { console.error([...new Set(errors)].join("\n")); process.exitCode = 1; }
else console.log(`Verified ${pages.length} canonical pages, ${Object.keys(docAliases).length} aliases and ${links} internal links/anchors in the static export.`);
