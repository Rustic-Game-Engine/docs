// Optional executable check against a separate engine checkout. No engine build
// is needed: use its actual generated SDKs with the documented callback examples.
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { load } from "./load-lib.mjs";
assert.ok(process.argv[2], "Pass a separate Engine/ checkout path; requires cc, c++ and python3.");
const sdk = join(resolve(process.argv[2]), "crates/engine-scripting/src");
const markdown = load("api-docs.ts").buildApiMarkdown("callbacks");
const dir = mkdtempSync(join(tmpdir(), "rustic-sdk-lifecycle-"));
function run(program, args, input) {
  const result = spawnSync(program, args, { cwd: dir, input, encoding: "utf8", timeout: 30000, maxBuffer: 4 * 1024 * 1024 });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}
try {
  const header = readFileSync(join(sdk, "cpp_sdk.rs"), "utf8");
  writeFileSync(join(dir, "rustic.hpp"), header.slice(header.indexOf('r#"') + 3, header.lastIndexOf('"#;')));
  for (const name of ["rustic.h", "rustic.py"]) copyFileSync(join(sdk, "sdk", name), join(dir, name));
  const callbacks = ["on_create", "on_start", "on_enable", "fixed_update", "update", "on_disable", "on_destroy", "on_stop"];
  const input = callbacks.map((callback) => JSON.stringify({ format_version: 1, callback, delta: 0.016, entity_id: "test", translation: [0, 0, 0], properties: {}, actions: {}, scene_paths: {}, gameplay_connections: [], gameplay_states: [], gameplay_callbacks: [], delta_time: 0.016, fixed_delta_time: 0.016 })).join("\n") + "\n";
  for (const [language, source, compiler, args, executable] of [
    ["C", "behavior.c", "cc", ["-std=c17", "-Wall", "-Wextra", "-Werror", "behavior.c", "-o", "behavior-c", "-lm"], "behavior-c"],
    ["C++", "behavior.cpp", "c++", ["-std=c++20", "-Wall", "-Wextra", "-Werror", "behavior.cpp", "-o", "behavior-cpp"], "behavior-cpp"],
    ["Python", "behavior.py", null, [], null],
  ]) {
    const pattern = new RegExp(`### ${language.replaceAll("+", "\\+")}\\n\\n\`\`\`[^\\n]+\\n([\\s\\S]*?)\\n\`\`\``);
    const snippet = markdown.match(pattern)?.[1];
    assert.ok(snippet, language);
    writeFileSync(join(dir, source), snippet);
    if (compiler) run(compiler, args);
    const output = run(executable ? join(dir, executable) : "python3", executable ? [] : [source], input);
    const responses = output.trim().split("\n").map((line) => JSON.parse(line));
    assert.equal(responses.length, callbacks.length, language);
    for (const [index, response] of responses.entries()) assert.equal(response.commands?.[0]?.message, callbacks[index], language);
    console.log(`${language}: documented lifecycle example compiles/runs and dispatches all eight callbacks with the actual engine SDK.`);
  }
  console.log("SDK protocol fixture only: this does not run native Play, render frames or qualify every API.");
} finally { rmSync(dir, { recursive: true, force: true }); }
