import { Script } from "node:vm";
import { spawnSync } from "node:child_process";
import { load } from "./load-lib.mjs";
const { allDocs } = load("docs-catalog.ts");
const { readDoc } = load("docs.ts");
const snippets = [];
let checked = 0;
for (const doc of allDocs) {
  const markdown = await readDoc(doc.source);
  for (const [index, match] of [...markdown.matchAll(/^```(javascript|python|lua)\n([\s\S]*?)\n```/gm)].entries()) {
    const snippet = { slug: doc.slug, index, language: match[1], code: match[2] };
    snippets.push(snippet);
    if (snippet.language === "javascript") {
      // Parse only. Engine globals are not executed in a Node environment.
      new Script(snippet.code, { filename: `${snippet.slug}/${index}` });
      checked++;
    }
  }
}
console.log(`JavaScript syntax passes: ${checked} snippets (not runtime execution).`);
if (process.argv.includes("--native")) {
  const result = spawnSync("python3", ["scripts/check-native-snippet-syntax.py"], { input: JSON.stringify(snippets), encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw result.error;
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  process.exitCode = result.status ?? 1;
}
