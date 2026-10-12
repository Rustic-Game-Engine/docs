import assert from "node:assert/strict";
import test from "node:test";
import { compareSnapshots, sourceRecord } from "../scripts/check-engine-drift.mjs";
test("drift reports additions, removals, changed signatures and non-declaration platform/callback changes", () => {
  const before = { documented: { languages: ["Lua"], signatures: ["rustic.log(level, message)"] }, sources: { "sdk": sourceRecord("def log(level, message):\n  pass"), "removed": sourceRecord("pub enum Language { Lua }") } };
  const after = { documented: { languages: ["Lua", "JS"], signatures: ["rustic.log(message)"] }, sources: { "sdk": sourceRecord("def log(message):\n  pass"), "new": sourceRecord("pub enum Language { Lua, JS }") } };
  const report = compareSnapshots(before, after).join("\n");
  for (const text of ["removed source", "new source", "removed/changed declaration", "new/changed declaration", "signatures/languages changed"]) assert.ok(report.includes(text), text);
  assert.equal(compareSnapshots(before, before).length, 0);
  const platform = { documented: {}, sources: { runtime: sourceRecord('#[cfg(windows)]\nconst CALLBACK: &str = "Start";') } };
  const changed = { documented: {}, sources: { runtime: sourceRecord('#[cfg(unix)]\nconst CALLBACK: &str = "OnCreate";') } };
  assert.match(compareSnapshots(platform, changed).join("\n"), /source changed/);
});
