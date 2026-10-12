import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function files(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  }))).flat();
}
const all = await files("out");
const htmlFiles = all.filter((file) => file.endsWith(".html"));
const pages = new Map(await Promise.all(htmlFiles.map(async (file) => {
  const html = await readFile(file, "utf8");
  return [file, { html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])) }];
})));
const errors = new Set();
for (const [file, { html }] of pages) {
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    const [pathname, hash] = href.split("#");
    const clean = pathname.split("?")[0];
    const target = clean ? path.normalize(clean.startsWith("/") ? `out${clean}` : path.join(path.dirname(file), clean)) : file;
    const resolved = pages.has(target) ? target : pages.has(`${target}.html`) ? `${target}.html` : pages.has(path.join(target, "index.html")) ? path.join(target, "index.html") : undefined;
    if (!resolved && !all.includes(target)) errors.add(`${file}: missing route ${href}`);
    else if (hash && resolved && !pages.get(resolved).ids.has(decodeURIComponent(hash))) errors.add(`${file}: missing fragment ${href}`);
  }
}
if (errors.size) { console.error([...errors].join("\n")); process.exitCode = 1; }
else console.log(`Export links and fragments pass: ${htmlFiles.length} HTML pages.`);
