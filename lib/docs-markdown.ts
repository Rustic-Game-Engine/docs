import { allDocs, routeFor } from "./docs-catalog";

export function textSlug(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[`*_]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function markdownHeadings(source: string) {
  const used = new Map<string, number>();
  let fenced = false;
  return source.replaceAll("\r\n", "\n").split("\n").flatMap((line, index) => {
    if (line.startsWith("```")) { fenced = !fenced; return []; }
    const match = !fenced && /^(#{1,4})\s+(.+)$/.exec(line);
    if (!match) return [];
    const base = textSlug(match[2]);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return [{ line: index, level: match[1].length, text: match[2].replace(/[`*_]/g, ""), id: count ? `${base}-${count}` : base }];
  });
}

// Resolve relative source links against the current document first. A basename
// fallback is allowed only for a unique source, never an arbitrary README/page.
export function resolveDocHref(href: string, currentSource = "") {
  if (/^(https?:|mailto:|#|\/)/.test(href)) return href;
  const [source, fragment] = href.split("#", 2);
  const clean = source.replaceAll("\\", "/");
  const parts = `${currentSource.split("/").slice(0, -1).join("/")}/${clean}`.split("/");
  const normalized: string[] = [];
  for (const part of parts) {
    if (part === "..") normalized.pop();
    else if (part && part !== ".") normalized.push(part);
  }
  const target = normalized.join("/").toLowerCase();
  const pathOf = (doc: (typeof allDocs)[number]) => (doc.sourcePath ?? doc.source).toLowerCase();
  const exact = allDocs.find((doc) => pathOf(doc) === target || pathOf(doc) === clean.toLowerCase());
  const candidates = allDocs.filter((doc) => pathOf(doc).endsWith(`/${clean.toLowerCase()}`) || pathOf(doc).split("/").pop() === clean.split("/").pop()?.toLowerCase());
  const uniqueSources = new Set(candidates.map(pathOf));
  const match = exact ?? (uniqueSources.size === 1 ? candidates[0] : undefined);
  return match ? `${routeFor(match.slug)}${fragment ? `#${fragment}` : ""}` : href;
}
