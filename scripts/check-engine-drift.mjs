import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { load } from "./load-lib.mjs";

// Explicit review inputs, not generated documentation. Full-file hashes also
// detect dynamic bindings/platform guards which declarations alone cannot cover.
export const engineSources = [
  "crates/engine-scripting/src/model.rs", "crates/engine-scripting/src/runtime.rs",
  "crates/engine-scripting/src/lua.rs", "crates/engine-scripting/src/javascript.rs",
  "crates/engine-scripting/src/external_runtime.rs", "crates/engine-scripting/src/cpp_sdk.rs",
  ...["rustic.h", "rustic.py", "rustic.php", "rustic.luau", "Rustic.java", "Rustic.cs", "gameplay.lua", "gameplay.js"].map((file) => `crates/engine-scripting/src/sdk/${file}`),
  ...["mod.rs", "query.rs", "audio.rs", "signals.rs", "ease.rs"].map((file) => `crates/engine-core/src/gameplay/${file}`),
  ...["audio_output.rs", "audio_input.rs", "audio_capture.rs", "script_runtime.rs"].map((file) => `crates/engine-play/src/${file}`),
];
export function sourceRecord(text) {
  return {
    sha256: createHash("sha256").update(text.replaceAll("\r\n", "\n")).digest("hex"),
    // Human-readable candidate declarations. These are review hints, not a
    // complete parser for overloaded, aliased or dynamically constructed APIs.
    declarations: [...new Set(text.split("\n").map((line) => line.trim()).filter((line) => /^(?:pub (?:enum|struct|fn)|def |public (?:static |virtual |override )*(?:class|void|double|string|object|function)|function )/.test(line)))].sort(),
  };
}
export function compareSnapshots(previous, current) {
  const changes = [];
  for (const file of new Set([...Object.keys(previous.sources), ...Object.keys(current.sources)])) {
    const before = previous.sources[file], after = current.sources[file];
    if (before?.sha256 === after?.sha256) continue;
    changes.push(`${file}: ${!before ? "new source" : !after ? "removed source" : "source changed; review API, callback, language and platform support"}`);
    for (const line of before?.declarations ?? []) if (!after?.declarations.includes(line)) changes.push(`  removed/changed declaration: ${line}`);
    for (const line of after?.declarations ?? []) if (!before?.declarations.includes(line)) changes.push(`  new/changed declaration: ${line}`);
  }
  if (JSON.stringify(previous.documented) !== JSON.stringify(current.documented)) changes.push("Documented signatures/languages changed since the reviewed baseline.");
  return changes;
}
function main() {
  const snapshotPath = new URL("../lib/engine-api-baseline.json", import.meta.url);
  const { apiCategories } = load("api-reference.ts");
  const { exampleLanguages } = load("script-languages.ts");
  const documented = { languages: [...exampleLanguages], signatures: apiCategories.flatMap((category) => category.calls.map((call) => call.signature)).sort() };
  const index = process.argv.indexOf("--engine");
  const baseline = JSON.parse(readFileSync(snapshotPath));
  if (index < 0) {
    if (JSON.stringify(baseline.documented) !== JSON.stringify(documented)) throw new Error("Documented signatures/languages changed. Review against engine source and record the baseline with --engine PATH --record-reviewed.");
    console.log("Documented signature/language baseline matches. Engine comparison skipped; no checkout required for normal builds.");
    return;
  }
  const engine = path.resolve(process.argv[index + 1]);
  const revision = spawnSync("git", ["-C", engine, "rev-parse", "HEAD"], { encoding: "utf8" });
  if (revision.status !== 0) throw new Error("Engine checkout revision unavailable.");
  const current = { revision: revision.stdout.trim(), documented, sources: Object.fromEntries(engineSources.map((file) => [file, sourceRecord(readFileSync(path.join(engine, file), "utf8"))])) };
  if (process.argv.includes("--record-reviewed")) {
    writeFileSync(snapshotPath, JSON.stringify(current, null, 2) + "\n");
    console.log(`Recorded explicitly reviewed baseline at engine ${current.revision}; authored documentation was not overwritten.`);
    return;
  }
  const changes = compareSnapshots(baseline, current);
  if (changes.length) {
    console.error(`Engine drift review required (${baseline.revision} → ${current.revision}):\n${changes.join("\n")}`);
    process.exitCode = 1;
  } else console.log(`Engine API review inputs match ${baseline.revision}: ${engineSources.length} sources, ${documented.signatures.length} documented signatures, ten languages.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) main();
