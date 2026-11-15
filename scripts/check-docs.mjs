import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { load } from "./load-lib.mjs";

const { allDocs, docAliases } = load("docs-catalog.ts");
const { readDoc } = load("docs.ts");
const { resolveDocHref, markdownHeadings } = load("docs-markdown.ts");
const slugs = new Set(allDocs.map((doc) => doc.slug));
assert.equal(slugs.size, allDocs.length, "Duplicate documentation route");
for (const [alias, target] of Object.entries(docAliases)) {
  assert.ok(!slugs.has(alias), `Alias collides with route: ${alias}`);
  assert.ok(slugs.has(target), `Unknown alias target: ${target}`);
}
const pages = new Map(await Promise.all(allDocs.map(async (doc) => {
  if (!doc.source.includes(":")) await access(doc.source);
  if (doc.parent) assert.ok(slugs.has(doc.parent), `Missing parent: ${doc.slug}`);
  return [doc.slug, await readDoc(doc.source)];
})));
const errors = [];
const parser = unified().use(remarkParse);
function* destinations(node) {
  if (node.type === "link" || node.type === "image") yield node.url;
  for (const child of node.children ?? []) yield* destinations(child);
}
for (const doc of allDocs) {
  const markdown = pages.get(doc.slug);
  assert.equal((markdown.match(/^```/gm)?.length ?? 0) % 2, 0, `Unbalanced code fence: ${doc.slug}`);
  assert.ok(!/\bStop = function/.test(markdown), `Unrecognized Stop callback: ${doc.slug}`);
  assert.ok(/^# /m.test(markdown), `Missing title: ${doc.slug}`);
  for (const url of destinations(parser.parse(markdown))) {
    const href = resolveDocHref(url, doc.sourcePath ?? doc.source);
    if (/^(https?:|mailto:)/.test(href)) continue;
    if (href.startsWith("/images/")) {
      try { await access(`public${href.split(/[?#]/)[0]}`); }
      catch { errors.push(`${doc.slug}: missing image ${href}`); }
      continue;
    }
    const [pathname, hash] = href.split("#");
    if (pathname === "/" || pathname === "/docs" || pathname.endsWith("/search")) continue;
    const slug = pathname ? pathname.replace(/^\/docs\//, "") : doc.slug;
    const target = docAliases[slug] ?? slug;
    if (!pages.has(target)) errors.push(`${doc.slug}: ${url} -> ${href}`);
    else if (hash && !markdownHeadings(pages.get(target)).some((heading) => heading.id === hash)) errors.push(`${doc.slug}: missing fragment ${href}`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`Documentation structure and Markdown links pass: ${allDocs.length} pages, ${Object.keys(docAliases).length} compatibility routes.`);
